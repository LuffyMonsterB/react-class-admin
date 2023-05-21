import provice from '@/assets/city';
import fallbackImg from '@/assets/fallback.png';
import StyleSpin from '@/components/StyleSpin';
import {
  getCourseCategory,
  getCourseComments,
  getCourseCoverList,
  getCourseDescription,
  getCourseDetailPage,
  getCourseName,
  getCoursePrice,
  getCourseScheduleList,
  getTagList,
  updateCourseCategory,
  updateCourseComment,
  updateCourseCover,
  updateCourseDescription,
  updateCourseDetailPage,
  updateCourseName,
  updateCoursePrice,
  updateCourseSchedule,
} from '@/services/api';
import moment from '@/utils/chineseMoment';
import {
  CommentOutlined,
  CrownOutlined,
  RightOutlined,
  ScheduleOutlined,
  TagsOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { EditableProTable, ProCard, ProColumns } from '@ant-design/pro-components';
import {
  Button,
  Card,
  Carousel,
  Col,
  Comment,
  Divider,
  Image,
  List,
  message,
  Modal,
  Rate,
  Row,
  Select,
  Switch,
  Tag,
  Tooltip,
  Typography,
  Upload,
  UploadFile,
} from 'antd';
import ImgCrop from 'antd-img-crop';
import TextArea from 'antd/lib/input/TextArea';
import { RcFile, UploadProps } from 'antd/lib/upload';
import type { CustomTagProps } from 'rc-select/lib/BaseSelect';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
const { Title, Paragraph, Text } = Typography;

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

const UploadButton = (props: { onUpload: Function; bannerId: number }) => {
  const handleUpload = (file: UploadFile) => {
    props.onUpload(props.bannerId, file);
  };
  const uploadProps: UploadProps = {
    name: 'file',
    showUploadList: false,
    accept: '.jpg,.png,.jpeg',
    beforeUpload: (file) => {
      handleUpload(file);
      return false;
    },
  };
  return (
    <ImgCrop aspect={16 / 9} quality={1} modalWidth={600} modalTitle="课程封面裁剪">
      <Upload {...uploadProps}>
        <Button type="link" icon={<UploadOutlined />}>
          上传
        </Button>
      </Upload>
    </ImgCrop>
  );
};

const mockCommentData = [
  {
    author: '张三',
    status: '0',
    avatar:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F2850115011%2F1000.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1663055056&t=cb29c58fdbeb52db52ab658eae14815c',
    content: (
      <p>
        We supply a series of design principles, practical patterns and high quality design
        resources (Sketch and Axure), to help people create their product prototypes beautifully and
        efficiently.
      </p>
    ),
    actions: [<Rate disabled defaultValue={2} />],
    datetime: (
      <>
        <Tooltip title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}>
          <span>{moment().subtract(2, 'days').fromNow()}</span>
        </Tooltip>
        <Switch
          size="small"
          style={{ marginLeft: 4, marginBottom: 2 }}
          checkedChildren="显示"
          unCheckedChildren="隐藏"
          defaultChecked
        />
      </>
    ),
  },
  {
    author: '李四',
    status: '1',
    avatar:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F2850115011%2F1000.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1663055056&t=cb29c58fdbeb52db52ab658eae14815c',
    content: (
      <p>
        We supply a series of design principles, practical patterns and high quality design
        resources (Sketch and Axure), to help people create their product prototypes beautifully and
        efficiently.
      </p>
    ),
    actions: [<Rate disabled defaultValue={2} />],
    datetime: (
      <>
        <Tooltip title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}>
          <span>{moment().subtract(2, 'days').fromNow()}</span>
        </Tooltip>
        <Switch
          size="small"
          style={{ marginLeft: 4, marginBottom: 2 }}
          checkedChildren="显示"
          unCheckedChildren="隐藏"
          defaultChecked
        />
      </>
    ),
  },
  {
    author: '李四',
    status: '0',
    avatar:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F2850115011%2F1000.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1663055056&t=cb29c58fdbeb52db52ab658eae14815c',
    content: (
      <p>
        We supply a series of design principles, practical patterns and high quality design
        resources (Sketch and Axure), to help people create their product prototypes beautifully and
        efficiently.
      </p>
    ),
    actions: [<Rate disabled defaultValue={2} />],
    datetime: (
      <>
        <Tooltip title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}>
          <span>{moment().subtract(2, 'days').fromNow()}</span>
        </Tooltip>
        <Switch
          size="small"
          style={{ marginLeft: 4, marginBottom: 2 }}
          checkedChildren="显示"
          unCheckedChildren="隐藏"
          defaultChecked
        />
      </>
    ),
  },
  {
    author: '李四',
    status: '0',
    avatar:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F2850115011%2F1000.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1663055056&t=cb29c58fdbeb52db52ab658eae14815c',
    content: (
      <p>
        We supply a series of design principles, practical patterns and high quality design
        resources (Sketch and Axure), to help people create their product prototypes beautifully and
        efficiently.
      </p>
    ),
    actions: [<Rate disabled defaultValue={2} />],
    datetime: (
      <>
        <Tooltip title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}>
          <span>{moment().subtract(2, 'days').fromNow()}</span>
        </Tooltip>
        <Switch
          size="small"
          style={{ marginLeft: 4, marginBottom: 2 }}
          checkedChildren="显示"
          unCheckedChildren="隐藏"
          defaultChecked
        />
      </>
    ),
  },
  {
    author: '李四',
    status: '0',
    avatar:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F2850115011%2F1000.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1663055056&t=cb29c58fdbeb52db52ab658eae14815c',
    content: (
      <p>
        We supply a series of design principles, practical patterns and high quality design
        resources (Sketch and Axure), to help people create their product prototypes beautifully and
        efficiently.
      </p>
    ),
    actions: [<Rate disabled defaultValue={2} />],
    datetime: (
      <>
        <Tooltip title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}>
          <span>{moment().subtract(2, 'days').fromNow()}</span>
        </Tooltip>
        <Switch
          size="small"
          style={{ marginLeft: 4, marginBottom: 2 }}
          checkedChildren="显示"
          unCheckedChildren="隐藏"
          defaultChecked
        />
        ,
      </>
    ),
  },
];
const mockScheduleList: API.ScheduleListItem[] = [
  {
    schedule: 1,
    startTime: '2022-08-13 08:00:00',
    endTime: '2022-08-21 16:00:00',
    region: [],
    location: '',
    collectionLocation: '',
    status: '0',
    mode: '1',
    memberCount: 0,
  },
  {
    schedule: 2,
    startTime: '2022-08-13 08:00:00',
    endTime: '2022-08-21 16:00:00',
    memberCount: 30,
    region: [],
    location: '',
    collectionLocation: '',
    status: '1',
    mode: '1',
  },
  {
    schedule: 3,
    startTime: '2022-08-13 08:00',
    endTime: '2022-08-21 16:00',
    memberCount: 25,
    region: [],
    location: '',
    collectionLocation: '',
    status: '0',
    mode: '1',
  },
];
interface ScheduleListItem {
  schedule: number;
  startTime?: string;
  endTime?: string;
  memberCount: number;
}

const tagRender = (props: CustomTagProps) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={value}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}
    >
      {label}
    </Tag>
  );
};

export const CourseDetail = forwardRef((props: { courseId: string }, courseDetailRef) => {
  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [innerCourseId, setInnerCourseId] = useState<string>('');
  const [updateCoverModalVisible, setUpdateCoverModalVisible] = useState<boolean>(false);
  const [courseCoverList, setCourseCoverList] = useState<API.CoverListItem[]>([]);
  const [courseName, setCourseName] = useState<string>('');
  const [coursePrice, setCoursePrice] = useState<API.CoursePrice>();
  const [courseDescription, setCourseDescription] = useState<string>('');
  const [courseComments, setCourseComments] = useState<API.CourseCommentItem[]>([]);
  const [courseCategory, setCourseCategory] = useState<API.TagListItem[]>([]);
  const [courseScheduleList, setCourseScheduleList] = useState<API.ScheduleListItem[]>([]);
  const [tagOptions, setTagOptions] = useState<{ value: string; label: string }[]>([]);
  const [courseDetaiPage, setCourseDetailPage] = useState<string>('');
  useImperativeHandle(courseDetailRef, () => ({ handleCourseChange }));
  const handleCourseChange = (id: string) => {
    setLoading(true);
    setInnerCourseId(id);
    getCourseDetailInfo(id);
  };
  const getCourseDetailInfo = async (id: string) => {
    await getCourseCoverList(id).then((res) => {
      if (res.code === '200') {
        setCourseCoverList(
          res.data.map((item) => {
            item.imgUrl = `${item.imgUrl}?timestamp=${Date.now()}`;
            return item;
          }),
        );
      } else {
        message.error('获取课程封面失败，请重试！');
      }
    });
    await getCourseName(id).then((res) => {
      if (res.code === '200') {
        setCourseName(res.data);
      } else {
        message.error('获取课程名称失败，请重试！');
      }
    });
    await getCoursePrice(id).then((res) => {
      if (res.code === '200') {
        setCoursePrice({
          actualPrice: res.data.actualPrice,
          coursePrice: res.data.coursePrice,
        });
      } else {
        message.error('获取课程价格失败，请重试！');
      }
    });
    await getCourseDescription(id).then((res) => {
      if (res.code === '200') {
        setCourseDescription(res.data.description);
        // console.log(res);
      } else {
        message.error('获取课程描述失败，请重试！');
      }
    });
    await getTagList().then((res) => {
      if (res.code === '200') {
        const tagList = res.data;
        setTagOptions(
          tagList.map((tag) => {
            return {
              tag: tag,
              label: tag.tagName,
              value: tag.ofType === '1' ? homePageTagColorTransform[tag.color] : tag.color,
            };
          }),
        );
      } else {
        message.error('获取标签列表失败，请重试！');
      }
    });
    await getCourseCategory(id).then((res) => {
      if (res.code === '200') {
        setCourseCategory(res.data);
      } else {
        message.error('获取课程标签失败，请重试！');
      }
    });
    await getCourseScheduleList(id).then((res) => {
      if (res.code === '200') {
        setCourseScheduleList(res.data.courseScheduleList);
      } else {
        message.error('获取课程档期失败，请重试！');
      }
    });
    await getCourseComments(id).then((res) => {
      if (res.code === '200') {
        setCourseComments(res.data);
      } else {
        message.error('获取课程评论失败，请重试！');
      }
    });
    await getCourseDetailPage(id).then((res) => {
      if (res.code === '200') {
        setCourseDetailPage(`${res.data}?timestamp=${Date.now()}`);
      } else {
        message.error('获取课程详情页失败，请重试！');
      }
    });
    setLoading(false);
  };
  const handleCourseNameChange = (value: string) => {
    const hide = message.loading('正在更新');
    updateCourseName(innerCourseId, value).then((res) => {
      hide();
      if (res.code === '200') {
        setCourseName(value);
        message.success('更新成功');
      } else {
        message.error('更新失败，请重试！');
      }
    });
  };
  const handleCoursePriceChange = (type: string, value: string) => {
    const hide = message.loading('正在更新');
    const newCoursePrice: API.CoursePrice = {
      actualPrice: coursePrice?.actualPrice || '',
      coursePrice: coursePrice?.coursePrice || '',
    };
    if (type === 'actualPrice') {
      newCoursePrice.actualPrice = value;
      updateCoursePrice(innerCourseId, newCoursePrice).then((res) => {
        hide();
        if (res.code === '200') {
          setCoursePrice(newCoursePrice);
          message.success('更新成功');
        } else {
          message.error('更新失败，请重试！');
        }
      });
    } else {
      newCoursePrice.coursePrice = value;
      updateCoursePrice(innerCourseId, newCoursePrice).then((res) => {
        hide();
        if (res.code === '200') {
          setCoursePrice(newCoursePrice);
          message.success('更新成功');
        } else {
          message.error('更新失败，请重试！');
        }
      });
    }
  };
  const handleCourseDescriptionSave = () => {
    const hide = message.loading('正在更新');
    updateCourseDescription(innerCourseId, courseDescription).then((res) => {
      hide();
      if (res.code === '200') {
        setCourseDescription(courseDescription);
        message.success('更新成功');
      } else {
        message.error('更新失败，请重试！');
      }
    });
  };
  const handleCourseCategoryChange = (
    option: { label: string; tag?: API.TagListItem | undefined; value: string }[],
  ) => {
    const newCategory: API.TagListItem[] = option.map((item) => item.tag);
    const tagIds = newCategory.map((item) => Number(item?.tagId));
    updateCourseCategory(innerCourseId, tagIds).then((res) => {
      if (res.code === '200') {
        setCourseCategory(newCategory);
      } else {
        message.error('更新失败，请重试！');
      }
    });
  };
  const handleCourseScheduleSave = (data: API.ScheduleListItem) => {
    updateCourseSchedule(innerCourseId, data).then((res) => {
      const hide = message.loading('正在更新');
      updateCourseSchedule(innerCourseId, data).then((res) => {
        hide();
        if (res.code === '200') {
          message.success('更新成功');
        } else {
          message.error('更新失败，请重试！');
        }
      });
    });
  };
  const handleCourseDetailPageUpdate = (file: UploadFile) => {
    const formData = new FormData();
    const hide = message.loading('正在上传');
    formData.append('courseId', innerCourseId);
    formData.append('detailPage', file as RcFile);
    updateCourseDetailPage(formData).then((res) => {
      hide();
      if (res.code === '200') {
        message.success('更新课程详情页成功');
        setTimeout(() => {
          getCourseDetailPage(innerCourseId).then((res) => {
            if (res.code === '200') {
              setCourseDetailPage(`${res.data}?timestamp=${Date.now()}`);
            } else {
              message.error('获取课程详情页失败，请重试！');
            }
          });
        }, 500);
      } else {
        message.error('更新课程详情页失败，请重试！');
      }
    });
  };
  const handleCourseCoverUpload = (bannerId: number, file: UploadFile) => {
    const formData = new FormData();
    const hide = message.loading('正在上传');
    formData.append('courseId', innerCourseId);
    formData.append('bannerId', String(bannerId));
    formData.append('img', file as RcFile);
    updateCourseCover(formData).then((res) => {
      hide();
      if (res.code === '200') {
        message.success('上传成功');
        setTimeout(() => {
          getCourseCoverList(innerCourseId).then((res) => {
            if (res.code === '200') {
              setCourseCoverList(
                res.data.map((item) => {
                  item.imgUrl = `${item.imgUrl}?timestamp=${Date.now()}`;
                  return item;
                }),
              );
            } else {
              message.error('获取课程封面失败，请重试！');
            }
          });
        }, 500);
      } else {
        message.error('上传失败，请重试！');
      }
    });
  };
  const handleCourseCommentStatusChange = (commentId: number, status: boolean) => {
    updateCourseComment(innerCourseId, commentId, status ? '1' : '0').then((res) => {
      if (res.code === '200') {
        getCourseComments(innerCourseId).then((res) => {
          if (res.code === '200') {
            setCourseComments(res.data);
          } else {
            message.error('获取课程评论失败，请重试！');
          }
          message.success('更新评论状态成功');
        });
      } else {
        message.error('更新课程评论状态失败，请重试！');
      }
    });
  };
  useEffect(() => {
    // setScheduleList(mockScheduleList);
    getCourseDetailInfo(props.courseId);
    if (props.courseId) setInnerCourseId(props.courseId);
  }, []);
  const columns: ProColumns<API.ScheduleListItem>[] = [
    {
      title: '操作',
      valueType: 'option',
      width: 160,
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.schedule);
          }}
        >
          编辑
        </a>,
        // <a key="delete" onClick={() => {}}>
        //   关闭
        // </a>,
        <a key="export" onClick={() => {}}>
          导出名单
        </a>,
      ],
    },
    {
      title: '档期',
      dataIndex: 'schedule',
      readonly: true,
      width: 50,
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        '0': {
          text: '已结束',
          status: 'error',
        },
        '1': {
          text: '报名中',
          status: 'Processing',
        },
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
    },
    {
      title: '已报名人数',
      dataIndex: 'memberCount',
      readonly: true,
    },
    {
      title: '参营人数',
      dataIndex: 'maxMemberCount',
      readonly: true,
    },
    {
      title: '开始时间',
      dataIndex: 'startTime',
      valueType: 'dateTime',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      valueType: 'dateTime',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
    },
    {
      title: '模式',
      dataIndex: 'mode',
      valueEnum: {
        '1': {
          text: '线下',
          status: 'success',
        },
        '2': {
          text: '线上',
          status: 'warning',
        },
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
    },
    {
      title: '区域',
      dataIndex: 'region',
      valueType: 'cascader',
      fieldProps: {
        options: provice,
        expandTrigger: 'hover',
        // fieldNames: {
        //   children: 'language',
        //   label: 'field',
        // },
      },
    },
    {
      title: '具体地点',
      dataIndex: 'location',
    },
    {
      title: '集合地点',
      dataIndex: 'collectionLocation',
    },
  ];
  const columns2: ProColumns<ScheduleListItem>[] = [
    {
      title: '档期',
      dataIndex: 'schedule',
      readonly: true,
      width: '10%',
    },
    {
      title: '开始时间',
      dataIndex: 'startTime',
      valueType: 'dateTime',
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      valueType: 'dateTime',
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      valueType: 'dateTime',
    },
    {
      title: '报名人数',
      dataIndex: 'memberCount',
      readonly: true,
      width: '10%',
    },
    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.schedule);
          }}
        >
          编辑
        </a>,
        // <a key="delete" onClick={() => {}}>
        //   关闭
        // </a>,
        <a key="export" onClick={() => {}}>
          导出名单
        </a>,
      ],
    },
  ];

  return loading ? (
    <>
      <StyleSpin />
    </>
  ) : (
    <ProCard
      direction="column"
      hoverable
      bodyStyle={{ maxHeight: 1000, overflowY: 'scroll' }}
      style={{ cursor: 'default' }}
    >
      <Carousel effect="fade" style={{ cursor: 'pointer' }} autoplay>
        {courseCoverList.map((cover) => {
          return (
            <Image
              onClick={() => {
                setUpdateCoverModalVisible(true);
              }}
              key={cover.bannerId}
              width={'100%'}
              preview={false}
              src={cover.imgUrl}
              fallback={fallbackImg}
            />
          );
        })}
      </Carousel>
      <Modal
        visible={updateCoverModalVisible}
        title={'更新课程封面'}
        width={'70%'}
        footer={null}
        onCancel={() => {
          setUpdateCoverModalVisible(false);
        }}
      >
        <Row justify="center" align="middle" gutter={[16, 16]}>
          {courseCoverList.map((cover) => {
            return (
              <Col span={8} key={cover.bannerId}>
                <Card
                  hoverable
                  bodyStyle={{ padding: 0 }}
                  actions={[
                    <UploadButton bannerId={cover.bannerId} onUpload={handleCourseCoverUpload} />,
                  ]}
                >
                  <Image width={'100%'} src={cover.imgUrl} fallback={fallbackImg} />
                </Card>
              </Col>
            );
          })}
        </Row>
      </Modal>
      <Title
        level={3}
        style={{ marginTop: 0 }}
        editable={{
          onChange: (value) => {
            handleCourseNameChange(value);
          },
        }}
      >
        {courseName}
      </Title>

      <Title level={4} style={{ margin: 0 }}>
        <Text
          type="danger"
          editable={{ onChange: (value) => handleCoursePriceChange('actualPrice', value) }}
        >
          ￥{coursePrice?.actualPrice}
        </Text>
        <Text
          delete
          italic
          editable={{ onChange: (value) => handleCoursePriceChange('actualPrice', value) }}
        >
          ￥{coursePrice?.coursePrice}
        </Text>
      </Title>
      {/* <Paragraph editable={{ onChange: (value) => handleCourseDescriptionChange(value) }}>
        {courseDescription}
      </Paragraph> */}
      <TextArea
        bordered={false}
        autoSize={{ minRows: 3 }}
        value={courseDescription}
        onChange={(e) => setCourseDescription(e.target.value)}
        style={{ margin: 0 }}
      ></TextArea>
      <Button onClick={handleCourseDescriptionSave} style={{ marginBottom: 10 }}>
        保存课程描述
      </Button>
      <ProCard
        style={{ marginBottom: 10 }}
        title={
          <>
            <TagsOutlined style={{ marginRight: 4 }} />
            分类标签管理
          </>
        }
        headStyle={{ padding: 0 }}
        bodyStyle={{ padding: 0 }}
        headerBordered
      >
        <Select
          mode="multiple"
          size="large"
          showArrow
          bordered={false}
          tagRender={tagRender}
          value={courseCategory.map((item) =>
            item.ofType === '1' ? homePageTagColorTransform[item.color] : item.color,
          )}
          style={{ width: '100%' }}
          options={tagOptions}
          onChange={(value, option) => {
            handleCourseCategoryChange(option);
          }}
        />
      </ProCard>
      <ProCard
        title={
          <>
            <ScheduleOutlined style={{ marginRight: 4 }} />
            档期安排
          </>
        }
        headStyle={{ padding: 0 }}
        bodyStyle={{ paddingLeft: 0, paddingRight: 0 }}
        headerBordered
      >
        <EditableProTable<API.ScheduleListItem>
          rowKey="schedule"
          scroll={{
            x: 1500,
          }}
          recordCreatorProps={{
            position: 'bottom',
            record: (index, _) => {
              return {
                key: index,
                schedule: index + 1,
                region: [],
                location: '',
                collectionLocation: '',
                memberCount: 0,
              };
            },
          }}
          loading={false}
          value={courseScheduleList}
          columns={columns}
          editable={{
            type: 'multiple',
            editableKeys,
            onSave: async (rowKey, data, row) => {
              handleCourseScheduleSave(data);
            },
            onChange: setEditableRowKeys,
          }}
        />
      </ProCard>
      <ProCard
        title={
          <>
            <CommentOutlined style={{ marginRight: 4 }} />
            满意度及评论（29）
          </>
        }
        extra={
          <RightOutlined
            rotate={!collapsed ? 90 : undefined}
            onClick={() => {
              setCollapsed(!collapsed);
            }}
          />
        }
        headStyle={{ padding: 0 }}
        style={{ marginTop: 16 }}
        headerBordered
        collapsed={collapsed}
      >
        <List
          itemLayout="horizontal"
          dataSource={courseComments}
          renderItem={(item) => (
            <li>
              <Comment
                author={item.nickname}
                actions={[<Rate disabled defaultValue={Number(item.rate)} />]}
                avatar={item.avatarUrl}
                content={<p>{item.content}</p>}
                datetime={
                  <>
                    <Tooltip
                      title={moment(item.createTime)
                        .subtract(2, 'days')
                        .format('YYYY-MM-DD HH:mm:ss')}
                    >
                      <span>{moment(item.createTime).subtract(2, 'days').fromNow()}</span>
                    </Tooltip>
                    <Switch
                      size="small"
                      style={{ marginLeft: 4, marginBottom: 2 }}
                      checkedChildren="显示"
                      unCheckedChildren="隐藏"
                      checked={item.status === '1'}
                      onChange={(e) => {
                        handleCourseCommentStatusChange(item.id, e);
                      }}
                    />
                  </>
                }
              />

              <Divider style={{ margin: 0 }}></Divider>
            </li>
          )}
        />
      </ProCard>
      <ProCard
        title={
          <>
            <CrownOutlined style={{ marginRight: 4 }} />
            课程详情
            <Upload
              showUploadList={false}
              accept=".jpg,.png,.jpeg"
              beforeUpload={(file: UploadFile) => {
                handleCourseDetailPageUpdate(file);
                return false;
              }}
            >
              <Button size="small" type="primary" style={{ marginLeft: 4, marginBottom: 4 }}>
                更新
              </Button>
            </Upload>
          </>
        }
        headStyle={{ padding: 0 }}
        headerBordered
      >
        <Image preview={false} width={'100%'} src={courseDetaiPage}></Image>
      </ProCard>
    </ProCard>
  );
});
