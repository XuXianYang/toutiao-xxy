<template>
  <div class="search-suggestion">
    <van-cell
      v-for="(str, index) in suggestionList"
      :key="index"
      icon="search"
      @click="$emit('onSearch', str)"
    >
      <div slot="title" v-html="highlight(str, searchString)"></div>
    </van-cell>
  </div>
</template>
  
  <script>
// lodash 支持按需加载，有利于打包结果优化
import { debounce } from "lodash";
import { getSuggestions } from "@/api/user";
export default {
  data() {
    return {
      suggestionList: [],
    };
  },
  props: {
    searchString: {
      type: String,
    },
  },
  watch: {
    searchString: {
      // debounce 函数:参数1：函数,参数2：防抖时间
      // 返回值：防抖之后的函数，和参数1功能是一样的
      handler: debounce(async function (val) {
        if (val) {
          try {
            const res = await getSuggestions(val);
            this.suggestionList = res.data.data.options;
            console.log('搜索建议');
            console.log(res.data);
          } catch (err) {}
        }
      }, 800),
      immediate: true, // 该回调将会在侦听开始之后被立即调用
    },
  },
  methods: {
    highlight(source, keyword) {
      // 如果source为空，会报错：Cannot read properties of null (reading 'replace')
      if(!source || !keyword)return source
      //方法1： 利用字符串分割数组，然后再拼接字符串，达到填充样式的效果
      //const arr = source.split(keyword);
      //return arr.join(`<span style="color: #3296fa">${keyword}</span>`);
      //方法2：字符串传入正则表达式替换 RegExp 是原生 JavaScript 的内置构造函数
      // 参数1：字符串，注意，这里不要加 //
      // 参数2：匹配模式，g 全局，i 忽略大小写
      const reg = new RegExp(keyword, "gi");
      return source.replace(
        reg,
        `<span style="color: #3296fa">${keyword}</span>`
      );
    },
  },
};
</script>
  
  <style scoped lang="less">
</style>