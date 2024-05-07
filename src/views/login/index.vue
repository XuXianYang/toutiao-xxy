<template>
  <div class="login-container">
    <van-nav-bar class="nav-bar" title="登录">
      <template #left>
            <i @click="$router.back()" class="iconfont icon-guanbi"></i>
      </template>
    </van-nav-bar>
    <van-form ref="mobileTF" @submit="onSubmit">
      <van-cell-group>
        <van-field
          v-model="user.mobile"
          name="mobile"
          placeholder="请输入手机号"
          :rules="userFormRules.mobile"     
        >
          <template #left-icon>
            <i class="iconfont icon-shouji"></i>
          </template>
        </van-field>
        <van-field
          v-model="user.code"
          name="code"
          placeholder="请输入验证码"
          :rules="userFormRules.code"
          maxlength="6"
        >
          <template #left-icon>
            <i class="iconfont icon-yanzhengma"></i>
          </template>
          <van-count-down
            v-if="isCountDownShow"
            slot="button"
            :time="1000 * 5"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <van-button
            v-else
            slot="button"
            @click="sendSMS"
            class="send-sms-btn"
            size="small"
            type="primary"
            >发送验证码</van-button
          >
        </van-field>
      </van-cell-group>
      <div class="login-btn-wrap">
        <van-button
          @click="loginFn"
          class="login-btn"
          block
          type="info"
          native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>
  
  <script>
import { login, sendSMS } from "@/api/user";
export default {
  name: "LoginPage",
  components: {},
  props: {},
  data() {
    return {
      user: {
        mobile: "",
        code: "",
      },
      userFormRules: {
        mobile: [
          { required: true, message: "请输入手机号" },
          { pattern: /^1\d{10}$/, message: "手机号格式不正确" },
        ],
        code: [
          { required: true, message: "请输入验证码" },
          { pattern: /^\d{6}$/, message: "验证码格式不正确" },
        ],
      },
      isCountDownShow: false,
    };
  },
  methods: {
    onSubmit(values) {
      console.log("submit", values);
    },
    async sendSMS() {
      // 验证手机号mobileTF
      try {
        //通过name属性调用手机号输入框的验证规则
        await this.$refs.mobileTF.validate("mobile");
      } catch (err) {
        return this.$toast.fail("验证失败");
      }

      //显示倒计时组件
      this.isCountDownShow = true;

      // 发起验证码请求
      try {
        const res = await sendSMS(this.user.mobile);
        console.log(res);
        this.$toast.success("验证码发送成功");
      } catch (err) {
        console.log(err);
        // 发送失败，关闭倒计时
        this.isCountDownShow = false;
        if (err.response.status === 429) {
          this.$toast("发送太频繁了，请稍后重试");
        } else {
          this.$toast("发送失败:" + err.response.data.message);
        }
      }
    },
    async loginFn() {
      //等待层
      this.$toast.loading({
        duration: 0,
        message: "登录中...",
        forbidClick: false,
      });
      try {
        // 发起登录请求
        const res = await login(this.user);
        console.log(res);
        this.$toast.success("登录成功");
        this.$store.commit('setUser',res.data.data)
        this.$router.back()
      } catch (err) {
        // 登录失败处理
        this.$toast.fail("登录失败:" + err.response.data.message);
      }
    },
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
};
</script>
  
<style scoped lang="less">
.login-container {
  .iconfont {
    font-size: 20px;
  }
  .icon-guanbi{
    color: white;
    font-size: 16px;
  }
  .send-sms-btn {
    width: 100px;
    height: 25px;
    line-height: 25px;
    background-color: #ededed;
    font-size: 12px;
    color: #666;
    border-radius: 22.5px;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>