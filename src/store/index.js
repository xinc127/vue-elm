import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getter'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  latitude: '', // 当前位置的纬度
  longitude: '', // 当前位置的经度
  geohash: '' // 当前地址geohash值
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
