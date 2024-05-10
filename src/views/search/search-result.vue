<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(item, index) in list"
        :key="index"
        :title="item.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from "@/api/user";

export default {
  name: "SearchResult",
  components: {},
  props: {},
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      resultList: [],
      page: 1,
      per_page: 20,
    };
  },
  props: {
    searchString: {
      type: String,
    },
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      try {
        const res = await getSearchResult({
          page: this.page,
          per_page: this.per_page,
          q: this.searchString,
        });

        console.log("搜索结果");
        console.log(res);

        const result = res.data.data.results;
        this.list.push(...result);

        this.loading = false;

        if (result.length) {
          this.page++;
        } else {
          this.finished = true;
        }
      } catch (err) {
        this.$toast.fail("暂无内容");
      }
    },
  },
};
</script>

<style scoped lang="less"></style>