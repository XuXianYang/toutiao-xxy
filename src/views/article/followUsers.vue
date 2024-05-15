<template>
  <div>
    <!-- 已关注按钮：和关注显示互斥 -->
    <van-button
      v-if="is_followed"
      class="follow-btn"
      round
      size="small"
      :loading="isFollowLoading"
      @click="followBtnClick"
      >已关注</van-button
    >
    <!-- 关注按钮：和已关注显示互斥 -->
    <van-button
      v-else
      class="follow-btn"
      type="info"
      color="#3296fa"
      round
      size="small"
      icon="plus"
      :loading="isFollowLoading"
      @click="followBtnClick"
      >关注</van-button
    >
  </div>
</template>

<script>
import { followUsers, cancleFollowUsers } from "@/api/user";
export default {
  data() {
    return {
      isFollowLoading: false,
    };
  },
  //自定义v-model数据信息
  model:{
    prop:'is_followed',//默认值是value
    event:'update-followed'//默认是 input
  },
  props:{
    is_followed:{
        type:Boolean,
        required:true,
    },
    userId:{
        type:String,
        required:true,
    },
  },
  methods: {
    async followBtnClick() {
      this.isFollowLoading = true;
      try {
        // 已关注，发送取消关注请求
        if (this.is_followed) {
          await cancleFollowUsers(this.userId);
        } else {
          //未关注，发送关注请求
          await followUsers(this.userId);
        }
        // 自定义事件，通知父视图更新数据
        this.$emit('update-followed',!this.is_followed)
      } catch (err) {
        this.$toast.fail("操作失败：" + err.response.data.message);
      }
      this.isFollowLoading = false;
    },
  },
};
</script>

<style>
</style>