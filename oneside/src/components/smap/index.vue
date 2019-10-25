<template>
  <div class="map">
    <map name="map" :latitude="latitude" :longitude="longitude"></map>
  </div>
</template>
<script>
export default {
  name: "smap",
  data() {
    return {
      longitude: 116.29845,
      latitude: 39.95933
    };
  },
  props: {
    markers: {
      type: Array,
      default: []
    }
  }
};
</script>
<style scoped>
.map {
  width: 100%;
  height: 100%;
}
map {
  width: 100%;
  height: 100%;
}
</style>