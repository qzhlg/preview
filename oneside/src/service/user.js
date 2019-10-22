import request from '../utils/request'

// 登陆接口
export function code2session(params){
    const result= request.post('/user/code2session', params)
    return result
}

// 生物认证
export function fingerVerify(params){
    console.log(params)
    return request.post('/user/fingerPrint', params);
}

// 解密数据
export function decryptPhone(params){
    return request.post('/user/decrypt', params);
}