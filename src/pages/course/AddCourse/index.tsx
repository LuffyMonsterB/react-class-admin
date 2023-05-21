import provice from '@/assets/city';
import { createCourse, getTagList, uploadCoverList, uploadDetailPages } from '@/services/api';
import { PlusOutlined } from '@ant-design/icons';
import {
  EditableProTable,
  ProCard,
  ProColumns,
  ProForm,
  ProFormDigit,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
  ProFormUploadDragger,
  StepsForm,
} from '@ant-design/pro-components';
import { message, Modal, Upload, UploadFile, UploadProps } from 'antd';
import ImgCrop from 'antd-img-crop';
import { RcFile } from 'antd/lib/upload';
import { useEffect, useState } from 'react';
import { history } from 'umi';
import TagRender from './components/TagRender';

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const UploadButton = (
  <div>
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>上传</div>
  </div>
);

interface CourseForm {
  courseName: string;
  category: Array<number>;
  description: string;
  coursePrice: number;
  actualPrice: number;
  status: string;
  scheduleList: API.ScheduleListItem[];
}

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

export default function AddCourse() {
  const [courseBannerTitle, setCourseBannerTitle] = useState('课程封面 0/6');
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [statusSwitch, setStatusSwitch] = useState<Boolean>(false);

  const [tagOptions, setTagOptions] = useState<{ value: string; label: string }[]>([]);

  const [courseForm, setCourseForm] = useState<CourseForm>({
    courseName: '',
    category: [],
    description: '',
    coursePrice: 0,
    actualPrice: 0,
    status: '0',
    scheduleList: [],
  });
  const [scheduleList, setScheduleList] = useState<API.ScheduleListItem[]>([]);
  const [coverList, setCoverList] = useState<UploadFile[]>([]);
  const [detailImg, setDetailImg] = useState<UploadFile>();

  const init = () => {
    getTagList().then((res) => {
      if (res.code === '200') {
        const tagList = res.data;
        setTagOptions(
          tagList.map((tag) => {
            return {
              value: String(tag.tagId),
              label:
                tag.tagName +
                ',' +
                (tag.ofType === '1' ? homePageTagColorTransform[tag.color] : tag.color),
            };
          }),
        );
      } else {
        message.error('获取标签列表失败，请重试！');
      }
    });
  };
  useEffect(() => {
    setCourseBannerTitle(`课程封面 ${coverList.length}/6`);
  }, [coverList]);
  useEffect(() => {
    init();
  }, []);

  const handleChange: UploadProps['onChange'] = ({ fileList: newCoverList }) => {
    setCoverList(newCoverList);
  };
  const handleCancel = () => setPreviewVisible(false);
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };
  const columns: ProColumns<API.ScheduleListItem>[] = [
    {
      title: '操作',
      valueType: 'option',
      width: 150,
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.schedule);
          }}
        >
          编辑
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

  return (
    <>
      <StepsForm
        onFinish={async (values) => {}}
        formProps={{
          validateMessages: {
            required: '此项为必填项',
          },
        }}
      >
        <StepsForm.StepForm
          name="base"
          title="第一步骤"
          onFinish={async (values: CourseForm) => {
            if (coverList.length === 0) {
              message.warning('请添加至少一张封面');
              return false;
            }
            const newCourseForm: CourseForm = {
              courseName: values.courseName,
              category: values.category.map((item) => Number(item)),
              description: values.description,
              coursePrice: values.coursePrice,
              actualPrice: values.actualPrice,
              status: values.status ? '1' : '0',
              scheduleList: [],
              // region: values.region ? values.region.join() : '',
              // location: values.location || '',
            };
            setCourseForm(newCourseForm);
            return true;
          }}
        >
          <ProCard
            title={courseBannerTitle}
            bordered
            headerBordered
            collapsible
            style={{
              marginBottom: 16,
              minWidth: 900,
              maxWidth: '100%',
            }}
          >
            <ImgCrop aspect={16 / 9} quality={1} modalWidth={600} modalTitle="课程封面裁剪">
              <Upload
                listType="picture-card"
                fileList={coverList}
                onChange={handleChange}
                onPreview={handlePreview}
                // beforeUpload={(file) => {
                //   return false;
                // }}
              >
                {coverList.length < 6 && UploadButton}
              </Upload>
            </ImgCrop>
            <Modal
              visible={previewVisible}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
            >
              <img
                alt="example"
                style={{
                  width: '100%',
                }}
                src={previewImage}
              />
            </Modal>
          </ProCard>

          <ProCard
            title="课程信息"
            bordered
            headerBordered
            collapsible
            style={{
              minWidth: 900,
              marginBottom: 16,
              maxWidth: '100%',
            }}
          >
            <ProFormText
              name="courseName"
              label="课程名称"
              placeholder="请输入课程名称"
              width="xl"
              rules={[{ required: true }]}
            />
            <ProFormTextArea
              name="description"
              label="课程简要描述"
              tooltip="具体课程页面和课程卡片上都会展示"
              placeholder="请输入课程简要描述"
              width="xl"
              fieldProps={{ showCount: true, maxLength: 100 }}
              rules={[{ required: true }]}
            />
            <ProForm.Group>
              <ProFormSelect
                name="category"
                label="课程分类"
                width="xl"
                rules={[{ required: true }]}
                fieldProps={{
                  mode: 'multiple',
                  placeholder: '请选择课程类别',
                  bordered: false,
                  showArrow: true,
                  tagRender: TagRender,
                  optionItemRender(item) {
                    return item.label.split(',')[0];
                  },
                  options: tagOptions,
                }}
              />
            </ProForm.Group>

            <ProForm.Group>
              <ProFormDigit
                label="课程价格(元)"
                name="coursePrice"
                width="sm"
                min={0}
                fieldProps={{ prefix: '￥' }}
                rules={[{ required: true }]}
              />
              <ProFormDigit
                label="实际价格(元)"
                name="actualPrice"
                width="sm"
                min={0}
                fieldProps={{ prefix: '￥' }}
              />
            </ProForm.Group>
            <ProForm.Group>
              <ProFormSwitch
                name="status"
                label="课程状态"
                initialValue={statusSwitch}
                checkedChildren="上架"
                unCheckedChildren="未上架"
                fieldProps={{
                  onChange: setStatusSwitch,
                }}
              />
              {/* {modeSwitch ? (
                <ProForm.Group>
                  <ProFormCascader
                    name="region"
                    label="区域"
                    width="sm"
                    fieldProps={{
                      options: provice,
                      expandTrigger: 'hover',
                    }}
                    rules={[{ required: true }]}
                  />
                  <ProFormText
                    name="location"
                    label="具体地点"
                    placeholder="请输入具体地点"
                    width="sm"
                    rules={[{ required: true }]}
                  />
                </ProForm.Group>
              ) : (
                <></>
              )} */}
            </ProForm.Group>
          </ProCard>
        </StepsForm.StepForm>
        <StepsForm.StepForm
          name="checkbox"
          title="第二步骤"
          onFinish={async () => {
            const newCourseForm = courseForm;
            // const newScheduleList=scheduleList
            // newScheduleList.forEach(item=>{
            //   if(item.region)item.region
            // })
            newCourseForm.scheduleList = scheduleList.map((item) => {
              return {
                schedule: item.schedule,
                startTime: item.startTime,
                endTime: item.endTime,
                mode: item.mode,
                location: item.location,
                collectionLocation: item.collectionLocation,
                region: item.region,
                memberCount: 0,
                status: '0',
              };
            });
            setCourseForm(newCourseForm);
            return true;
          }}
        >
          <ProCard
            style={{
              maxWidth: 1200,
              marginBottom: 16,
              // maxWidth: '100%',
            }}
          >
            <EditableProTable<API.ScheduleListItem>
              rowKey="schedule"
              headerTitle="添加档期"
              scroll={{
                x: 1500,
              }}
              recordCreatorProps={{
                position: 'bottom',
                record: (index) => ({
                  schedule: index + 1,
                  region: [],
                  location: '',
                  collectionLocation: '',
                }),
              }}
              loading={false}
              columns={columns}
              onChange={setScheduleList}
              editable={{
                type: 'multiple',
                editableKeys,
                // onSave: async (rowKey, data, row) => {
                //   console.log(rowKey, data, row);
                //   await waitTime(2000);
                // },
                onChange: setEditableRowKeys,
              }}
            />
          </ProCard>
        </StepsForm.StepForm>
        <StepsForm.StepForm
          name="time"
          title="第三步骤"
          onFinish={async () => {
            if (!detailImg) {
              message.warning('请添加课程详情页');
              return false;
            }
            const hide = message.loading('正在创建课程');
            const courseId = await createCourse(courseForm).then((res) => {
              if (res.code === '200') {
                return res.data.courseId;
              } else {
                hide();
                message.error('创建失败，请重试！');
                return null;
              }
            });
            if (courseId) {
              const coverListFormData = new FormData();
              coverList.forEach((file) => {
                coverListFormData.append('coverList', file.originFileObj as RcFile);
              });
              coverListFormData.append('courseId', courseId);
              const uploadCoverListFlag = await uploadCoverList(coverListFormData).then((res) => {
                if (res.code === '200') {
                  return true;
                } else {
                  hide();
                  message.error('创建失败，请重试！');
                  return false;
                }
              });
              if (uploadCoverListFlag) {
                const detailFormData = new FormData();
                detailFormData.append('detailPage', detailImg as RcFile);
                detailFormData.append('courseId', courseId);
                await uploadDetailPages(detailFormData).then((res) => {
                  if (res.code === '200') {
                    hide();
                    message.success('创建成功');
                    setTimeout(() => {
                      history.push('/course/courseList');
                    }, 500);
                    return true;
                  } else {
                    hide();
                    message.error('创建失败，请重试！');
                    return false;
                  }
                });
              }
            } else {
              hide();
              message.error('创建失败，请重试！');
            }
          }}
        >
          <ProCard
            style={{
              marginBottom: 16,
              minWidth: 900,
              maxWidth: '100%',
            }}
          >
            <ProFormUploadDragger
              fieldProps={{
                maxCount: 1,
                multiple: false,
                accept: '.jpg,.png,.jpeg',
                beforeUpload: (file) => {
                  setDetailImg(file);
                  return false;
                },
              }}
              label="课程详情页"
              tooltip="只接收图片格式"
              name="dragger"
              description="仅支持上传jpg,png,jpeg图片，尺寸为xxx"
            />
          </ProCard>
        </StepsForm.StepForm>
      </StepsForm>
    </>
  );
}
