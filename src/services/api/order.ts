// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

interface OrderListItem {
  actualPay: number;
  courseId: string;
  courseName: string;
  coursePrice: number;
  createTime: string;
  nickName: string;
  orderId: string;
  payTime: string;
  status: string;
  userOpenid: string;
}

export async function getOrderList(options?: { [key: string]: any }) {
  return request('/api/order/list', {
    method: 'POST',
    data: { pageNum: 1, pageSize: 999 },
    ...(options || {}),
  });
}
export async function getOrderExcel(options?: { [key: string]: any }) {
  return request('/api/exportExcelForOrderList', {
    method: 'GET',
    responseType: 'blob',
    ...(options || {}),
  });
}

export async function getBackOrderList(options?: { [key: string]: any }) {
  return request('/api/order/back/list', {
    method: 'POST',
    data: { pageNum: 1, pageSize: 999 },
    ...(options || {}),
  });
}

export async function confirmBackOrder(orderId: string, options?: { [key: string]: any }) {
  return request(`/api/order/back/confirm/${orderId}`, {
    method: 'GET',
    ...(options || {}),
  });
}
