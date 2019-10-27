<template>
  <view class="address">
    <p class="city">
      <span>北京</span>
      <input type="text" focus placeholder="面试地址" v-model="address" @input="watchMethod" />
    </p>
    <ul>
      <li
        v-for="(item,index) in addressList"
        :key="index"
        hover-class="hover"
        @click="select(index)"
      >
        <div class="add">
          <div class="line">
            <p class="img"><img src="/static/images/logo.png" alt=""></p>
            <div class="com">
              <h3>{{item.title}}</h3>
              <span>{{item.address}}</span>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </view>
</template>
<script>
import QQMapWX from "../../utils/qqmap-wx-jssdk.min.js";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      address: "",
      addressList: []
    };
  },
  methods: {
    ...mapMutations({
      updateState: "indexView/updateState"
    }),
    select(index) {
      this.updateState({
        address: this.addressList[index]
      });
      wx.navigateBack();
    },
    watchMethod() {
      let qqmapsdk = new QQMapWX({
        key: "ZVUBZ-J46CU-7IPVI-2N6M4-2EIRV-V7FCM"
      });
      setTimeout(() => {
        qqmapsdk.getSuggestion({
          //获取输入框值并设置keyword参数
          keyword: this.address, //用户输入的关键词，可设置固定值,如keyword:'KFC' //region:'北京', //设置城市名，限制关键词所示的地域范围，非必填参数
          success: res => {
            //搜索成功后的回调
            this.addressList = res.data;
          }
        });
      }, 3000);
    }
  },
  created() {
    wx.getLocation({
      success: res => {
        const latitude = res.latitude;
        const longitude = res.longitude;
        const speed = res.speed;
        const accuracy = res.accuracy;
      }
    });
  }
};
</script>
<style  scoped>
.address {
  width: 100%;
  height: 100%;
}
.city {
  height: 40px;
  border-bottom: 0.5px #ccc solid;
  display: flex;
}
span {
  flex: 3;
  text-align: center;
  line-height: 40px;
  border-right: 0.5px #ccc solid;
}
input {
  display: inline-block;
  height: 100%;
  flex: 7;
}
.line{
  height: 60px;
  border-bottom: .5px #ccc solid;
  display: flex;
}
.img{
  flex: 2;
}

.com{
  flex: 8;
  white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis;
}
.com h3{
  width: 100%;
  font-size: 16px;
  
}
.com span{
  color: gray;

}
.add .line img{
  display: inline-block;
  width: 30px;
  height: 30px;
  margin: 15px;
}
</style>