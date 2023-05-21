import { ProCard } from '@ant-design/pro-components';
import { List, Typography } from 'antd';
import React from 'react';
import CourseItem from './CourseItem';
const { Paragraph } = Typography;
const homePageTagColorTransform = {
  red: '#ff4d4f',
  volcano: '#ff7a45',
  orange: '#ffa940',
  gold: '#ffc53d',
  yellow: '#ffec3d',
  lime: '#a0d911',
  green: '#73d13d',
  cyan: '#36cfc9',
  blue: '#40a9ff',
  geekblue: '#597ef7',
  purple: '#9254de',
  magenta: '#f759ab',
};
const IconText = ({ icon, text }: { icon: any; text: string }) => (
  <span>
    {React.createElement(icon, { style: { marginRight: 4 } })}
    {text}
  </span>
);

export const LeftCourseList = (props: {
  courseList: API.CourseListItem[];
  courseChange: Function;
}) => {
  const courseList = props.courseList;
  const handleCourseItemClicked = (courseId: string) => {
    props.courseChange(courseId);
    console.log('handleCourseItemClicked', courseId);
  };
  return (
    <ProCard>
      <List
        itemLayout="vertical"
        // size="large"
        split
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 8,
        }}
        dataSource={courseList}
        renderItem={(item) => (
          <CourseItem
            item={item}
            itemClicked={handleCourseItemClicked}
            key={item.courseId}
          ></CourseItem>
        )}
      />
    </ProCard>
  );
};
