import store from '../store'

// 浏览器和React Native
var Fly = require("flyio/dist/npm/wx")
var fly = new Fly;

// 请求全局配置
fly.config = {
    baseURL: 'http://123.206.55.50:7001/',
    timeout: 3000
}

//添加请求拦截器
fly.interceptors.request.use((request) => {
    //给所有请求添加自定义header, 以openid做登录态
    console.log(store)
    if (store.state.user.openid) {
        request.headers["openid"] = store.state.user.openid;
    }else{
        console.log(1)
    }
    //打印出请求体
    console.log(request.body)
    //终止请求
    //var err=new Error("xxx")
    //err.request=request
    //return Promise.reject(new Error(""))

    //可以显式返回request, 也可以不返回，没有返回值时拦截器中默认返回request
    return request;
})

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
    (response) => {
        console.log('response...', response);
        //只将请求结果的data字段返回
        if (response.data.code != 0) {
            wx.showToast({
                title: JSON.stringify(response.data.msg), //提示的内容,
                icon: 'none' //图标,
            });
            return Promise.resolve();
        } else {
            return response.data.data;
        }
    },
    (err) => {
        //发生网络错误后会走到这里
        wx.showToast({
            title: err.message, //提示的内容,
            icon: 'none', //图标,
        });
        return Promise.resolve();
    }
)

export default fly;