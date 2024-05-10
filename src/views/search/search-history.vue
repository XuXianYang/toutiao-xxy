<template>
  <div class="search-history">
    <van-cell class="title" title="搜索历史">
      <template v-if="isDelete">
        <span @click="$emit('deleteAll')">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDelete = false">完成</span>
      </template>
      <van-icon v-else name="delete" @click="isDelete = true" />
    </van-cell>
    <van-cell
      v-for="(item,index) in resultList"
      :key="item"
      @click="onSearch(item,index)"
      :title="item"
    >
      <van-icon v-show="isDelete" name="close" />
    </van-cell>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDelete: false,
    };
  },
  props: {
    resultList: {
      type: Array,
    },
  },
  methods: {
    onSearch(str,index){
      if(this.isDelete){
        this.resultList.splice(index, 1)
      }else{
        this.$emit('onSearch',str)
      }
    }
  },
};
</script>

<style scoped lang="less">
.search-history {
  .title {
    display: flex;
  }
}
</style>