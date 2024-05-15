<template>
  <div>
    <van-button class="collect"
      :class="{ collected: is_collected }"
      :icon="is_collected ? 'star' : 'star-o'"
      @click="collecteBtnClick"
      :loading="isCollectLoading"
    >
    </van-button>
  </div>
</template>

<script>
import { collectActicle, cancleCollectActicle } from "@/api/user";
export default {
  data() {
    return {
      isCollectLoading: false,
    };
  },
  //自定义v-model数据信息
  model: {
    prop: "is_collected", //默认值是value
    event: "update-collected", //默认是 input
  },
  props: {
    is_collected: {
      type: Boolean,
      required: true,
    },
    articleId: {
      type: String,
      required: true,
    },
  },
  methods: {
    async collecteBtnClick() {
      this.isCollectLoading = true;
      console.log(this.articleId);
      try {
        // 已收藏，发送取消收藏请求
        if (this.is_collected) {
          const res = await cancleCollectActicle(this.articleId);
          console.log(res);
          this.$toast.success("取消收藏成功");
        } else {
          //未收藏，发送收藏请求
          const res = await collectActicle(this.articleId);
          console.log(res);
          this.$toast.success("收藏成功");
        }
        // 自定义事件，通知父视图更新数据
        this.$emit("update-collected", !this.is_collected);
      } catch (err) {
        console.log(err);
        this.$toast.fail("操作失败：" + err.response.data.message);
        this.$emit("update-collected", !this.is_collected);
      }
      this.isCollectLoading = false;
    },
  },
};
</script>

<style scoped lang="less">
.collect{
    border: none;
    .van-icon {
    color: #777;
  }
}
.collected {
  .van-icon {
    color: #ffa500;
  }
}
</style>