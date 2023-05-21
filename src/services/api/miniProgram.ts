// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

interface AnnounceListItem {
  id: number;
  title?: string;
  content?: string;
  createTime?: string;
  status?: string;
}
interface GetAnnounceListResponse {
  code: string;
  message: string;
  data: AnnounceListItem[];
}

export async function getBannerList(options?: { [key: string]: any }) {
  return request('/api/app/getHomepage', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function uploadBanner(formData: FormData, options?: { [key: string]: any }) {
  return request('/api/app/uploadHomepage', {
    method: 'POST',
    requestType: 'form',
    data: formData,
    ...(options || {}),
  });
}

export async function getMiniProgramMsg(options?: { [key: string]: any }) {
  return request('/api/app/getAppmsg', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function updateMiniProgramPhoneMsg(
  phoneMsg: string,
  options?: { [key: string]: any },
) {
  return request('/api/app/updateAppmsg', {
    method: 'POST',
    data: {
      connectPhone: phoneMsg,
    },
    ...(options || {}),
  });
}

export async function updateMiniProgramAboutMsg(
  aboutMsg: string,
  options?: { [key: string]: any },
) {
  return request('/api/app/updateAppmsg', {
    method: 'POST',
    data: {
      about: aboutMsg,
    },
    ...(options || {}),
  });
}

export async function addAnnounce(
  announce: { createTime: string; title: string; content: string; status: string },
  options?: { [key: string]: any },
) {
  return request('/api/app/addAnnounce', {
    method: 'POST',
    data: {
      createTime: announce.createTime,
      title: announce.title,
      content: announce.content,
      status: announce.status,
    },
    ...(options || {}),
  });
}

export async function getAnnounceList(options?: {
  [key: string]: any;
}): Promise<GetAnnounceListResponse> {
  return request('/api/course/getAnnounceList', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function updateAnnounce(
  announce: AnnounceListItem,
  options?: {
    [key: string]: any;
  },
) {
  return request('/api/app/updateAnnounce', {
    method: 'POST',
    data: {
      ...announce,
    },
    ...(options || {}),
  });
}

export async function deleteAnnounce(
  id: number,
  options?: {
    [key: string]: any;
  },
) {
  return request('/api/app/deleteAnnounce', {
    method: 'POST',
    params: {
      id,
    },
    ...(options || {}),
  });
}

export async function getVideo(options?: { [key: string]: any }) {
  return request('/api/app/getAppVideo', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function getVideoCover(options?: { [key: string]: any }) {
  return request('/api/app/getAppVideoCover', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function uploadVideoCover(formData: FormData, options?: { [key: string]: any }) {
  return request('/api/app/uploadVideoCover', {
    method: 'POST',
    requestType: 'form',
    data: formData,
    ...(options || {}),
  });
}

export async function uploadVideo(formData: FormData, options?: { [key: string]: any }) {
  return request('/api/app/uploadAppVideo', {
    method: 'POST',
    requestType: 'form',
    data: formData,
    ...(options || {}),
  });
}
