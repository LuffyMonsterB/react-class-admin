import { getOrderExcel } from '@/services/api';
import download2Excel from '@/utils/download2Excel';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, Space } from 'antd';
import { useEffect, useState } from 'react';

const mockRechargeOrderList: API.RechargeOrderListItem[] = [
  {
    rechargeOrderId: '12dwq3dwqdqw',
    openid: 'dqwdwq1231231',
    avatarUrl: 'http://dummyimage.com/200x200',
    nickName: 'string1',
    createTime: '2022-09-25 19:11:12',
    money: '2131',
    vipType: '1',
    duration: 123,
    startTime: '2022-09-25 19:11:12',
    endTime: '2022-09-25 19:11:12',
    status: '0',
  },
  {
    rechargeOrderId: '12vs3dwqdqw',
    openid: 'dqwdwq1231231',
    avatarUrl: 'http://dummyimage.com/200x200',
    nickName: 'string2',
    createTime: '2022-09-25 19:11:12',
    money: '2131',
    vipType: '1',
    duration: 123,
    startTime: '2022-09-25 19:11:12',
    endTime: '2022-09-25 19:11:12',
    status: '1',
  },
  {
    rechargeOrderId: '123dwcasqdqw',
    openid: 'dqwdwq1231231',
    avatarUrl: 'http://dummyimage.com/200x200',
    nickName: 'string3',
    createTime: '2022-09-25 19:11:12',
    money: '2131',
    vipType: '1',
    duration: 123,
    startTime: '2022-09-25 19:11:12',
    endTime: '2022-09-25 19:11:12',
    status: '2',
  },
];

const RechargeOrderList = () => {
  const [rechargeOrderList, setRechargeOrderList] = useState<API.RechargeOrderListItem[]>([]);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    setRechargeOrderList(mockRechargeOrderList);
  });

  const columns: ProColumns<API.RechargeOrderListItem>[] = [
    {
      title: '订单编号',
      dataIndex: 'rechargeOrderId',
      search: false,
      render: (_: any) => <div>{_}</div>,
    },
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
      title: '创建时间',
      dataIndex: 'createTime',
      render: (_: any) => <div>{_}</div>,
    },
    {
      title: '支付金额',
      dataIndex: 'money',
      render: (_: any) => <div>￥{_}</div>,
    },
    {
      title: 'vip类型',
      dataIndex: 'vipType',
      search: false,
      render: (_: any) => <div>{_}</div>,
    },

    {
      title: '有效时长',
      dataIndex: 'duration',
      search: false,
      render: (_: any) => <div>{_}天</div>,
    },
    {
      title: '开始时间',
      dataIndex: 'startTime',
      search: false,
      render: (_: any) => <div>{_}</div>,
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      search: false,
      render: (_: any) => <div>{_}</div>,
    },
    {
      title: '订单状态',
      dataIndex: 'status',
      search: false,
      filters: true,
      onFilter: true,
      ellipsis: true,
      valueType: 'select',
      valueEnum: {
        0: {
          text: '待支付',
          status: 'warning',
        },
        1: {
          text: '失败',
          status: 'error',
        },
        2: {
          text: '支付成功',
          status: 'success',
        },
      },
    },
  ];
  const handleExportDataBtnClick = () => {
    getOrderExcel().then((res) => {
      download2Excel(res, '订单列表');
    });
  };
  return (
    <>
      <ProTable
        dataSource={rechargeOrderList}
        rowKey="rechargeOrderId"
        pagination={{
          showQuickJumper: true,
        }}
        search={{
          labelWidth: 'auto',
        }}
        columns={columns}
        dateFormatter="string"
        headerTitle="充值订单列表"
        toolBarRender={() => [
          // <Button key="show">查看日志</Button>,
          // <Button key="out">
          //   导出数据
          //   <DownOutlined />
          // </Button>,
          <Button type="primary" key="out" onClick={handleExportDataBtnClick}>
            导出数据
          </Button>,
        ]}
      />
    </>
  );
};

export default RechargeOrderList;
