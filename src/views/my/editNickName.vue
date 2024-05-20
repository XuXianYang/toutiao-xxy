<template>
  <div class="update-name">
    <!-- 导航栏 -->
    <van-nav-bar
      title="设置昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    />
    <!-- /导航栏 -->
    <!-- 输入框 -->
    <div class="field-wrap">
      <van-field
        v-model.trim="localName"
        rows="2"
        autosize
        type="textarea"
        maxlength="30"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
    <!-- /输入框 -->
  </div>
</template>
  
  <script>
import { editUserInfo } from "@/api/user";
export default {
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      localName: this.value,
    };
  },
  methods: {
    async onConfirm() {
      if (!this.localName.trim().length)
        return this.$toast.fail("输入内容不能为空");
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: false,
        message: "加载中...",
      });
      try {
        await editUserInfo({
          name: this.localName,
        });
        // 关闭弹层
        this.$emit("close");
        //更新数据
        this.$emit("input",this.localName);
        this.$toast.success("更新昵称成功");
      } catch (err) {
        this.$toast.fail("更新昵称失败");
      }
    },
  },
};
</script>
  

<style scoped lang="less">
.field-wrap {
  padding: 20px;
}
</style>