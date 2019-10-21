import request from '../utils/request'
console.log(request)
// 登陆
export function code2session(params){
    return request.post('/user/code2session',params)
}
// 生物认证
export function fingerVerify(params){
    return request.post('/user/fingerPrint',params)
}