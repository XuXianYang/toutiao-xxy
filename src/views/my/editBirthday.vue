<template>
  <div>
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择生日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="onCancel"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { editUserInfo } from "@/api/user";
import dayjs from "dayjs";
export default {
  data() {
    return {
      minDate: new Date(1970, 1, 1),
      maxDate: new Date(),
      currentDate: this.value?new Date(this.value):new Date(),
    };
  },
  props: {
    value: {
      type: String,
    },
  },
  methods:{
    async onConfirm(value) {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: false,
        message: "加载中...",
      });
      try {
        const dateStr = dayjs(value).format('YYYY-MM-DD')
        console.log(dateStr);
        await editUserInfo({
          birthday: dateStr,
        });
        // 关闭弹层
        this.$emit("close");
        //更新数据
        this.$emit("input", dateStr);
        this.$toast.success("更新生日成功");
      } catch (err) {
        console.log(err);
        this.$toast.fail("更新生日失败");
      }
    },
    onCancel() {
      console.log('close-Birth');
      this.$emit("close");
    },
  },
};
</script>

<style>
</style>