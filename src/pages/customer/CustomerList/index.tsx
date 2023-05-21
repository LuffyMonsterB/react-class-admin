import { FileSearchOutlined } from '@ant-design/icons';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, Drawer, Space, Tag } from 'antd';
import { useEffect, useState } from 'react';
import CustomerDetail from '../components/CustomerDetail';

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
    userOpenid: '1',
    avatarUrl: 'http://dummyimage.com/200x200',
    nickName: '张三',
    phone: '123456',
    vip: 1,
    consume: 1262,
    student: ['小张三'],
    location: '宁波',
  },
  {
    userOpenid: '2',
    avatarUrl: 'http://dummyimage.com/200x200',
    nickName: '李四',
    phone: '123456',
    vip: 0,
    consume: 0,
    student: [],
    location: '宁波',
  },
  {
    userOpenid: '3',
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

const CustomList = () => {
  const [customList, setCustomList] = useState<CustomListItem[]>();
  const [total, setTotal] = useState(0);
  const [openCustomerDetail, setOpenCustomerDetail] = useState<boolean>(true);
  useEffect(() => {
    setCustomList(mockCustomList);
    setTotal(mockCustomList.length);
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
          <Button
            type="link"
            icon={<FileSearchOutlined />}
            onClick={() => {
              setOpenCustomerDetail(true);
            }}
          >
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
        headerTitle="客户列表"
        toolBarRender={() => [
          <Button type="primary" key="out" onClick={() => {}}>
            导出数据
          </Button>,
        ]}
      />
      <Drawer title="Basic Drawer" placement="right" open={openCustomerDetail}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
      <CustomerDetail customerInfo={{}} isOpen={openCustomerDetail}></CustomerDetail>
    </>
  );
};

export default CustomList;
