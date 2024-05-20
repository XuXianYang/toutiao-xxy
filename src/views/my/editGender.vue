<template>
  <div>
    <van-picker
      title="设置性别"
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      @cancel="onCancel"
      @change="onChange"
      :default-index="this.value"
    />
  </div>
</template>
  
  <script>
import { editUserInfo } from "@/api/user";

export default {
  data() {
    return {
      columns: ["男", "女"],
    };
  },
  props: {
    value: {
      type: [String, Number],
    },
  },
  methods: {
    async onConfirm(value, index) {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: false,
        message: "加载中...",
      });
      try {
        await editUserInfo({
          gender: index,
        });
        // 关闭弹层
        this.$emit("close");
        //更新数据
        this.$emit("input", index);
        this.$toast.success("更新性别成功");
      } catch (err) {
        this.$toast.fail("更新性别失败");
      }
    },
    onChange(picker, value, index) {},
    onCancel() {
      this.$emit("close");
    },
  },
};
</script>
  
  <style>
</style>