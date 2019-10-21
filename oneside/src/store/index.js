import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
console.log(user)
Vue.use(Vuex)

const store = new Vuex.Store({
	modules:{
		user
	},
	plugins:[]
})

export default store
