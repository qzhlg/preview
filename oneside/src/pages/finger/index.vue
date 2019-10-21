<template>
  <div>
    this is finger page
    <button @click="startFinger">点击识别</button>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions({
      fingerVerify: "/user/fingerVerify"
    }),
    startFinger() {
      wx.startSoterAuthentication({
        requestAuthModes: ["fingerPrint"],
        challenge: "123456",
        authContent: "请用指纹解锁",
        success: async (res)=> {
            console.log('res...',res)
        }
      });
    }
  }
}
</script>