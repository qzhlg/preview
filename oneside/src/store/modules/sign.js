import {getSignListed,getSigndetail,updateSign} from '../../service/index'
import moment from 'moment'
const state={
    active: 1, //表示当前面试类型，0表示全部，1表示未开始，1表示已打卡，2表示已放弃
    list: [], //面试列表
    hasMore: true,  //是否有更多数据
    page: 1, //当前页码
    pageSize: 10 ,//每页数据,
    info:{} // 详情数据
}
const mutations={
    updateState(state, payload){
        // 判断是否还有更多页码
        state.list=payload
        if (payload.list){
          if (payload.list.length === state.pageSize*state.page){
            state.hasMore = true
          }else{
            state.hasMore = false
          }
        }
        for (let key in payload){
          state[key] = payload[key]
        }
      }
}
const actions={
 // 获取面试列表
async getSignList({commit, state}, payload){
    let params = {};
    // 修正面试状态
    if (state.active){
      params.status = state.active-2;
    }
    // 拼接面试页码和每页数量
    params.page = state.page;
    params.pageSize = state.pageSize;
    let result = await getSignListed(params);
    result.forEach(item=>{
      item.address = JSON.parse(item.address);
      item.start_time = formatTime(item.start_time);
    })
    commit('updateState',{list:result})
    // 判断是替换还是追加
    if(state.page==1){
      commit('updateState',{list:result})
    }else{
      commit('updateState',{list:[...state.list,...result]})
    }
   
  },
  // 详情页
  async goDetail({commit},payload){
    let res=await getSigndetail(payload)
    if (res[0].address){
      res[0].address = JSON.parse(res[0].address);
    }
    res[0].start_time = formatTime(res[0].start_time);
    commit('updateState', {info:res[0]});
  },
  async updateDetail({commit,dispatch},payload){
    const result=await updateSign(payload.id,payload.params)
    if(result.code==0){
      // 重新获取面试详情
      dispatch('goDetail',payload.id)
    }
    console.log(result,'yyyyyyyyyyyyy')
  }
}

function formatTime(start_time){
  return moment(start_time*1).format('YYYY-MM-DD HH:mm');
}
export default {
    namespaced:true,
    state,
    mutations,
    actions
}