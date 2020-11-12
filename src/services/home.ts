import request from '@/utils/request';

export async function queryRecommand() {
  return request('/api/getRecommend')
}