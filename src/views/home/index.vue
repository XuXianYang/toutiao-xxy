<template>
  <div class="home-container">
    <van-nav-bar class="nav-bar">
      <van-button
        class="searchBtn"
        slot="title"
        size="small"
        round
        icon="search"
        type="info"
        >搜索
      </van-button>
    </van-nav-bar>
    <van-tabs class="channel-tabs" v-model="active">
      <van-tab v-for="channel in list" :key="channel.id" :title="channel.name">
        <articleList :channel="channel"></articleList>
      </van-tab>

      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn">
        <i class="iconfont icon-gengduo"></i>
      </div>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from "@/api/user";
import articleList from "@/views/home/article-list";
export default {
  data() {
    return {
      active: 1,
      list: [],
    };
  },
  components: {
    articleList,
  },
  created() {
    this.getChannels();
  },
  methods: {
    async getChannels() {
      const { data } = await getUserChannels();
      this.list = data.data.channels;
      console.log(this.list);
    },
  },
};

//当你不想写全局样式,想写scoped局部样式不污染全局,又想更改子组件内的样式,此时就可以用/deep/深度作用选择器
//1.scoped会给局部区域的非组件元素和组件根元素(不含组件内子元素)增加一个不重复的data属性
//2.加了scoped后若写样式,会在每句css选择器的末尾（编译后生成的css语句）加一个当前组件(大的.a)的data属性选择器,若多层也是给最后末尾设置
</script>

<style scoped lang="less">
.home-container {
  .nav-bar{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
  }
  /deep/ .van-nav-bar__title {
    max-width: unset;
  }
  .searchBtn {
    width: 275px;
    height: 32px;
    font-size: 14px;
    border: none;
    background-color: #5babfb;
    .van-icon {
      color: white;
      font-size: 16px;
    }
  }
  /deep/ .channel-tabs {
    position: fixed;
    left: 0;
    right: 0;
    top: 46px;
    .van-tab {
      border-right: 1px solid #edeff3;
      color: #777;
      font-size: 15px;
      min-width: 100px;
    }
    .van-tab--active {
      color: #333333;
    }
    .van-tabs__nav {
      padding-bottom: 0;
    }
    .van-tabs__line {
      bottom: 4px;
      height: 3px;
      background-color: #3296fa;
    }
    .placeholder {
      flex-shrink: 0;
      width: 33px;
      height: 41px;
    }
    .hamburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 33px;
      height: 41px;
      background-color: rgba(255, 255, 255, 0.902);
      .iconfont {
        font-size: 17px;
      }
      &::before {
        content: "";
        position: absolute;
        left: 0;
        width: 2px;
        height: 29px;
        background-image: url(~@/assets/img/gradient-gray-line.png);
        background-size: contain;
      }
    }
  }
}
</style>