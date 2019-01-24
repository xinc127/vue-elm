import request from '@/utils/server'

/**
 * 获取地址
 */
export function getCities(type) {
  return request({
    url: '/v1/cities',
    params: {
      type,
    },
  })
}
