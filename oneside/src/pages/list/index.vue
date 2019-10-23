<template>
  <view class="main">
    <ul  class="nav">
      <li v-for="(item,index) in typeList" :key="index" :class="index===current?'active':''" @click="checkIndex(index)">{{item}}</li>
    </ul>
    <view class="container">
      
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      current:0,
      typeList: ["未打卡", "已打卡", "已放弃", "全部"]
    };
  },
  methods:{
    checkIndex(index){
      this.current=index
    }
  }
};
</script>
<style scoped>
.main {
  width: 100%;
  height: 100%;
}
.nav {
  position: fixed;
  top: 0;
  left: 0;
  background: #fff;
  z-index: 99;
  width: 100%;
  height: 88rpx;
  display: flex;
}
.nav li {
 text-align: center;
  border-top: 2rpx solid #eee;
  flex: 1;
  display: inline-block;
  line-height: 88rpx;
}
.active{
  border-bottom: 1px blue solid;
}
.container {
  padding-top: 88rpx;
  display: block;
}
</style>