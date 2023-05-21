import fallbackImg from '@/assets/fallback.png';
import { updateCourseStatus } from '@/services/api';
import { EyeOutlined, MessageOutlined } from '@ant-design/icons';
import { Image, List, message, Radio, Tag, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
const { Paragraph } = Typography;
const IconText = ({ icon, text }: { icon: any; text: string }) => (
  <span>
    {React.createElement(icon, { style: { marginRight: 4 } })}
    {text}
  </span>
);
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
interface TagListItem {
  tagId: number;
  color: string;
  tagName: string;
}
export default function CourseItem(props: { item: API.CourseListItem; itemClicked: Function }) {
  const [courseId, setCourseId] = useState<string>('');
  const [name, setName] = useState<string>();
  const [firstCoverUrl, setFirstCoverUrl] = useState<string>();
  const [tagList, setTagList] = useState<TagListItem[]>([]);
  const [description, setDescription] = useState<string>();
  const [status, setStatus] = useState<string>();
  const [views, setViews] = useState<number>();
  const [comments, setComments] = useState<number>();

  const handleCourseStatusChange = (value: string) => {
    updateCourseStatus(courseId, value).then((res) => {
      if (res.code === '200') {
        message.success('更新课程状态成功');
        setStatus(value);
      } else {
        message.error('更新课程状态失败，请重试！');
      }
    });
  };

  useEffect(() => {
    const item = props.item;
    setCourseId(item.courseId);
    setName(item.courseName);
    setFirstCoverUrl(item.coverUrl);
    setTagList(
      item.category.map((tag) => {
        return {
          tagId: tag.tagId,
          color: tag.ofType === '1' ? homePageTagColorTransform[tag.color] : tag.color,
          tagName: tag.tagName,
        };
      }),
    );
    setDescription(item.description);
    setStatus(item.status);
    setViews(item.views);
    setComments(item.comments);
  }, [props.item]);
  return (
    <>
      <List.Item
        actions={[
          <IconText icon={EyeOutlined} text={String(views)} key="list-vertical-star-o" />,
          <IconText icon={MessageOutlined} text={String(comments)} key="list-vertical-message" />,
        ]}
        extra={
          <Image
            preview={false}
            width={240}
            src={firstCoverUrl + '?timestamp=' + Date.now()}
            fallback={fallbackImg}
          />
        }
      >
        <List.Item.Meta
          title={
            <>
              <a
                href="#"
                style={{ fontWeight: 'bold' }}
                onClick={() => {
                  props.itemClicked(courseId);
                }}
              >
                {name}
              </a>
              <Radio.Group
                style={{ marginLeft: 4 }}
                value={status}
                onChange={(e) => {
                  handleCourseStatusChange(e.target.value);
                }}
              >
                <Radio value={'0'}>未上架</Radio>
                <Radio value={'1'}>上架</Radio>
                <Radio value={'2'}>下架</Radio>
              </Radio.Group>
            </>
          }
          description={
            <>
              {tagList.map((tag) => (
                <Tag key={tag.tagId} color={tag.color} style={{ marginRight: 3 }}>
                  {tag.tagName}
                </Tag>
              ))}
            </>
          }
        />

        <Paragraph ellipsis={{ rows: 2, expandable: false }}>{description}</Paragraph>
      </List.Item>
    </>
  );
}
