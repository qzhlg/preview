<template>
  <div class="my">
    <div class="top">
      <p class="artar">
        <img src="/static/images/my.png" alt />
      </p>

      <p class="phone">
        176****1428
      </p>
    </div>
    <ul class="bottom">
      <li @click="goMask">
        <icon type="waiting" size="20" class="icon" />我的面试
      </li>
      <button open-type="contact" @bindcontact="handleContact" class="person">
        <icon type="info" size="20" class="icon" />
        <span>客服中心</span>
      </button>
    </ul>
    <button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" v-show="phone.length">获取手机号</button>
  </div>
</template>
<script>
import { mapActions,mapState } from "vuex";
export default {
  data() {
    return {};
  },
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
  },
  computed:{
      ...mapState({
          phone:state=>state.user.phone
      })
  },
  handleContact(e) {
    console.log(e.detail.path);
    console.log(e.detail.query);
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
.phone{
  text-align: center;
  
}
.bottom li {
  height: 60px;
  border-bottom: 1px #ccc solid;
  line-height: 60px;
  font-size: 14px;
}
.bottom li .icon {
  margin: 14px;
}
.person {
  text-align: left;
}
.person span {
  margin: 0 13px;
  font-size: 14px;
}
</style>