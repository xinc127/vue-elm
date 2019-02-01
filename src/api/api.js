import request from '@/utils/server'

/**
 * 获取地址
 */
export function getCities(type) {
  return request({
    url: '/v1/cities',
    params: {
      type
    }
  })
}

/**
 * 获取城市信息
 */
export function getCityInfo(id) {
  return request({
    url: `/v1/cities/${id}`
  })
}

/**
 * 搜索地址
 */
export function pois(city_id, keyword, type) {
  return request({
    url: `/v1/pois/`,
    params: {
      city_id,
      keyword,
      type
    }
  })
}

/**
 * 根据经纬度详细定位
 */
export function msiteAddress(geohash) {
  return request({
    url: `/v2/pois/${geohash}`
  })
}

/**
 * 食品分类列表
 */
export function msiteFoodType() {
  return request({
    url: '/v2/index_entry'
  })
}
