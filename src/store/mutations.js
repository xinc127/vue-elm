import { RECORD_ADDRESS } from './mutations-type.js'

export default {
  // 记录当前经纬度
  [RECORD_ADDRESS](state, { latitude, longitude }) {
    state.latitude = latitude
    state.longitude = longitude
  },
}
