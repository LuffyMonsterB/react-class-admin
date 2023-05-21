import { addTag, deleteTag, getTagList, updateTag } from '@/services/api';
import { AppstoreOutlined, HomeOutlined } from '@ant-design/icons';
import { EditableProTable, ProCard, ProColumns } from '@ant-design/pro-components';
import { message, Tag } from 'antd';
import { useEffect, useState } from 'react';

interface HomePageTagListItem {
  id: number;
  label?: string;
  color?: string;
  type?: string;
}

interface CategoryTagListItem {
  id: number;
  label?: string;
  color?: string;
  type?: string;
}

const mockHomePageTagList: HomePageTagListItem[] = [
  { id: 1, label: '热门', color: 'red' },
  { id: 2, label: '优惠', color: 'orange' },
];
const mockCategoryTagList: CategoryTagListItem[] = [
  { id: 1, color: 'geekblue', label: '夏日挑战' },
  { id: 2, color: 'lime', label: '博物通识' },
  { id: 3, color: 'green', label: '户外挑战' },
  { id: 4, color: 'cyan', label: '夏/冬令营' },
  { id: 5, color: 'volcano', label: '夏/冬校' },
  { id: 6, color: 'blue', label: '体验课程' },
  { id: 7, color: 'gold', label: '亲子课程' },
  { id: 8, color: 'yellow', label: '英式课堂' },
  { id: 9, color: 'orange', label: '昆虫主题' },
];

export default function CourseTag() {
  const [homePageTagList, setHomePageTagList] = useState<HomePageTagListItem[]>([]);
  const [categoryTagList, setCategoryTagList] = useState<CategoryTagListItem[]>([]);
  const [homePageTagEditableKeys, setHomePageTagEditableRowKeys] = useState<React.Key[]>([]);
  const [categoryTagEditableKeys, setCategoryTagEditableRowKeys] = useState<React.Key[]>([]);

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

  const colorOptions = {
    red: { text: '薄暮' },
    volcano: { text: '火山' },
    orange: { text: '日暮' },
    gold: { text: '金盏花' },
    yellow: { text: '日出' },
    lime: { text: '青柠' },
    green: { text: '极光绿' },
    cyan: { text: '明青' },
    blue: { text: '拂晓蓝' },
    geekblue: { text: '极客蓝' },
    purple: { text: '酱紫' },
    magenta: { text: '法式洋红' },
  };

  const homePageTagListColumns: ProColumns<HomePageTagListItem>[] = [
    {
      title: '标签',
      dataIndex: 'label',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
      render: (_, { label, color }) => {
        return (
          <Tag
            color={homePageTagColorTransform[color || 'red']}
            closable={false}
            style={{ marginRight: 3 }}
          >
            {label}
          </Tag>
        );
      },
    },
    {
      title: '颜色',
      dataIndex: 'color',
      valueType: 'select',
      valueEnum: colorOptions,
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
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
      ],
    },
  ];
  const categoryTagListColumns: ProColumns<CategoryTagListItem>[] = [
    {
      title: '标签',
      dataIndex: 'label',
      render: (_, { label, color }) => {
        return (
          <Tag color={color || 'red'} closable={false} style={{ marginRight: 3 }}>
            {label}
          </Tag>
        );
      },
    },
    {
      title: '颜色',
      dataIndex: 'color',
      valueType: 'select',
      valueEnum: colorOptions,
    },
    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
      ],
    },
  ];

  const handleHomePageTagSave = (data: HomePageTagListItem) => {
    if (data.id === -1) {
      const hide = message.loading('正在添加');
      addTag({
        tagName: data.label || '',
        color: data.color || '',
        ofType: '1',
      }).then((res) => {
        hide();
        if (res.code === '200') {
          message.success('添加成功');
          init();
        } else {
          message.error('添加失败，请重试！');
        }
      });
    } else {
      const hide = message.loading('正在保存');
      updateTag({
        tagId: data.id || -1,
        tagName: data.label || '',
        color: data.color || '',
        ofType: data.type || '',
      }).then((res) => {
        hide();
        if (res.code === '200') {
          message.success('保存成功');
          init();
        } else {
          message.error('保存失败，请重试！');
        }
      });
    }
  };
  const handleHomePageTagDelete = (data: HomePageTagListItem) => {
    const hide = message.loading('正在删除');
    deleteTag(data.id).then((res) => {
      hide();
      if (res.code === '200') {
        message.success('删除成功');
        init();
      } else {
        message.error('删除失败，请重试！');
      }
    });
  };

  const handleCategoryTagSave = (data: CategoryTagListItem) => {
    if (data.id === -1) {
      const hide = message.loading('正在添加');
      addTag({
        tagName: data.label || '',
        color: data.color || '',
        ofType: '2',
      }).then((res) => {
        hide();
        if (res.code === '200') {
          message.success('添加成功');
          init();
        } else {
          message.error('添加失败，请重试！');
        }
      });
    } else {
      const hide = message.loading('正在保存');
      updateTag({
        tagId: data.id || -1,
        tagName: data.label || '',
        color: data.color || '',
        ofType: data.type || '',
      }).then((res) => {
        hide();
        if (res.code === '200') {
          message.success('保存成功');
          init();
        } else {
          message.error('保存失败，请重试！');
        }
      });
    }
  };
  const handleCategoryTagDelete = (data: CategoryTagListItem) => {
    const hide = message.loading('正在删除');
    deleteTag(data.id).then((res) => {
      hide();
      if (res.code === '200') {
        message.success('删除成功');
        init();
      } else {
        message.error('删除失败，请重试！');
      }
    });
  };

  const init = () => {
    getTagList().then((res) => {
      const tagList = res.data;
      const newHomePageTagList = tagList
        .filter((item) => item.ofType === '1')
        .map((item) => {
          return {
            id: item.tagId,
            label: item.tagName,
            color: item.color,
            type: item.ofType,
          };
        });
      const newCategoryTagList = tagList
        .filter((item) => item.ofType === '2')
        .map((item) => {
          return {
            id: item.tagId,
            label: item.tagName,
            color: item.color,
            type: item.ofType,
          };
        });
      setHomePageTagList(newHomePageTagList);
      setCategoryTagList(newCategoryTagList);
    });
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <>
      <ProCard
        title={
          <>
            <HomeOutlined style={{ marginRight: 4 }} />
            首页标签管理
          </>
        }
        headerBordered
      >
        <EditableProTable<HomePageTagListItem>
          rowKey="id"
          scroll={{
            x: 800,
          }}
          recordCreatorProps={{
            position: 'bottom',
            record: (index, _) => ({ id: -1 }),
          }}
          loading={false}
          value={homePageTagList}
          columns={homePageTagListColumns}
          onChange={setHomePageTagList}
          editable={{
            type: 'multiple',
            editableKeys: homePageTagEditableKeys,
            onChange: setHomePageTagEditableRowKeys,
            onSave: async (rowKey, data, row) => {
              handleHomePageTagSave(data);
            },
            onDelete: async (key, row) => {
              handleHomePageTagDelete(row);
            },
          }}
        />
      </ProCard>
      <ProCard
        title={
          <>
            <AppstoreOutlined style={{ marginRight: 4 }} />
            分类标签管理
          </>
        }
        headerBordered
      >
        <EditableProTable<CategoryTagListItem>
          rowKey="id"
          scroll={{
            x: 800,
          }}
          recordCreatorProps={{
            position: 'bottom',
            record: (index, _) => ({ id: -1 }),
          }}
          loading={false}
          value={categoryTagList}
          columns={categoryTagListColumns}
          onChange={setCategoryTagList}
          editable={{
            type: 'multiple',
            editableKeys: categoryTagEditableKeys,
            onChange: setCategoryTagEditableRowKeys,
            onSave: async (rowKey, data, row) => {
              handleCategoryTagSave(data);
            },
            onDelete: async (key, row) => {
              handleCategoryTagDelete(row);
            },
          }}
        />
      </ProCard>
    </>
  );
}
