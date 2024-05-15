<template>
  <div class="search-container">
    <!--
      Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮
     -->
    <form class="searchBar" action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @focus="isResultShow = false"
      >
        <div class="cancel" slot="action" @click="$router.back()">取消</div>
      </van-search>
    </form>
    <SearchResult v-if="isResultShow" :searchString="searchText">
    </SearchResult>
    <SearchSuggestion
      v-else-if="searchText"
      :searchString="searchText"
      @onSearch="onSearch"
    >
    </SearchSuggestion>
    <SearchHistory
      v-else
      :resultList="historyList"
      @deleteAll="historyList = []"
      @onSearch="onSearch"
    >
    </SearchHistory>
  </div>
</template>

<script>
import SearchHistory from "./search-history.vue";
import SearchResult from "./search-result.vue";
import SearchSuggestion from "./search-suggestion.vue";
import { getItem,setItem } from '@/utils/storage'
export default {
  data() {
    return {
      searchText: "",
      isResultShow: false,
      historyList: getItem('historyList')||[],
    };
  },
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion,
  },
  // 通过监听历史记录的数据，缓存到本地
  watch:{
    historyList(list){
      setItem('historyList',list)
    }
  },
  methods: {
    onSearch(str) {
      if(!str||!str.trim().length)return
      this.searchText = str;
      this.isResultShow = true;

      const index = this.historyList.indexOf(str);
      // 如果存在，先删除
      if (index !== -1) {
        this.historyList.splice(index, 1);
      }
      // 加入到数组最前面
      this.historyList.unshift(str);
    },
  },
};
</script>

<style scoped lang="less">
.search-container {
  padding-top: 54px;
  .searchBar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
  }
  .cancel {
    color: #fff;
  }
}
</style>