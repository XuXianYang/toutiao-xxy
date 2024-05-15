<template>
  <div>
    <van-list
      class="commentlist"
      v-model="loading"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <!-- 评论项 -->
      <commentItem
        :comment="obj"
        v-for="(obj, index) in commentList"
        :key="index"
      >
      </commentItem>
    </van-list>
  </div>
</template>

<script>
import { getActicleComment } from "@/api/user";
import commentItem from "./commentItem.vue";
export default {
  data() {
    return {
      error: false,
      loading: false,
      finished: false,
      //获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
      offset: null,
      //获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
      limit: 20,
    };
  },
  components:{commentItem},
  //自定义v-model数据信息
  model: {
    prop: "value", //默认值是value
    event: "input", //默认是 input
  },
  props: {
    //源id，文章id或评论id
    source: {
      type: String,
      required: true,
    },
    //评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
    type: {
      type: String,
      required: true,
    },
    commentList: {
        type:Array,
        required:true,
    },
  },
  created() {
    this.onLoad();
  },
  methods: {
    // 获取文章评论
    async onLoad() {
      try {
        const res = await getActicleComment({
          type: this.type,
          source: this.source,
          offset: this.offset,
          limit: this.limit,
        });
        let resultList = res.data.data.results;
        console.log(resultList);

        this.loading = false;

        if (resultList && resultList.length) {
          this.commentList.push(...res.data.data.results);
          this.offset = res.data.data.last_id;
        } else {
          this.finished = true;
        }
      } catch (err) {
        console.log(err.response.data);
        this.error = true;
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped lang="less">
.commentlist {
  .like {
    color: #ffa500;
  }
}
</style>