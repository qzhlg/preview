<template>
  <div class="my">
    <div class="top">
      <p class="artar">
        <img src="/static/images/my.png" alt />
      </p>

      <p></p>
    </div>
    <ul class="bottom">
      <li @click="goMask">
        <icon type="waiting" size="20" class="icon" />我的面试
      </li>
      <li open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">
        <icon type="info" size="20" class="icon" />客服中心
      </li>
    </ul>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions({
      decryptPhone: "user/decryptPhone"
    }),
    getPhoneNumber(res) {
      console.log("phoneNumber...", res);
      if (res.detail.errMsg === "getPhoneNumber:ok") {
        let { iv, encryptedData } = res.detail;
        this.decryptPhone({ iv, encryptedData });
      } else {
        wx.showToast({
          title: "为了更好的享受服务，请先绑定手机号", //提示的内容,
          icon: "none" //图标,
        });
      }
    },
    goMask() {
      wx.navigateTo({
        url: "/pages/list/index"
      });
    }
  }
};
</script>
<style scoped>
.my {
  width: 100%;
  height: 100%;
}
.top {
  height: 150px;
  background: #e5e5e5;
}

.artar {
  height: 60px;
  width: 60px;
  margin: auto;
  background: #fff;
  border-radius: 50%;
}
.artar img {
  width: 100%;
  height: 100%;
}
.bottom {
  height: 120px;
}
.bottom li {
  height: 60px;
  border-bottom: 1px #ccc solid;
  line-height: 60px;
  font-size: 14px;
}
.bottom li .icon {
  margin: 10px;
}
</style>