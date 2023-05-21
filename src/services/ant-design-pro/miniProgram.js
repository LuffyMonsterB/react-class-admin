// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取小程序banner GET /api/user */
export async function getMiniProgramBannerList(options) {
  return request('/api/miniProgram/banner', {
    method: 'GET',
    ...(options || {}),
  });
}
