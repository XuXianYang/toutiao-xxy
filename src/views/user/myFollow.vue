<template>
  <div class="myFollow">
    <!-- 导航栏 -->
    <van-nav-bar class="nav-bar" title="关注/粉丝">
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
import { getFollowers, getFollowings } from "@/api/user";

export default {
  data() {
    return {
        followers:[],
        followings:[],
    };
  },
  created() {
    if(this.$route.params.index === 1){
        this.getUserFollowings()
    }else{
        this.getUserFollowers()
    }
  },
  methods: {
    async getUserFollowers() {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: false,
        message: "加载中...",
      });
      try {
        const res = await getFollowers();
        this.followers = res.data.data;
        console.log(res);
        this.$toast.success("获取用户粉丝成功");
      } catch (err) {
        console.log(err);
        this.$toast.fail("获取用户粉丝失败");
      }
    },
    async getUserFollowings() {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: false,
        message: "加载中...",
      });
      try {
        const res = await getFollowings();
        this.followings = res.data.data;
        console.log(res);
        this.$toast.success("获取用户关注成功");
      } catch (err) {
        console.log(err);
        this.$toast.fail("获取用户关注失败");
      }
    },
  },
};
</script>
<style scoped lang="less">
.myFollow {
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
  
  