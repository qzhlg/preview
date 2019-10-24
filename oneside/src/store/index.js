import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import indexView from './modules/indexView'
import sign from './modules/sign'
Vue.use(Vuex)

const store = new Vuex.Store({
	modules:{
		user,
		indexView,
		sign
	},
	plugins:[]
})

export default store
