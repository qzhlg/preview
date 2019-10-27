<template>
  <div class="wrap">
    <smap class="map-modle"></smap>
    <!-- <map name="map" show-location=true :latitude="latitude" :longitude="longitude"></map> -->
    <div class="mine">
      <img src="/static/images/my.png" alt="" @click="gomine">
    </div>
    <button class="addmask" @click="addmask">添加面试</button>
  </div>
</template>
<script>
import smap from '../../components/smap'

export default {
  name: "sign",
  components:{
    smap
  },
  methods: {
    addmask() {
      
      wx.navigateTo({
        url: '/pages/mask/index'
      })
    },
    gomine(){
      wx.navigateTo({
        url:'/pages/my/index'
      })
    }
  },
  // async created() {
  //   // 判断是否需要指纹识别
  //   let fingerInfo=wx.getStorageSync('finger')
  //   if (!fingerInfo||!fingerInfo.finger||+new Date()-fingerInfo.timestamp>24*60*60*1000) {
  //     wx.navigateTo({
  //       url:'/pages/finger/index'
  //     })
  //     return
  //   }
  // }
};
</script>
<style  scoped>
.wrap {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.map-modle{
  width: 100%;
  height: 100%
}
map {
  flex: 1;
  width: 100%;
  height:100%;
}
.addmask {
  position: fixed;
  bottom: 0;
  left: 0;
  background: #000;
  width: 100%;
  color: #fff;
}
.mine{
  position: fixed;
  bottom: 10%;
  right: 8%;
}
.mine img{
    width: 50px;
    height: 50px;
}
</style>