import StyleSpin from '@/components/StyleSpin';
import { getCourseList } from '@/services/api';
import { Col, message, Row } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { CourseDetail, LeftCourseList } from './components';

export default function CourseList() {
  const [loading, setLoading] = useState<Boolean>(true);
  const [courseList, setCourseList] = useState<API.CourseListItem[]>([]);
  const [showCourseId, setShowCourseId] = useState<string>('');
  const courseDetailRef = useRef(null);
  const handleCourseChange = (id: string) => {
    courseDetailRef.current && courseDetailRef.current.handleCourseChange(id);
  };
  useEffect(() => {
    getCourseList().then(async (res) => {
      if (res.code === '200') {
        const newCourseList = res.data.map((item) => {
          return {
            courseId: item.course.courseId,
            courseName: item.course.courseName,
            description: item.course.description,
            category: item.categoryList,
            views: item.course.views,
            comments: item.comments,
            coverUrl: item.coverUrl,
            status: item.course.status,
          };
        });

        setCourseList(newCourseList);
        setShowCourseId(res.data[0].course.courseId || '');
        setLoading(false);
      } else {
        message.error('获取课程列表失败，请重试！');
      }
    });
  }, []);
  return loading ? (
    <>
      <StyleSpin />
    </>
  ) : (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <LeftCourseList courseList={courseList} courseChange={handleCourseChange} />
        </Col>
        <Col span={12}>
          <CourseDetail courseId={showCourseId} ref={courseDetailRef} />
        </Col>
      </Row>
    </>
  );
}
