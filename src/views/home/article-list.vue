<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isLoading"
      :success-text="successtext"
      success-duration="1500"
      @refresh="onRefresh"
    >
      <van-list
        class="list"
        v-model="loading"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <articleItem
          v-for="(article, index) in list"
          :key="index"
          :article="article"
        ></articleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
  
  <script>
import { getArtilceList } from "@/api/user";
import articleItem from "@/views/home/article-item";
export default {
  name: "ArticleList",
  components: { articleItem },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      // 请求数据的时间戳：默认当前时间请求第一页，下一页的时间戳是服务端当前页码的数据返回
      timestamp: null,
      error: false,
      isLoading: false,
      successtext: "刷新成功",
    };
  },
  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      // 异步更新数据
      try {
        const param = {
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(), //时间戳用来请求当前页码的数据，如果设置当前时间，就是第一页
        };
        const { data } = await getArtilceList(param);

        // 把加载状态置为false，停止加载，等待滑动到底部开启下一次加载
        this.loading = false;

        const results = data.data.results;
        if (results && results.length) {
          this.timestamp = data.data.pre_timestamp;
          this.list.push(...results);
        } else {
          this.finished = true;
        }
      } catch (err) {
        // 请求失败：停止加载，开启错误提示
        this.loading = false;
        this.error = true;
      }
    },
    // 下拉刷新请求
    async onRefresh() {
      try {
        const param = {
          channel_id: this.channel.id,
          timestamp: Date.now(),
        };
        const { data } = await getArtilceList(param);

        // 把加载状态置为false
        this.isLoading = false;

        const results = data.data.results;
        if (results && results.length) {
          this.list.unshift(...results);
          this.successtext = `刷新成功，刷新了${results.length}条数据`;
        }
      } catch (err) {
        // 请求失败：停止加载，开启错误提示
        this.isLoading = false;
        this.$toast("刷新失败");
      }
    },
  },
};
</script>
  
<style scoped lang="less">
.article-list {
  position: fixed;
  left: 0;
  right: 0;
  top: 90px;
  bottom: 50px;
  overflow-y: auto;
}
</style>