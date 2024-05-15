<template>
  <van-cell class="commentItem">
    <van-image
      slot="icon"
      class="avatar"
      fit="cover"
      round
      :src="comment.aut_photo"
    >
    </van-image>
    <div slot="title" class="titleWrap">
      <span class="userName">{{ comment.aut_name }}</span>
      <van-button
        class="like-btn"
        :class="{ like: comment.is_liking }"
        :icon="comment.is_liking ? 'like' : 'like-o'"
        @click="likeClick"
        :loading="likeLoading"
        >{{ comment.like_count }}</van-button
      >
    </div>
    <div slot="label" class="contentWrap">
      <p class="content">{{ comment.content }}</p>
      <div class="replyWrap">
        <span class="pubTime">{{ comment.pubdate | relativeTime }}</span>
        <van-button class="replyBtn" round
          >回复{{ comment.reply_count }}</van-button
        >
      </div>
    </div>
  </van-cell>
</template>

<script>
import { addCommentLike, cancleCommentLike } from "@/api/user";
export default {
  data() {
    return {
      likeLoading: false,
    };
  },
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async likeClick() {
      this.likeLoading = true;
      try {
        // 已赞，取消点赞
        if (this.comment.is_liking) {
          const res = await cancleCommentLike(this.comment.com_id);
          this.comment.like_count--;
          console.log(res);
          this.$toast.success("取消点赞成功");
        } else {
          //未赞，发起点赞
          const res = await addCommentLike(this.comment.com_id);
          this.comment.like_count++;
          console.log(res);
          this.$toast.success("点赞成功");
        }
        this.comment.is_liking = !this.comment.is_liking;
      } catch (err) {
        this.$toast.fail("操作失败：" + err.response.data.message);
      }
      this.likeLoading = false;
    },
  },
};
</script>

<style scoped lang="less">
.commentItem {
  .avatar {
    width: 36px;
    height: 36px;
    margin-right: 12px;
  }
  .titleWrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 35px;
    padding: 0;
    .userName {
      color: #406599;
      font-size: 13px;
    }
    .like-btn {
      border: none;
    }
    .like {
      color: #ffa500;
    }
  }
  .contentWrap {
    margin-top: 0;
    .content {
      color: #222;
      font-size: 16px;
      word-break: break-all;
      text-align: justify;
    }
    .replyWrap {
      display: flex;
      align-items: center;
      .pubTime {
        color: #222;
        font-size: 10px;
        margin-right: 12px;
      }
      .replyBtn {
        height: 20px;
        font-size: 10px;
      }
    }
  }
}
</style>