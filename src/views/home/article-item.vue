<template>
  <div class="acticleItem">
    <van-cell>
      <div class="title" slot="title">{{ article.title }}</div>
      <div class="name" slot="label">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate |relativeTime }}</span>
        <div class="images" v-if="article.cover.type > 1">
          <van-image
            class="singleImg"
            v-for="(img, index) in article.cover.images"
            :key="index"
            fit="cover"
            :src="img"
          />
        </div>
      </div>
      <div class="one" slot="default" v-if="article.cover.type == 1">
        <van-image class="oneImg" fit="cover" :src="article.cover.images[0]" />
      </div>
    </van-cell>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  created() {
    console.log(this.article.cover.type);
    console.log(this.article.cover.images);
  },
};
</script>

<style scoped lang="less">
 .acticleItem {
  border-bottom: 1px solid #eee;
  .title {
    font-size: 17px;
    color: #333;
  }
  .name {
    color: #999;
    font-size: 12px;
    span {
      margin-right: 10px;
    }
  }
  .images {
    display: flex;
    margin-top: 10px;
    .singleImg {
      width: 33%;
      height: 100px;
    }
    .singleImg:not(:last-child) {
      margin-right: 10px;
    }
  }
  /deep/ .van-cell__value {
    flex: unset;
    width: 116px;
    height: 100px;
    padding-left: 10px;
  }
  .one {
    .oneImg {
      width: 116px;
      height: 100px;
    }
  }
}
</style>