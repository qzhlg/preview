<template>
  <form class="mask_page">
    <h3 class="title">面试信息</h3>
    <view class="form">
      <p>
        <span>公司名称</span>
        <input class="weui-input" focus placeholder="请输入公司名称" />
      </p>
      <p>
        <span>公司电话</span>   
        <input type="number" placeholder="请输入面试联系人电话" />
      </p>
      <p>
        <span>面试时间</span>
        <picker class="picker" mode="time"  start="09:01" end="21:01" bindchange="bindTimeChange">
          <view  class="picker1"> {{time}}</view>
        </picker>
      </p>
      <p class="last">
        <span>面试地址</span>
        <input type="text" placeholder="请选择面试地址" @click="bindfocuss">
      </p>
    </view>
    <h3 class="title">备注信息</h3>
    <view>
      <textarea placeholder="备注信息（可选，100字以内）" name="textarea" class="textarea" maxlength='100'/>
      <button form-type="submit" class="commit">提交</button>
    </view>
  </form>
</template>
<script>
export default {
  data() {
    return {
      time: "12:01"
    };
  },
  methods: {
    bindTimeChange: function(e) {
      console.log("picker发送选择改变，携带值为", e.detail.value);
      this.setData({
        time: e.detail.value
      });
    },
     bindfocuss:()=>{
        wx.navigateTo({
            url: '/pages/address/index'
        })
    }
  }
};
</script>
<style  scoped>
.mask_page {
  width: 100%;
  height: auto;
  font-size: 14px;
 
}
.title {
       width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
  /* margin-left: 10px; */
   background: #e5e5e5;
   padding-left: 10px

}
.form {
  height: 150px;
  background: #fff;
}
p {
  height: 37px;
  border-bottom: .5px #e5e5e5 solid;
  display: flex;
  line-height: 37px;
}
.last{
    border-bottom: 0;
}
span {
  flex: 3;
  text-align: center;
}
input,.picker,.picker1 {
  /* width: 70%; */
  flex: 7;
  display: inline-block;
  height: 100%;
}
.textarea{
    height: 100px;
    width: 90%;
    border: 1px #ccc solid;
    margin:10px auto;
    background: #fff;
}
.commit{
    margin: 10px auto;
    background: rgba(0,0,0,.5);
    color: #fff;
    width: 100%;
}
</style>