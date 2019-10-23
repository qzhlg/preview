<template>
  <div class="wrap">
    <map name="map" show-location="true" :latitude="latitude" :longitude="longitude">
      <button class="addmask" @click="addmask">添加面试</button>
    </map>
  </div>
</template>
<script>
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