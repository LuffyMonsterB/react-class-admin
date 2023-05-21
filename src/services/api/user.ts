// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

interface UserListItem {
  userName: string;
  userId: string;
  roleType: string;
  password: string;
  status: string;
}

/** 获取管理系统用户列表 GET /api/user */
export async function getUserList(options?: { [key: string]: any }) {
  return request('/api/admin/getUserList', {
    method: 'POST',
    data: { pageNum: 1, pageSize: 999 },
    ...(options || {}),
  });
}

export async function deleteUser(userId: string, options?: { [key: string]: any }) {
  return request(`/api/admin/deleteUser/${userId}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** 创建管理系统用户 POST /api/user */
export async function createUser(userForm: UserListItem, options?: { [key: string]: any }) {
  return request('/api/admin/addUser', {
    method: 'POST',
    data: { ...userForm },
    ...(options || {}),
  });
}

export async function updateUser(userForm: UserListItem, options?: { [key: string]: any }) {
  return request(`/api/admin/updateUser`, {
    method: 'POST',
    data: { ...userForm },
    ...(options || {}),
  });
}
