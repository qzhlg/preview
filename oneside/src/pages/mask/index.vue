<template>
  <form class="mask_page" report-submit="true" @submit="submit" @reset="reset">
    <h3 class="title">面试信息</h3>
    <view class="form">
      <p>
        <span>公司名称</span>
        <input class="weui-input" focus placeholder="请输入公司名称" v-model="current.compony" />
      </p>
      <p>
        <span>公司电话</span>
        <input type="number" placeholder="请输入面试联系人电话" maxlength="11" v-model="current.phone" />
      </p>
      <p>
        <span>面试时间</span>
        <picker
          class="picker"
          mode="multiSelector"
          :range="dateRange"
          :value="info.date"
           @change="dateChange"
          @columnchange="columnChange"
        >
          <view class="picker1">{{dateShow}}</view>
        </picker>
          <icon
          @click="showTimeTip"
          class="tip"
          type="warn"
          color="#197DBF"
          size="24">
        </icon>
      </p>
      <p class="last">
        <span>面试地址</span>
        <input type="text" placeholder="请选择面试地址" @click="goSearch" v-model="current.address" />
      </p>
    </view>
    <h3 class="title">备注信息</h3>
    <view>
      <textarea
        placeholder="备注信息（可选，100字以内）"
        name="textarea"
        class="textarea"
        maxlength="100"
        v-model="current.description"
      />
      <button form-type="submit" class="commit" :class="btnEnable?'':'disable'">提交</button>
    </view>
  </form>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
const moment = require("moment");

const range = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [ 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
  ["00分", "10分", "20分", "30分", "40分", "50分"]
];
export default {
  data() {
    return {
      info: {
        date: [0, 0, 0]
      }
    };
  },
  creatd() {
    // 如果当前时间实在12点之后，过滤掉今天
    if (moment().hour() == 23) {
      this.info.date = [1, 0, 0];
    }
  },
  computed: {
    ...mapState({
      current: state => state.indexView.current
    }),
    // 首先判断按钮是否可以点击
    btnEnable() {
      // 判断公司名是否为空
      if (!this.current.compony) {
        return false;
      }
      // 判断手机号是否为空
      if (!this.current.phone) {
        return false;
      }
      // 判断手机号是否符合规范
      if (
        !/^1(3|4|5|7|8)\d{9}$/.text(this.current.phone) ||
      /!^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.text(this.current.phone)
      ) {
        return false;
      }
      // 判断公司地址是否为空
      if (!this.current.address) {
        return false;
      }
      return true;
    },
    // 处理面试日期
    dateRange() {
      let dateRange = [...range];
      console.log(dateRange);
      // 如果是今天的话，则过滤掉之前的小时
      if (!this.info.date[0]) {
        dateRange[1] = dateRange[1].filter(item => {
          return item > moment().hour();
        });
      } else {
        dateRange[1] = range[1];
      }
      // 格式化小时
      dateRange[1] = dateRange[1].map(item => {
        return item + "点";
      });
      // 计算当前时间之后的十天
      dateRange[0] = dateRange[0].map(item => {
        return (
          moment()
            .add(item, "days")
            .date() + "号"
        );
      });
      return dateRange;
    },
    // 显示日期
    dateShow() {
      return moment()
        .add(moment().hour() == 23 ? this.info.date[0] - 1 : this.info.date[0],"d")
        .add(this.info.date[1] + 1, "h")
        .minute(this.info.date[2] * 10)
        .format("YYYY-MM-DD HH:mm");
    }
  },

  methods: {
    ...mapActions({
      addSign: "mask/addSign",
       submitInterview: 'interview/submit'
    }),
    ...mapMutations({
      updateState: 'interview/updateState'
    }),
      // 监听多列选择器每列变化
    columnChange(e){
      let {column, value} = e.target;
      let date = [...this.info.date];
      date[column] = value;
      this.info.date = date;
    },
   showTimeTip(){
     wx.showToast({
       title: '在面试前一小时我们会通知你',
       icon: 'none'
     })
   },
    goSearch: () => {
      wx.navigateTo({
        url: "/pages/address/index"
      });
    },
    // 提交添加面试表单
   async submit(e) {
     // 判断按钮是否正在提交状态
     if(this.submiting){
       return false;
     }
     // 判断公司名称是否为空
      if (!this.current.compony) {
        wx.showToast({
          title:'请输入公司名称',
          icon:'none'
        })
        return false;
      }
      // 判断号码是否符合规范
      if (!/^1(3|4|5|7|8)\d{9}$/.text(this.current.phone) ||
      /!^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.text(this.current.phone)) {
        wx.showToast({
          title: '请输入面试联系人的手机或 座机',
          icon: 'none'
        })
        return false;
      }
      console.log(e);
      this.addSign({
        form_id: e.detail.formId,
        company: "北京大学",
        phone: "17621526605",
        address: JSON.stringify({ address: "北京市海淀区颐和园路5号" }),
        latitude: 39.59,
        longitude: 116.18,
        start_time: ~~(+new Date() / 60000) * 60000 + 65 * 60 * 1000,
        description: "测试form_id"
      });
    }
  }
};
</script>
<style  scoped>
.mask_page {
  width: 100%;
  height: auto;
  font-size: 14px;
}
.title {
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
  /* margin-left: 10px; */
  background: #e5e5e5;
  padding-left: 10px;
}
.form {
  height: 150px;
  background: #fff;
}
p {
  height: 37px;
  border-bottom: 0.5px #e5e5e5 solid;
  display: flex;
  line-height: 37px;
}
.last {
  border-bottom: 0;
}
span {
  flex: 3;
  text-align: center;
}
input,
.picker,
.picker1 {
  /* width: 70%; */
  flex: 7;
  display: inline-block;
  height: 100%;
}
.textarea {
  height: 100px;
  width: 90%;
  border: 1px #ccc solid;
  margin: 10px auto;
  background: #fff;
}
.commit {
  margin: 10px auto;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  width: 100%;
}
</style>