<template>
  <div class="user-wrap">
    <!-- 导航栏 -->
    <van-nav-bar class="nav-bar" :title="article.aut_name">
      <template #left>
        <i @click="$router.back()" class="iconfont icon-youjiantou"></i>
      </template>
      <template #right>
        <van-icon name="ellipsis" size="30" color="#fff" />
      </template>
    </van-nav-bar>
    <div class="userbody">
      <!-- 加载中... -->
      <div class="loading-wrap" v-if="isLoading">
        <van-loading size="24px" color="#0094ff" vertical
          >加载中...</van-loading
        >
      </div>
      <div class="baseInfo">
        <div>
          <van-image class="avatar" :src="article.aut_photo" round fit="cover" />
        </div>
        <div class="right-wrap">
          <div class="data-stats">
            <div class="data-item">
              <span class="count">23</span>
              <span class="text">头条</span>
            </div>
            <div class="data-item">
              <span class="count">45</span>
              <span class="text">关注</span>
            </div>
            <div class="data-item">
              <span class="count">66</span>
              <span class="text">粉丝</span>
            </div>
            <div class="data-item">
              <span class="count">88</span>
              <span class="text">获赞</span>
            </div>
          </div>
          <div class="followUsers">
            <followUsers class="followBtn"
            v-model="article.is_followed"
            :userId="article.aut_id"
          ></followUsers>
          </div>
        </div>
      </div>
      <div class="userIntro">
        <div>
          <span class="title">认证：</span><span>微软认证开发者</span>
        </div>
        <div>
          <span class="title">简介：</span><span>{{ article.pubdate }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getOtherUserInfo } from "@/api/user";
import followUsers from "../article/followUsers.vue";
export default {
  data() {
    return {
      isLoading: false,
      userInfo: {},
      article: {},
    };
  },
  components: { followUsers },
  props: {
    userId: {
      type: [Number, String],
      required: true,
    },
  },
  created() {
    this.article = this.$route.query;
    if (this.article.is_followed === "true") {
      this.article.is_followed = true;
    }
    console.log(this.article);
    //this.getUserInfo();
  },
  methods: {
    async getUserInfo() {
      this.isLoading = true;
      try {
        const userInfo = await getOtherUserInfo(this.userId);
        this.userInfo = userInfo.data.data;
        console.log(userInfo);
      } catch (err) {
        console.log(err);
        this.$toast.fail("获取信息失败");
      }
      this.isLoading = false;
    },
  },
};
</script>

<style scoped lang="less">
.user-wrap {
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
  .loading-wrap {
    padding: 100px 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
  }
  .baseInfo {
    padding-left: 30px;
    box-sizing: border-box;
    height: 200px;
    width: 100%;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    .avatar {
      flex: 1;
      margin: 50px 0 0 0;
      width: 70px;
      height: 70px;
    }
    .right-wrap {
      flex: 3;
      margin-top: 30px;
      .data-stats {
        display: flex;
        justify-content: space-evenly;
        .data-item {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .text{
            font-size: 12px;
            color: #999;
          }
        }
      }
      .followUsers{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 30px;
        /deep/ .follow-btn{
          width: 150px;
        }
      }
    }
  }
  .userIntro{
    margin-top: 15px;
    padding: 15px;
    background-color: #fff;
    .title{
      color: #999;
    }
  }
}
</style>