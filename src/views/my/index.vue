<template>
  <div class="my-container">
    <div v-if="user" class="header login">
      <div class="topInfo">
        <div class="left">
          <!--引用本地图片 :src="require('../../assets/img/logo.png')" -->
          <van-image
            class="avatar"
            :src="userInfo.photo"
            round
            fit="cover"
          />
          <span class="name">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button size="mini" round to="/user/profile">编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{userInfo.art_count}}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.follow_count}}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.fans_count}}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.like_count}}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <div v-else class="header notlogin">
      <img
        class="bgImg"
        @click="$router.push('/login')"
        src="~@/assets/img/mobile.png"
        alt=""
      />
      <div class="tagText">登录 / 注册</div>
    </div>

    <van-grid class="grid-nav mb-9" :column-num="2" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="iconfont icon-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="iconfont icon-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>
    <van-cell-group>
      <van-cell title="消息通知" is-link url="" />
      <van-cell title="小智同学" is-link url="" />
    </van-cell-group>

    <van-cell-group v-if="user">
      <van-cell class="loginOutCell">
        <div class="loginOut" @click="loginOutFn">退出登录</div>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getUserInfo } from "@/api/user";
export default {
  data() {
    return {
      userInfo: {},
    };
  },
  // 计算属性
  computed: {
    ...mapState(["user"]),
  },
  // 初始化完毕
  created() {
    if (this.user) {
      this.loadUserInfo();
    }
  },
  methods: {
    async loadUserInfo() {
      try {
        const userInfo = await getUserInfo();
        this.userInfo = userInfo.data.data;
        console.log(userInfo);
      } catch (err) {
        this.$toast.fail("获取信息失败");
      }
    },
    loginOutFn() {
      this.$dialog
        .confirm({
          title: "温馨提示",
          message: "是否确认退出登录",
        })
        .then(() => {
          // 退出登录，清除用户信息
          this.$store.commit("setUser", null);
        })
        .catch(() => {});
    },
  },
};
</script>

<style scoped lang="less">
.my-container {
  .header {
    height: 361px;
    background: url("~@/assets/img/banner.png");
    background-size: cover;
  }
  .login {
    .topInfo {
      padding: 60px 30px 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        justify-content: center;
        align-items: center;
        .avatar {
          width: 132px;
          height: 132px;
        }
        .name {
          margin-left: 10px;
          color: white;
          font-size: 20px;
        }
      }
    }
    .data-stats {
      display: flex;
      justify-content: space-evenly;
      .data-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        .count {
          text-align: center;
          color: white;
          font-size: 20px;
        }
        .text {
          margin-top: 5px;
          color: white;
          font-size: 20px;
        }
      }
    }
  }
  .notlogin {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .bgImg {
      margin-bottom: 10px;
      width: 132px;
      height: 132px;
    }
    .tagText {
      color: #fff;
      font-size: 20px;
    }
  }
  .mb-9 {
    margin-bottom: 15px;
    .iconfont {
      color: brown;
    }
  }
  .loginOutCell {
    margin-top: 15px;
    .loginOut {
      text-align: center;
      color: brown;
      font-size: 20px;
    }
  }
}
</style>