<template>
  <div class="wrap">
    <ul>
      <li>
        <label for>面试地址：</label>
        <span>{{info.address && info.address.address}}</span>
      </li>
      <li>
        <label for>面试时间：</label>
        <span>{{info.start_time}}</span>
      </li>
      <li>
        <label for>联系方式：</label>
        <span @click="makePhone">{{info.phone}}</span>
      </li>
      <li>
        <label for>是否提醒：</label>
        <span>{{info.remind?'未提醒':'已提醒'}}</span>
      </li>
      <li>
        <label for>面试状态：</label>
        <span>{{info.status==-1?'未开始':info.status==0?'已打卡': '已放弃'}}</span>
      </li>
      <li v-if="info.status==-1 && !data.view">
        <label for>取消提醒：</label>
        <switch :checked="info.remind===1" @change="cancelRemember" />
      </li>
    </ul>
    <section v-if="info.status==-1 && !data.view" class="action">
      <button>去打卡</button>
      <button>放弃面试</button>
    </section>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  onLoad(options) {
    this.id = options.id;
    // 把view属性加到响应监听里面
    this.$set(this.data, 'view', options.view || false)
  },
  methods: {
    ...mapActions({
      goDetail: "sign/goDetail",
      updateDetail:"sign/updateDetail"
    }),
    cancelRemember(e){
      // 取消提醒
      console.log(e,'www')
      this.updateDetail({
        id: this.id,
        params: {remind: e.target.value?1:-1}
      })
    }
  },
  computed: {
    ...mapState({
      info: state => state.sign.info
    })
  },
  async onShow() {
    await this.goDetail(this.id);
    // 修改标题
    wx.setNavigationBarTitle({ title: this.info.company });
    wx.hideLoading();
  }
};
</script>
<style scoped>
ul {
  border-top: 1rpx solid #eee;
  border-bottom: 1rpx solid #eee;
  background: #fff;
}
li {
  width: 720rpx;
  min-height: 88rpx;
  margin-left: 30rpx;
  border-bottom: 1rpx solid #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
label {
  color: #666;
  width: 170rpx;
  font-size: 30rpx;
}

span,
switch {
  flex: 1;

  font-size: 30rpx;
  color: #333;
}
li:last-child {
  border-bottom: none;
}
.action {
  display: flex;
  margin: 50rpx 15rpx;
}
button {
  flex: 1;
  color: #fff;
  margin: 15rpx;
}

button:first-child {
  background: #197dbf;
}
button:last-child {
  background: #dc4e42;
}
</style>