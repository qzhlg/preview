import request from '../utils/request'

// 添加面试

export function addSign(params){
    return request.post('/sign',params)
}
