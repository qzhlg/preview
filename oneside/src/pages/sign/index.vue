<template>
  <div class="wrap">
    <map name="map" show-location="true" :latitude="latitude" :longitude="longitude">
      <button class="addmask" @click="addmask">添加面试</button>
    </map>
  </div>
</template>
<script>
import QQMapWX from "../../utils/qqmap-wx-jssdk.min.js";
export default {
  name: "sign",
  data() {
    return {
      longitude: 116.29845,
      latitude: 39.95933
    };
  },
  methods: {
    addmask() {
      console.log(111);
      wx.navigateTo({
        url: '/pages/mask/index'
      })
    }
  },
  async created() {
    // 判断是否需要指纹识别
    let fingerInfo=wx.getStorageSync('finger')
    if (!fingerInfo||!fingerInfo.finger||+new Date()-fingerInfo.timestamp>24*60*60*1000) {
      wx.navigateTo({
        url:'/pages/finger/index'
      })
      return
    }
    let qqmapsdk = new QQMapWX({
      key: "ZVUBZ-J46CU-7IPVI-2N6M4-2EIRV-V7FCM"
    });
    qqmapsdk.getSuggestion({
      //获取输入框值并设置keyword参数
      keyword: "八维", //用户输入的关键词，可设置固定值,如keyword:'KFC' //region:'北京', //设置城市名，限制关键词所示的地域范围，非必填参数
      success: function(res) {
        //搜索成功后的回调
        console.log(res);
      }
    });

    wx.getLocation({
      success: res => {
        console.log("res...", res);
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
.wrap {
  width: 100%;
  height: 100%;
}
map {
  width: 100%;
  height: 100%;
}
.addmask {
  position: fixed;
  bottom: 0;
  left: 0;
  background: #000;
  width: 100%;
  color: #fff;
}
</style>