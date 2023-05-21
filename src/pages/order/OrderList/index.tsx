import { getOrderExcel, getOrderList } from '@/services/api';
import download2Excel from '@/utils/download2Excel';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useState } from 'react';
import { useRequest } from 'umi';

interface OrderListItem {
  actualPay: number;
  courseId: string;
  courseName: string;
  coursePrice: number;
  createTime: string;
  nickName: string;
  orderId: string;
  payTime: string;
  status: string;
  userOpenid: string;
}

interface GetOrderListResponse {
  code: string;
  data: { orderList: OrderListItem[] };
  message?: string;
}

const OrderList = () => {
  const [orderList, setOrderList] = useState<OrderListItem[]>();
  const [total, setTotal] = useState(0);
  const { run: runGetOrderList } = useRequest(getOrderList, {
    refreshOnWindowFocus: true,
    onSuccess: (res: GetOrderListResponse) => {
      if (res.code === '200') {
        const newOrderList = res.data.orderList || [];
        const newTotal = newOrderList.length || 0;
        setOrderList(newOrderList);
        setTotal(newTotal);
      }
    },
  });

  const columns: ProColumns<OrderListItem>[] = [
    {
      title: '订单编号',
      dataIndex: 'orderId',
      search: false,
      render: (_: any) => <div>{_}</div>,
    },
    {
      title: '用户昵称',
      dataIndex: 'nickName',
      render: (_: any) => <a>{_}</a>,
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
      title: '订单状态',
      dataIndex: 'status',
      search: false,
      filters: true,
      onFilter: true,
      ellipsis: true,
      valueType: 'select',
      valueEnum: {
        1: {
          text: '已完成',
          status: 'success',
        },
        2: {
          text: '已支付',
          status: 'success',
        },
        3: {
          text: '未支付',
          status: 'warning',
        },
        4: {
          text: '已取消',
          status: 'warning',
        },
        5: {
          text: '已退款',
          status: 'success',
        },
        6: {
          text: '待退款',
          status: 'error',
        },
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      search: false,
      render: (_: any) => <div>{_}</div>,
    },
    {
      title: '支付时间',
      dataIndex: 'payTime',
      search: false,
      render: (_: any) => <div>{_}</div>,
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
        dataSource={orderList}
        rowKey="orderId"
        pagination={{
          showQuickJumper: true,
        }}
        search={{
          labelWidth: 'auto',
        }}
        columns={columns}
        dateFormatter="string"
        headerTitle="订单列表"
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

export default OrderList;
