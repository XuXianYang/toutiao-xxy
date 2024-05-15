<template>
  <div>
    <van-button
      class="like"
      :class="{ liked: isLiked === 1 }"
      :icon="isLiked ? 'good-job' : 'good-job-o'"
      @click="likeBtnClick"
      :loading="isLikeLoading"
    >
    </van-button>
  </div>
</template>
  
  <script>
import { likeActicle, canclelikeActicle } from "@/api/user";
export default {
  data() {
    return {
      isLikeLoading: false,
    };
  },
  //自定义v-model数据信息
  model: {
    prop: "isLiked", //默认值是value
    event: "update-liked", //默认是 input
  },
  props: {
    isLiked: {
      type: [Boolean, Number],
      required: true,
    },
    articleId: {
      type: String,
      required: true,
    },
  },
  methods: {
    async likeBtnClick() {
      this.isLikeLoading = true;
      console.log(this.articleId);
      try {
        // 已点赞，发送取消点赞请求
        if (this.isLiked === 1) {
          const res = await canclelikeActicle(this.articleId);
          console.log(res);
          this.$toast.success("取消点赞成功");
        } else {
          //未点赞，发送点赞请求
          const res = await likeActicle(this.articleId);
          console.log(res);
          this.$toast.success("点赞成功");
        }
        // 自定义事件，通知父视图更新数据
        this.$emit("update-liked", this.isLiked === 1 ? 0 : 1);
      } catch (err) {
        console.log(err);
        this.$toast.fail("操作失败：" + err.response.data.message);
        this.$emit("update-liked", this.isLiked === 1 ? 0 : 1);
      }
      this.isLikeLoading = false;
    },
  },
};
</script>
  
  <style scoped lang="less">
.like {
  border: none;
  .van-icon {
    color: #777;
  }
}
.liked {
  .van-icon {
    color: #ffa500;
  }
}
</style>