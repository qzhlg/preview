import {code2session,fingerVerify} from '../../service/index'
const state={
    openid:''
}

const mutations={
    setcode(state,payload){
        state.openid=payload
    }
}   

const actions={
    async login({commit},params){
        const res=await code2session(params)
        console.log('res.data',res.data)
       
        if(res.openid){
            commit('setcode',res.openid)
        }
    },

    async fingerVerify({state:{openid}},params){
        params.openid=openid
        let data=await fingerVerify(params)
        return data.code
    }
}

export default {
    namespaced:true,
    state,
    mutations,
    actions
}