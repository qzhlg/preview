<template>
  <view class="main">
    <ul class="nav">
      <li
        v-for="(item,index) in typeList"
        :key="index"
        :class="(active+3)%4===index?'active':''"
        @click="checkIndex(index)"
      >{{item}}</li>
    </ul>
    <view class="container">
      <ul v-if="list.length" class="content">
        <li v-for="it in list" :key="it.id" @click="goDetail(it.id)" >
          <h2>
            <span class="company">{{it.company}}</span>
            <span  :class="'tag'+(it.status+2)">{{it.status?it.status==1?'已放弃':'未开始':'已打卡'}}</span>
          </h2>
           <p class="address">{{it.address.address}}</p>
          <h4>
            <span class="time">面试时间:{{it.start_time}}</span>
            <span :class="'tag'+(2-it.status)">{{it.remind?'未提醒':'已提醒'}}</span>
          </h4>
        </li>
      </ul>
      <p v-else class="null">当前分类还没有面试！</p>
    </view>
  </view>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      typeList: ["未打卡", "已打卡", "已放弃", "全部"]
    };
  },

  methods: {
    ...mapMutations({
      updateState: "sign/updateState"
    }),
    ...mapActions({
      getSignList: "sign/getSignList"
    }),
    checkIndex(index) {
      this.updateState({ active: (index + 1) % 4, page: 1 });
      this.getSignList(); 
    },
    goDetail(id){
      wx.navigateTo({url: `/pages/detail/index?id=${id}`})
    }
  },
  computed: {
    ...mapState({
      active: state => state.sign.active,
      list: state => state.sign.list,
      page: state => state.sign.page,
      hasMore: state => state.sign.hasMore
    })
  },
 async onShow() {
   await this.getSignList();
   console.log(this.list,'111111')
  },
  onPullDownRefresh() {
    // 上拉刷新
    // if (!this.hasMore) {
      // this. fetchArticleList(1, true).then(() => {
        // 处理完成后，终止下拉刷新
        wx.stopPullDownRefresh()
      // })
    // }
  },


   onReachBottom() {
    // 下拉触底，先判断是否有请求正在进行中
    if (this.hasMore) {
      this.updateState({page:this.page+1})
      this.getSignList()
    }
  },
};
</script>
<style scoped>
.main {
  width: 100%;
  height: 100%;
  background: #e5e5e5;
}
.nav {
  position: fixed;
  top: 0;
  left: 0;
  background: #fff;
  z-index: 99;
  width: 100%;
  height: 44px;
  display: flex;
}
h2{
  font-size: 18px;
  
}
.company{
  padding: 6px;
}
.address{
  color: gray;
  font-size: 14px;
  margin: 6px;
}
h4{
  font-size: 15px;
}
h4 .time{
  margin: 0 6px;
}

.nav li {
  text-align: center;
  border-top: 1px solid #eee;
  flex: 1;
  display: inline-block;
  line-height: 44px;
  
}
.active {
  border-bottom: 1px blue solid;
}
.container {
  padding-top: 44px;
  display: block;
}
.content{
  width: 100%;
  height: 100%;
}
.content li{
  height: 120px;
  background: #fff;
  margin: 10px auto;
}
.tag1{
  background-color: rgba(144,147,153,.1);
  border-color: rgba(144,147,153,.2);
  color: #909399
}
.tag2{
  background-color: rgba(64,158,255,.1);
  color: #409eff;
  border: 1px solid rgba(64,158,255,.2);
}
.tag3{
  background-color: rgba(245,108,108,.1);
  border-color: rgba(245,108,108,.2);
  color: #f56c6c;
}
.null{
   padding: 50px 0;
  text-align: center;
  font-size: 15px;
  color: #666;
}
</style>