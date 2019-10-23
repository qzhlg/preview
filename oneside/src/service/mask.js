import request from '../utils/request'

// 添加面试

export function addSign(params){
    return request.post('/sign',params)
}
// 获取面试列表
export function getSignList(params){
    return request.get('/sign',params)
}

 // 更新面试信息
 export function updateSign(params){
     return request.post('/sign/1',params)
 }

//  // 获取面试详情
//   export function getSigndetail(){
//       return request.put('/sign'+)
//   }