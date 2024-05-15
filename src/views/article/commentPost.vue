<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button
      class="post-btn"
      :disabled="!message.length"
      @click="addCommentsClick"
    >
      发布
    </van-button>
  </div>
</template>

<script>
import { addComments } from "@/api/user";

export default {
  data() {
    return {
      message: "",
    };
  },
  props: {
    articleId: {
      type: String,
      required: true,
    },
  },
  methods: {
    async addCommentsClick() {
      if (!this.message.trim().length) {
        return this.$toast.fail("输入内容不能为空");
      }
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: "发布中...",
        forbidClick: true, // 是否禁止背景点击
      });
      try {
        const res = await addComments({
          content: this.message,
          target: this.articleId,
          art_id: this.articleId,
        });
        console.log(res);
        this.$emit("postSuccess", res.data.data.new_obj);
        this.$toast.success("发布成功");
      } catch (err) {
        console.log(err);
        this.$toast.fail("发布失败：" + err.response.data.message);
      }
      //发布完成清空输入框
      this.message = ''
    },
  },
};
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 50px 0 16px 16px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 75px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>