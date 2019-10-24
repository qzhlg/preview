import {
    addSign
} from '../../service/index'
const state = {
    list:[],
    current: {
        company: '',
        phone: '17698781428',
        address: '',
        description: ''
    }
}
const mutations = {
    updateState(state, payload) {
        console.log(state)
        state.current = {
            ...state.current,
            ...payload
        }
    }
}
const actions = {
    async submit(state, {...payload}) {
        return new Promise(async (resolve, reject) => {
            // 填充经纬度
            console.log( payload.address.location.lat)
            payload.latitude = payload.address.location.lat;
            payload.longitude = payload.address.location.lng;
            // 序列号地址
            payload.address = JSON.stringify(payload.address);
            let result = await addSign(payload);
            console.log(result)
            resolve(result);
        })
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}