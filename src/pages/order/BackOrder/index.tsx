import { confirmBackOrder, getBackOrderList } from '@/services/api';
import { MoneyCollectOutlined, WarningOutlined } from '@ant-design/icons';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, message, Popconfirm, Space } from 'antd';
import { useState } from 'react';
import { useRequest } from 'umi';

interface BackOrderListItem {
  userOpenid: string;
  avatarUrl: string;
  nickName: string;
  courseId: string;
  courseName: string;
  coursePrice: number;
  actualPay: number;
  createTime: string;
  orderId: string;
  payTime: string;
}

interface GetBackOrderListResponse {
  code: string;
  data: { backOrderList: BackOrderListItem[] };
  message?: string;
}

const BackOrder = () => {
  const [backOrderList, setBackOrderList] = useState<BackOrderListItem[]>();
  const [total, setTotal] = useState(0);
  const { run: runGetBackOrderList } = useRequest(getBackOrderList, {
    refreshOnWindowFocus: true,
    onSuccess: (res: GetBackOrderListResponse) => {
      if (res.code === '200') {
        const newBackOrderList = res.data.backOrderList || [];
        const newTotal = newBackOrderList.length || 0;
        setBackOrderList(newBackOrderList);
        setTotal(newTotal);
      }
    },
  });
  const handleBackConfirm = async (orderId: string) => {
    const hide = message.loading('确认退款');
    await confirmBackOrder(orderId).then((res) => {
      if (res.code === '200') {
        hide();
        runGetBackOrderList();
        message.success('退款成功');
        return true;
      } else {
        hide();
        message.error('退款失败，请重试！');
        return false;
      }
    });
  };
  const columns: ProColumns<BackOrderListItem>[] = [
    {
      dataIndex: 'avatarUrl',
      title: '用户昵称',
      valueType: 'avatar',
      width: 150,
      render: (dom, record) => (
        <Space>
          <span>{dom}</span>
          {record.nickName}
        </Space>
      ),
    },
    {
      title: '用户openid',
      dataIndex: 'userOpenid',
      search: false,
      render: (_: any) => <div>{_}</div>,
    },
    {
      title: '订单编号',
      dataIndex: 'orderId',
      search: false,
      render: (_: any) => <div>{_}</div>,
    },
    {
      title: '课程id',
      dataIndex: 'courseId',
      render: (_: any) => <div>{_}</div>,
    },
    {
      title: '课程名称',
      dataIndex: 'courseName',
      render: (_: any) => <div>{_}</div>,
    },
    {
      title: '课程价格',
      dataIndex: 'coursePrice',
      search: false,
      render: (_: any) => <div>¥{_}</div>,
    },

    {
      title: '实付金额',
      dataIndex: 'actualPay',
      search: false,
      render: (_: any) => <div>¥{_}</div>,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      render: (_: any) => <div>{_}</div>,
    },
    {
      title: '支付时间',
      dataIndex: 'payTime',
      render: (_: any) => <div>{_}</div>,
    },
    {
      title: '操作',
      width: 180,
      valueType: 'option',
      render: (text: any, record: BackOrderListItem, _: any, action: any) => (
        <>
          <Popconfirm
            title="确定退款？"
            icon={<WarningOutlined style={{ color: 'red' }} />}
            okButtonProps={{ danger: true }}
            onConfirm={() => {
              handleBackConfirm(record.orderId);
            }}
            // onCancel={cancel}
            okText="是"
            cancelText="否"
          >
            <Button type="primary" icon={<MoneyCollectOutlined />} danger>
              确认退款
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];
  return (
    <>
      <ProTable
        dataSource={backOrderList}
        rowKey="orderId"
        pagination={{
          showQuickJumper: true,
        }}
        search={false}
        columns={columns}
        dateFormatter="string"
        headerTitle="退单处理"
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

export default BackOrder;
