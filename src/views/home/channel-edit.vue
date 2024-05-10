<template>
  <div class="channelEdit">
    <van-cell class="title" title="我的频道" :border="false">
      <van-button
        @click="isEdit = !isEdit"
        type="danger"
        size="small"
        round
        plain
      >
        {{ isEdit ? " 完成 " : " 编辑 " }}
      </van-button>
    </van-cell>
    <van-grid :border="false" :gutter="10">
      <van-grid-item
        class="channel-item"
        v-for="(channel, index) in channelList"
        :key="index"
        @click="editMyChannel(channel, index)"
      >
        <div slot="text">
          <span class="plusName" :class="{ active: activeIndex === index }">{{
            channel.name
          }}</span>
          <van-icon
            v-if="isEdit === true && channel.name !== '推荐'"
            class="clear"
            name="clear"
          />
        </div>
      </van-grid-item>
    </van-grid>
    <van-cell class="title" title="频道推荐" :border="false"></van-cell>
    <van-grid :border="false" :gutter="10">
      <van-grid-item
        class="channel-item"
        v-for="(channel, index) in recommendedList"
        :key="index"
        @click="addChannel(channel)"
      >
        <div slot="text">
          <van-icon class="plus" name="plus" />
          <span class="plusName">{{ channel.name }}</span>
        </div>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels, addUserChannels, delUserChannels } from "@/api/user";
import { setItem } from "@/utils/storage";
export default {
  data() {
    return {
      allChannels: [],
      isEdit: false,
    };
  },
  props: {
    channelList: {
      type: Array,
      required: true,
    },
    activeIndex: {
      type: Number,
      required: true,
    },
  },
  //计算属性
  computed: {
    recommendedList() {
      //遍历所有频道，筛选掉我的频道里的数据
      let reArr = [];
      this.allChannels.forEach((item) => {
        let index = this.channelList.findIndex((cn) => {
          return item.id === cn.id;
        });
        if (index === -1) {
          reArr.push(item);
        }
      });
      return reArr;
    },
  },
  created() {
    this.getChannels();
  },
  methods: {
    // 获取所有频道
    async getChannels() {
      const { data } = await getAllChannels();
      this.allChannels = data.data.channels;
    },
    // 点击推荐频道添加到我的频道里
    async addChannel(channel) {
      // 因为数组是引用类型，此处数组发生改变，首页频道跟着改变
      this.channelList.push(channel);
      if (this.$store.state.user) {
        try {
          const res = await addUserChannels([
            {
              id: channel.id, // 频道 id
              seq: this.channelList.length, // 频道的 序号
            },
          ]);
        } catch (err) {
          this.$toast.fail("添加失败" + err.message);
        }
      } else {
        setItem("myChannel", this.channelList);
      }
    },
    // 编辑我的频道：编辑状态、非编辑状态
    editMyChannel(channel, index) {
      // 编辑状态：从我的频道里删除该频道
      if (this.isEdit) {
        if (channel.name === "推荐") return;
        // 如果删除项的索引值小于当前激活状态的索引值，则更新首页的选中状态
        if (index <= this.activeIndex) {
          this.$emit("update:active-index", index - 1);
        }
        this.channelList.splice(index, 1);
        this.deleteMyChannel(channel.id);
      } else {
        //非编辑状态：反向传值，切换首页的频道切换
        this.$emit("update:active-index", index);
        this.$emit("close-popup");
      }
    },
    async deleteMyChannel(channelId) {
      if (this.$store.state.user) {
        try {
          const res = await delUserChannels(channelId);
        } catch (err) {
          this.$toast.fail("删除频道失败" + err.message);
        }
      } else {
        setItem("myChannel", this.channelList);
      }
    },
  },
};
</script>

<style scoped lang="less">
.channelEdit {
  .title {
    margin-top: 15px;
    /deep/ .van-cell__title {
      color: #333;
      font-size: 16px;
    }
  }
  .channel-item {
    height: 43px;
    /deep/ .van-grid-item__content {
      background-color: #f5f5f6;
      border-radius: 4px;
      .van-grid-item__text {
        color: #222;
        font-size: 14px;
      }
      .plus,
      .plusName {
        color: #222;
        font-size: 14px;
      }
      .clear {
        position: absolute;
        top: -5px;
        right: 1px;
        color: #cacaca;
        font-size: 18px;
      }
      .active {
        color: red;
      }
    }
  }
}
</style>