<template>
  <div class="myCollect">
    <!-- 导航栏 -->
    <van-nav-bar class="nav-bar" title="收藏/历史">
      <template #left>
        <i @click="$router.back()" class="iconfont icon-youjiantou"></i>
      </template>
      <template #right>
        <van-icon name="ellipsis" size="30" color="#fff" />
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
import { getCollections, getHistories } from "@/api/user";
export default {
  data() {
    return {
      collections: [],
      histories: [],
    };
  },
  created() {
    if (this.$route.params.index === 1) {
      this.getUserCollections();
    } else {
      this.getUserHistories();
    }
  },
  methods: {
    async getUserCollections() {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: false,
        message: "加载中...",
      });
      try {
        const res = await getCollections();
        this.collections = res.data.data;
        console.log(res);
        this.$toast.success("获取用户收藏成功");
      } catch (err) {
        console.log(err);
        this.$toast.fail("获取用户收藏失败");
      }
    },
    async getUserHistories() {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: false,
        message: "加载中...",
      });
      try {
        const res = await getHistories();
        this.histories = res.data.data;
        console.log(res);
        this.$toast.success("获取用户历史成功");
      } catch (err) {
        console.log(err);
        this.$toast.fail("获取用户历史失败");
      }
    },
  },
};
</script>

<style scoped lang="less">
.myCollect {
  .nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    .icon-youjiantou {
      color: #fff;
      font-size: 30px;
    }
  }
}
</style>

