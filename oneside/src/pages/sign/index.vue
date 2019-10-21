<template>
  <div class="wrap">
    <!-- <button type="default" @click="gotable">跳转到tab页</button> -->
    <map name="map" show-location="true"  :latitude="latitude" :longitude="longitude"></map>
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
  methods:{
    // gotable(){
    //   uni.switchTab({
    //     url:'/pages/tabBar/component/component'
    //   })
    // }
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
</style>