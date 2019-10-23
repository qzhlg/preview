import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import indexView from './modules/indexView'
Vue.use(Vuex)

const store = new Vuex.Store({
	modules:{
		user,
		indexView
	},
	plugins:[]
})

export default store
