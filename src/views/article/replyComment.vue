<template>
  <div class="reply-wrap">
    <van-nav-bar :title="comment.reply_count + '条回复'"> </van-nav-bar>
    <div class="scroll-wrap">
      <commentItem :comment="comment"></commentItem>
      <van-cell title="所有回复" />
      <!-- 评论的回复列表 -->
      <actilceComment
        :source="comment.com_id"
        :type="'c'"
        :commentList="list"
        @replyClick="showReplyFn"
      >
      </actilceComment>
      <!-- /评论的回复列表 -->
    </div>

    <!-- 底部区域 -->
    <div class="reply-bottom">
      <van-button
        class="write-btn"
        size="small"
        round
        @click="isPostShow = true"
        >写评论</van-button
      >
    </div>
    <!-- /底部区域 -->

    <!-- 发布评论 -->
    <van-popup
      v-model="isPostShow"
      position="bottom"
      closeable
      close-icon-position="top-left"
      round
    >
      <commentPost
        :replyComment="replyCom"
        :target="comment.com_id"
        @postSuccess="onPostSuccess"
      />
    </van-popup>
    <!-- /发布评论 -->
  </div>
</template>

<script>
import commentItem from "./commentItem.vue";
import actilceComment from "./articleComment.vue";
import commentPost from "./commentPost.vue";

export default {
  data() {
    return {
      list: [],
      isPostShow: false,
      replyCom: null,
    };
  },
  components: { commentItem, actilceComment, commentPost },
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  methods: {
    //回复评论成功、回复评论的回复成功
    onPostSuccess(data) {
      // 关闭弹框
      this.isPostShow = false;
      // 操作数组，渲染页面
      this.list.unshift(data);
      //评论总数量+1
      this.comment.reply_count++;
    },
    //回复评论的回复
    showReplyFn(replyObj) {
      this.replyCom = replyObj;
      this.isPostShow = true;
    },
  },
};
</script>

<style scoped lang="less">
.reply-wrap {
  .scroll-wrap {
    position: fixed;
    top: 100px;
    left: 0;
    right: 0;
    bottom: 44px;
    overflow-y: auto;
  }
  .reply-bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border-top: 1px solid #d8d8d8;
    .write-btn {
      width: 60%;
    }
  }
}
</style>