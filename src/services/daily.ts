import request from '@/utils/request';

export async function queryDaily(): Promise<any> {
  return request(`/api/daily/getAll`);
}

export async function updateDaily(params: any) {
  return request(`/api/daily/update`, {
    method: 'POST',
    data: params,
  });
}
