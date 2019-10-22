import {code2session, fingerVerify, decryptPhone} from '../../service/index'
const state={
    openid:'',
    phone:''
}

const mutations={
    updateOpenid(state,payload){
        state.openid=payload
        console.log(state)
    }
}   

const actions = {
    async login({commit},params){
        const res=await code2session(params)
        if(res.openid){
            commit('updateOpenid',res.openid)
        }
    },

    async fingerVerify({state: {openid}}, params){
        params.openid = openid;
        console.log(params)
        let data = await fingerVerify(params);
        console.log('data-----',data)
        
        return data && data.code;
    },

    async decryptPhone({commit},params){
        let result=await decryptPhone(params)
        console.log('result',result)
    }
}

export default {
    namespaced : true,
    state,
    mutations,
    actions
}