import request from '../utils/request'

// 添加面试
export function addSign(params){
    return request.post('/sign',params)
}
// 获取面试列表
export function getSignListed(params){
    const result=request.get('/sign',params)
    return result
}

 // 获取面试详情
  export function getSigndetail(id){
     const result=request.get('/sign?id='+id)
      return result
  }

   // 更新面试信息
 export function updateSign(id,params){
    return request.put('/sign/'+id,params)
}
