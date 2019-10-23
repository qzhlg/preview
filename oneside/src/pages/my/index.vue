<template>
    <div>
         <button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">获取手机号</button>
    </div>
</template>
<script>
import {mapActions} from 'vuex'
export default {
    methods:{
       ...mapActions({
            decryptPhone: 'user/decryptPhone'
        }),
        getPhoneNumber(res){
            console.log('phoneNumber...', res);
            if (res.detail.errMsg === "getPhoneNumber:ok"){
                let {iv, encryptedData} = res.detail;
                this.decryptPhone({iv, encryptedData});
            }else{
                wx.showToast({
                  title: '为了更好的享受服务，请先绑定手机号', //提示的内容,
                  icon: 'none', //图标,
                });
            }
        }
    }
}
</script>