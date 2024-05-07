<template>
  <div class="layout-container">
    <div class="main">
      <!-- 路由挂载点：挂载二级路由对应的组件 -->
      <router-view></router-view>
    </div>
    <van-tabbar class="layout-tabbar" v-model="active" route>
      <van-tabbar-item replace to="/layout/home">
        <i slot="icon" class="iconfont icon-shouye"></i>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item replace to="/layout/qa">
        <i slot="icon" class="iconfont icon-wenda"></i>
        <span class="text">问答</span>
      </van-tabbar-item>
      <van-tabbar-item replace to="/layout/video">
        <i slot="icon" class="iconfont icon-shipin"></i>
        <span class="text">视频</span>
      </van-tabbar-item>
      <van-tabbar-item replace to="/layout/my">
        <i slot="icon" class="iconfont icon-wode"></i>
        <span class="text">我的</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
    data(){
        return {
            active:0
        }
    }
}
</script>

<style scoped lang="less">
.layout-container {
  .main{
    padding: 0 0 50px;
  }
  .layout-tabbar {
    i.iconfont {
      font-size: 20px;
    }
    span.text {
      font-size: 10px;
    }
  }
}
</style>