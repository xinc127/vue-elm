import { RECORD_ADDRESS, SAVE_GEOHASH } from './mutations-type.js'

export default {
  // 记录当前经纬度
  [RECORD_ADDRESS](state, { latitude, longitude }) {
    state.latitude = latitude
    state.longitude = longitude
  },
  // 保存geohash
  [SAVE_GEOHASH](state, geohash) {
    state.geohash = geohash
  }
}
