// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

interface GetTagListResponse {
  code: string;
  data: API.TagListItem[];
  message: string;
}

interface GetCourseListResponse {
  code: string;
  data: {
    categoryList: API.TagListItem[];
    comments: number;
    coverUrl: string;
    course: {
      courseId: string;
      courseName: string;
      description: string;
      status: string;
      views: number;
    };
  }[];
  message: string;
}
interface GetCoursePriceResponse {
  code: string;
  data: {
    actualPrice: string;
    coursePrice: string;
  };
  message: string;
}
interface GetCourseCoverListResponse {
  code: string;
  data: API.CoverListItem[];
  message: string;
}

interface GetCourseScheduleListResponse {
  code: string;
  data: { courseScheduleList: API.ScheduleListItem[] };
  message: string;
}

interface GetCourseCommentsResponse {
  code: string;
  data: API.CourseCommentItem[];
  message: string;
}
export async function getCourseList(options?: {
  [key: string]: any;
}): Promise<GetCourseListResponse> {
  return request('/api/course/getCourseList', {
    method: 'POST',
    data: {
      pageNum: 1,
      pageSize: 12,
    },
    ...(options || {}),
  });
}

export async function createCourse(courseForm: API.CourseForm, options?: { [key: string]: any }) {
  const newScheduleList = await courseForm.scheduleList.map((item) => {
    return {
      ...item,
      region: item.region.join(','),
    };
  });
  const newCourseForm = {
    ...courseForm,
    scheduleList: newScheduleList,
  };
  return request('/api/course/createCourse', {
    method: 'POST',
    data: { ...newCourseForm },
    ...(options || {}),
  });
}
export async function uploadCoverList(formData: FormData, options?: { [key: string]: any }) {
  return request('/api/course/uploadCoverlist', {
    method: 'POST',
    requestType: 'form',
    data: formData,
    ...(options || {}),
  });
}

export async function uploadDetailPages(formData: FormData, options?: { [key: string]: any }) {
  return request('/api/course/uploadCourseDetailPage', {
    method: 'POST',
    requestType: 'form',
    data: formData,
    ...(options || {}),
  });
}

export async function getTagList(options?: { [key: string]: any }): Promise<GetTagListResponse> {
  return request('/api/course/getTagList', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function addTag(
  tag: { tagName: string; color: string; ofType: string },
  options?: { [key: string]: any },
) {
  return request('/api/course/createTag', {
    method: 'POST',
    params: {
      ...tag,
    },
    ...(options || {}),
  });
}

export async function updateTag(
  tag: { tagId: number; tagName: string; color: string; ofType: string },
  options?: { [key: string]: any },
) {
  return request('/api/course/updateTag', {
    method: 'POST',
    params: {
      ...tag,
    },
    ...(options || {}),
  });
}

export async function deleteTag(tagId: number, options?: { [key: string]: any }) {
  return request('/api/course/deleteTag', {
    method: 'POST',
    params: {
      tagId,
    },
    ...(options || {}),
  });
}

export async function getCoursePrice(
  courseId: string,
  options?: {
    [key: string]: any;
  },
): Promise<GetCoursePriceResponse> {
  return request('/api/course/getCoursePrice', {
    method: 'GET',
    params: {
      courseId,
    },
    ...(options || {}),
  });
}

export async function updateCoursePrice(
  courseId: string,
  coursePrice?: API.CoursePrice,
  options?: {
    [key: string]: any;
  },
): Promise<GetCoursePriceResponse> {
  return request('/api/course/updateCoursePrice', {
    method: 'POST',
    data: {
      courseId,
      ...coursePrice,
    },
    ...(options || {}),
  });
}

export async function getCourseDescription(
  courseId: string,
  options?: {
    [key: string]: any;
  },
) {
  return request('/api/course/getCourseDescriptionById', {
    method: 'GET',
    params: {
      courseId,
    },
    ...(options || {}),
  });
}

export async function updateCourseDescription(
  courseId: string,
  description: string,
  options?: {
    [key: string]: any;
  },
) {
  return request('/api/course/updateCoursePrice', {
    method: 'POST',
    data: {
      courseId,
      description,
    },
    ...(options || {}),
  });
}

export async function getCourseCategory(
  courseId: string,
  options?: {
    [key: string]: any;
  },
): Promise<GetTagListResponse> {
  return request('/api/course/getCourseCategoryById', {
    method: 'GET',
    params: {
      courseId,
    },
    ...(options || {}),
  });
}

export async function updateCourseCategory(
  courseId: string,
  category: Array<number>,
  options?: {
    [key: string]: any;
  },
) {
  return request('/api/course/updateCategoryById', {
    method: 'POST',
    data: {
      courseId,
      category,
    },
    ...(options || {}),
  });
}

export async function getCourseName(
  courseId: string,
  options?: {
    [key: string]: any;
  },
) {
  return request('/api/course/getCourseName', {
    method: 'GET',
    params: {
      courseId,
    },
    ...(options || {}),
  });
}

export async function updateCourseName(
  courseId: string,
  courseName: string,
  options?: {
    [key: string]: any;
  },
) {
  return request('/api/course/updateCourseName', {
    method: 'POST',
    params: {
      courseId,
      courseName,
    },
    ...(options || {}),
  });
}

export async function getCourseCoverList(
  courseId: string,
  options?: { [key: string]: any },
): Promise<GetCourseCoverListResponse> {
  return request('/api/course/getCoverListByCourseId', {
    method: 'GET',
    params: {
      courseId,
    },
    ...(options || {}),
  });
}

export async function updateCourseCover(formData: FormData, options?: { [key: string]: any }) {
  return request('/api/course/updateCoverlist', {
    method: 'POST',
    requestType: 'form',
    data: formData,
    ...(options || {}),
  });
}

export async function getCourseScheduleList(
  courseId: string,
  options?: { [key: string]: any },
): Promise<GetCourseScheduleListResponse> {
  return request('/api/course/getSchedule', {
    method: 'GET',
    params: {
      courseId,
    },
    ...(options || {}),
  });
}

export async function updateCourseSchedule(
  courseId: string,
  scheduleItem: API.ScheduleListItem,
  options?: { [key: string]: any },
) {
  const newScheduleItem = {
    schedule: Number(scheduleItem.schedule),
    status: scheduleItem.status,
    startTime: scheduleItem.startTime,
    endTime: scheduleItem.endTime,
    mode: scheduleItem.mode,
    region: scheduleItem.region.join(','),
    location: scheduleItem.location,
    collectionLocation: scheduleItem.collectionLocation,
  };
  return request('/api/course/updateSchedule', {
    method: 'POST',
    data: {
      courseId,
      ...newScheduleItem,
    },
    ...(options || {}),
  });
}

export async function getCourseDetailPage(courseId: string, options?: { [key: string]: any }) {
  return request('/api/course/getDetaiPageByCourseId', {
    method: 'GET',
    params: {
      courseId,
    },
    ...(options || {}),
  });
}

export async function updateCourseDetailPage(formData: FormData, options?: { [key: string]: any }) {
  return request('/api/course/uploadCourseDetailPage', {
    method: 'POST',
    requestType: 'form',
    data: formData,
    ...(options || {}),
  });
}

export async function getCourseComments(
  courseId: string,
  options?: { [key: string]: any },
): Promise<GetCourseCommentsResponse> {
  return request('/api/course/getCommentsByCourseId', {
    method: 'GET',
    params: {
      courseId,
    },
    ...(options || {}),
  });
}

export async function updateCourseComment(
  courseId: string,
  commentId: number,
  status: string,
  options?: { [key: string]: any },
) {
  return request('/api/course/updateCommentsByCourseId', {
    method: 'POST',
    params: {
      courseId,
      commentId,
      status,
    },
    ...(options || {}),
  });
}

export async function updateCourseStatus(
  courseId: string,
  status: string,
  options?: { [key: string]: any },
) {
  return request('/api/course/updateCourseStatus', {
    method: 'POST',
    params: {
      courseId,
      status,
    },
    ...(options || {}),
  });
}
