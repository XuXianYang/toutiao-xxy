<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="nav-bar">
      <template #left>
        <i @click="$router.back()" class="iconfont icon-youjiantou"></i>
      </template>
      <template #right>
        <van-icon name="ellipsis" size="30" color="#fff" />
      </template>
    </van-nav-bar>
    <div class="main-wrap">
      <!-- 加载中... -->
      <div class="loading-wrap" v-if="isLoading">
        <van-loading size="24px" color="#0094ff" vertical
          >加载中...</van-loading
        >
      </div>
      <!-- 文章内容 -->
      <div class="article-detail" v-else-if="article.title">
        <!-- 头部标题和用户信息 -->
        <h1 class="title">{{ article.title }}</h1>
        <van-cell class="titleInfo" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ article.pubdate | relativeTime }}
          </div>
          <!-- 关注按钮 -->
          <followUsersBtn
            v-model="article.is_followed"
            :userId="article.aut_id"
          >
          </followUsersBtn>
        </van-cell>
        <!-- 文章正文 -->
        <div
          class="article-content markdown-body"
          ref="articleContent"
          v-html="article.content"
        ></div>
        <van-divider>文章内容结束</van-divider>
        <!-- 文章评论 -->
        <articleComment
          @replyClick="showReplyFn"
          :commentList="comList"
          :source="article.art_id"
          :type="'a'"
        ></articleComment>
        <!-- 底部工具栏 -->
        <div class="bottomBar">
          <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
            @click="showPopup = true"
            >写评论</van-button
          >
          <van-icon
            class="share"
            name="comment-o"
            :badge="article.comm_count"
            color="#777"
          />
          <collectArticles
            :articleId="article.art_id"
            v-model="article.is_collected"
          >
          </collectArticles>
          <likeArticles
            :articleId="article.art_id"
            v-model="article.attitude"
          ></likeArticles>
        </div>
      </div>

      <!-- 加载失败:404 -->
      <div class="error-wrap" v-else-if="errorCode == 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>

      <!-- 加载失败:网络问题 -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">加载失败</p>
        <van-button class="retry-btn">点击重试</van-button>
      </div>
      <div class="bottomBg"></div>
    </div>
    <!-- 发布文章评论弹框 -->
    <van-popup
      class="comment-popup"
      v-model="showPopup"
      closeable
      close-icon-position="top-left"
      position="bottom"
      round
    >
      <commentPost
        :target="article.art_id"
        @postSuccess="onPostSuccess"
      ></commentPost>
    </van-popup>
    <!-- 评论回复列表弹框 -->
    <van-popup
      class="reply-popup"
      v-model="showReplyPopup"
      closeable
      position="bottom"
      style="height: 95%"
      round
    >
      <replyComment
        v-if="showReplyPopup"
        :comment="currentComment"
      ></replyComment>
    </van-popup>
  </div>
</template>

<script>
import { getArticleDetail } from "@/api/user";
import { ImagePreview } from "vant";
import followUsersBtn from "./followUsers.vue";
import collectArticles from "./collectArticles.vue";
import likeArticles from "./likeArticles.vue";
import articleComment from "./articleComment.vue";
import commentPost from "./commentPost.vue";
import replyComment from "./replyComment.vue";
export default {
  name: "acticle",
  components: {
    followUsersBtn,
    collectArticles,
    likeArticles,
    articleComment,
    commentPost,
    replyComment,
  },
  // 给所有的后代组件提供数据
  // 注意：不要滥用
  provide: function () {
    return {
      articleId: this.articleId,
    };
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  data() {
    return {
      errorCode: 0,
      article: {},
      isLoading: true,
      showPopup: false,
      showReplyPopup: false,
      comList: [], //评论列表
      currentComment: {},
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getActileContent();
  },
  mounted() {},
  methods: {
    async getActileContent() {
      try {
        const res = await getArticleDetail(this.articleId);
        this.article = res.data.data;
        this.isLoading = false;
        console.log(this.article);
        // 因为dom更新不是立即的，所以此时获取不到图片，需要加入异步队列去获取
        setTimeout(() => {
          this.getImagesAndPreview();
        }, 0);
      } catch (err) {
        if (err.response && err.response.status) {
          this.errorCode = err.response.status;
        }
      }
    },
    // 获取图片，并添加点击事件，预览图片
    getImagesAndPreview() {
      let articleC = this.$refs["articleContent"];
      let imgs = articleC.querySelectorAll("img");
      let images = [];
      if (imgs && imgs.length) {
        imgs.forEach((element, index) => {
          images.push(element.src);
          element.addEventListener("click", function () {
            //调用vant组件库预览图片的组件函数
            ImagePreview({
              images: images,
              startPosition: index,
            });
          });
        });
      }
    },
    //评论发布成功
    onPostSuccess(data) {
      // 关闭弹框
      this.showPopup = false;
      // 操作数组，渲染页面
      this.comList.unshift(data);
      //评论总数量+1
      this.article.comm_count++;
    },
    // 点击评论回复
    showReplyFn(obj) {
      // 弹出评论回复列表
      this.showReplyPopup = true;
      // 获取当前评论项
      this.currentComment = obj;
      console.log("当前评论项", obj);
    },
  },
};
</script>
  
  
<style scoped lang="less">
.article-container {
  background-color: #fff;
  .nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    .icon-youjiantou {
      color: #fff;
      font-size: 30px;
    }
  }
  .main-wrap {
    position: fixed;
    top: 46px;
    left: 0;
    right: 0;
    bottom: 44px;
    overflow-y: scroll;
    background-color: #fff;
    /deep/ .article-detail {
      .title {
        margin: 0;
        font-size: 20px;
        padding: 25px 16px;
        color: #3a3a3a;
      }
      .titleInfo {
        padding: 0 15px;
        .avatar {
          width: 35px;
          height: 35px;
          margin-right: 10px;
        }
        .van-cell__label {
          margin-top: 0;
        }
        .user-name {
          font-size: 13px;
          color: #3a3a3a;
        }
        .publish-date {
          font-size: 12px;
          color: #b7b7b7;
        }
        .follow-btn {
          width: 85px;
          height: 29px;
        }
      }
      .article-content {
        padding: 25px 16px;
        /deep/ p {
          text-align: justify;
        }
      }
      .bottomBar {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        height: 44px;
        z-index: 20;
        border-top: 1px solid #ddd;
        background-color: #fff;
        display: flex;
        justify-content: space-around;
        box-sizing: border-box;
        align-items: center;
        .comment-btn {
          height: 25px;
          width: 50%;
          border: 2px solid #eee;
          margin-right: 15px;
          font-size: 15px;
          color: #a7a7a7;
        }
        .van-icon {
          font-size: 20px;
          .van-info {
            font-size: 8px;
            background-color: #e22829;
          }
        }
        .share {
          margin: 0 15px;
        }
      }
    }
    .loading-wrap {
      padding: 100px 16px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-content: center;
    }
    .error-wrap {
      padding: 100px 16px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-content: center;
      text-align: center;
      .van-icon {
        font-size: 61px;
        color: #b4b4b4;
      }
      .text {
        font-size: 15px;
        color: #666666;
        margin: 16px 0 23px;
      }
      .retry-btn {
        height: 35px;
        line-height: 35px;
        border: 1px solid #c3c3c3;
        font-size: 15px;
        color: #666;
      }
    }
    .bottomBg {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      height: 44px;
      background-color: #fff;
    }
  }
}
</style>