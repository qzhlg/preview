<template>
  <div>
    <button @click="startFinger">点击识别</button>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions({
        fingerVerify:"user/fingerVerify"
    }),
    startFinger() {
      wx.startSoterAuthentication({
        requestAuthModes: ["fingerPrint"],
        challenge: "每天用指纹解锁一次",
        authContent: "请用指纹解锁",
        success: async (res) => {
          console.log("res...", res);
          if (res.errCode === 0) {
            let { resultJSON, resultJSONSignature } = res;
            
            let result = await this.fingerVerify({
              json_string: resultJSON,
              json_signature: resultJSONSignature,
              
            });
            if (result === 0) {
              wx.setStorageSync("finger", {
                finger: true,
                timestamp: +new Date()
              });
              wx.navigateBack();
            } else {
              wx.showToast({
                title: "指纹验证失败", //提示的内容,
                icon: "none" //图标,
              });
            }
          }
        }
      });
    },
    created() {
      wx.checkIsSupportSoterAuthentication({
        success(res) {
          console.log('res++++++',res)
          if (res.supportMode.indexOf("fingerPrint") === -1) {
            wx.setStorageSync("finger", {
              finger: true,
              timestamp: +new Date()
            });
            wx.navigateBack();
          }
        }
      });
    }
  }
};
</script>