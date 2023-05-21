import { FileSearchOutlined } from '@ant-design/icons';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, Space, Tag } from 'antd';
import { useEffect, useState } from 'react';

interface CustomListItem {
  userOpenid: string;
  avatarUrl: string;
  nickName: string;
  phone: string;
  vip: number;
  consume: number;
  student: Array<string>;
  location: string;
}
const mockCustomList: CustomListItem[] = [
  {
    userOpenid: 'dwqd-cascsa-cassazxc',
    avatarUrl: 'http://dummyimage.com/200x200',
    nickName: '张三',
    phone: '123456',
    vip: 1,
    consume: 1262,
    student: ['小张三'],
    location: '宁波',
  },
  {
    userOpenid: 'dwqd-cascsa-cassazxc',
    avatarUrl: 'http://dummyimage.com/200x200',
    nickName: '王五',
    phone: '123456',
    vip: 2,
    consume: 2399,
    student: ['小王五', '小小王五'],
    location: '宁波',
  },
];
// interface GetBackOrderListResponse {
//   code: string;
//   data: { backOrderList: BackOrderListItem[] };
//   message?: string;
// }

const Vip = () => {
  const [customList, setCustomList] = useState<CustomListItem[]>();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setCustomList(mockCustomList);
  }, []);
  const columns: ProColumns<CustomListItem>[] = [
    {
      dataIndex: 'avatarUrl',
      title: '用户昵称',
      valueType: 'avatar',
      width: 150,
      render: (dom, record) => (
        <Space>
          <span>{dom}</span>
          <a>{record.nickName}</a>
        </Space>
      ),
    },
    {
      title: '用户openid',
      dataIndex: 'userOpenid',
      render: (_: any) => <div>{_}</div>,
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      render: (_: any) => <div>{_}</div>,
    },
    {
      title: '地区',
      dataIndex: 'location',
      render: (_: any) => <div>{_}</div>,
    },
    {
      title: '会员等级',
      dataIndex: 'vip',
      valueType: 'select',
      filters: true,
      onFilter: true,
      ellipsis: true,
      valueEnum: {
        0: {
          text: '非会员',
          status: 'Error',
        },
        1: {
          text: 'vip1',
          status: 'Processing',
        },
        2: {
          text: 'vip2',
          status: 'Processing',
        },
        3: {
          text: 'vip3',
          status: 'Processing',
        },
      },
    },
    {
      title: '消费金额',
      dataIndex: 'consume',
      render: (_: any) => <div>¥{_}</div>,
    },
    {
      title: '学员',
      dataIndex: 'student',
      search: false,
      render: (_, record) => (
        <>
          {record.student.map((item, index) => (
            <Tag key={index}>{item}</Tag>
          ))}
        </>
      ),
    },
    {
      title: '操作',
      width: 180,
      valueType: 'option',
      render: (_, record) => (
        <>
          <Button type="link" icon={<FileSearchOutlined />}>
            详情
          </Button>
        </>
      ),
    },
  ];
  return (
    <>
      <ProTable
        dataSource={customList}
        rowKey="userOpenid"
        pagination={{
          showQuickJumper: true,
        }}
        search={{
          labelWidth: 'auto',
        }}
        columns={columns}
        dateFormatter="string"
        headerTitle="客户列表"
        toolBarRender={() => [
          // <Button key="show">查看日志</Button>,
          // <Button key="out">
          //   导出数据
          //   <DownOutlined />
          // </Button>,
          <Button type="primary" key="out" onClick={() => {}}>
            导出数据
          </Button>,
        ]}
      />
    </>
  );
};

export default Vip;
