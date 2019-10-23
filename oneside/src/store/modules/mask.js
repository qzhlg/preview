import {addSign} from '../../service'

const state={
    
}

const mutations={

}

const actions={
    async addSign({commit},params){
        const result=await addSign(params)
        console.log(result)
    }
}
export default {
    namespaced:true,
    state,
    mutations,
    actions
}