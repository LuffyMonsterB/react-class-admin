import { createUser, deleteUser, getUserList, updateUser } from '@/services/api';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import {
  EditableProTable,
  ModalForm,
  ProColumns,
  ProForm,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
} from '@ant-design/pro-components';
import { Button, message, Popconfirm } from 'antd';
import { useState } from 'react';
import { useRequest } from 'umi';

interface UserListItem {
  userName: string;
  roleType: string;
  userId: string;
  password: string;
  status: string;
}

interface GetUserListResponse {
  code: string;
  data?: UserListItem[];
  message?: string;
}

const UserList = () => {
  const [editableKeys, setEditableRowKeys] = useState();
  const [userList, setUserList] = useState<UserListItem[]>();
  const [total, setTotal] = useState(0);
  const [createUserModalVisible, setCreateUserModalVisible] = useState(false);
  const { run: runGetUserList } = useRequest(getUserList, {
    refreshOnWindowFocus: true,
    onSuccess: (res: GetUserListResponse) => {
      if (res.code === '200') {
        const newUserList = res.data || [];
        const newTotal = newUserList.length || 0;
        setUserList(newUserList);
        setTotal(newTotal);
      }
    },
  });
  const handleCreateUser = async (userForm: UserListItem) => {
    userForm.status = userForm.status === 'true' ? '1' : '0';
    const hide = message.loading('正在添加');
    await createUser(userForm).then((res) => {
      if (res.code === '200') {
        hide();
        setCreateUserModalVisible(false);
        runGetUserList();
        message.success('添加成功');
        return true;
      } else {
        hide();
        message.error('添加失败，请重试！');
        return false;
      }
    });
  };
  const handleDeleteUser = async (userId: string) => {
    const hide = message.loading('正在删除');
    await deleteUser(userId).then((res) => {
      if (res.code === '200') {
        hide();
        runGetUserList();
        message.success('删除成功');
        return true;
      } else {
        hide();
        message.error('删除失败，请重试！');
        return false;
      }
    });
  };
  const handleUpdateUser = async (userForm: UserListItem) => {
    const hide = message.loading('正在更新');
    await updateUser(userForm).then((res) => {
      if (res.code === '200') {
        hide();
        runGetUserList();
        message.success('更新成功');
        return true;
      } else {
        hide();
        message.error('失败，请重试！');
        return false;
      }
    });
  };
  const columns: ProColumns<UserListItem>[] = [
    {
      title: '姓名',
      dataIndex: 'userName',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
      render: (_: any) => <a>{_}</a>,
    },
    {
      title: '角色',
      dataIndex: 'roleType',
      valueType: 'select',
      valueEnum: {
        1: {
          text: '管理员',
        },
        2: {
          text: '员工',
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
      // render: (_, { role }) => {
      //   if (role) {
      //     let color = role['roleType'] === '1' ? 'volcano' : 'geekblue';
      //     return <Tag color={color}>{role['label']}</Tag>;
      //   } else {
      //     return <div></div>;
      //   }
      // },
    },
    {
      title: '账号',
      dataIndex: 'userId',
      readonly: true,
      render: (_: any) => <div>{_}</div>,
    },
    {
      title: '密码',
      dataIndex: 'password',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
      render: (_: any) => <div>{_}</div>,
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {
        '1': {
          text: '启用中',
          status: 'Processing',
        },
        '0': {
          text: '停用',
          status: 'Error',
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
      title: '操作',
      width: 180,
      valueType: 'option',
      render: (text: any, record: UserListItem, _: any, action: any) => (
        <>
          <Button
            type="link"
            key="editable"
            icon={<EditOutlined />}
            onClick={() => {
              action?.startEditable?.(record.userId);
            }}
          >
            修改
          </Button>
          <Popconfirm
            title="确定删除？"
            onConfirm={() => {
              handleDeleteUser(record.userId);
            }}
            // onCancel={cancel}
            okText="是"
            cancelText="否"
          >
            <Button type="link" icon={<DeleteOutlined />} danger>
              删除
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];
  return (
    <>
      <EditableProTable
        value={userList}
        recordCreatorProps={false}
        rowKey="userId"
        pagination={{
          showQuickJumper: true,
        }}
        editable={{
          type: 'multiple',
          editableKeys,
          onSave: async (rowKey, data, row) => {
            handleUpdateUser(data);
          },
          onChange: (e) => {
            setEditableRowKeys;
          },
          actionRender: (row, config, dom) => [dom.save, dom.cancel],
        }}
        columns={columns}
        search={false}
        dateFormatter="string"
        headerTitle="角色列表"
        toolBarRender={() => [
          // <Button key="show">查看日志</Button>,
          // <Button key="out">
          //   导出数据
          //   <DownOutlined />
          // </Button>,
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setCreateUserModalVisible(true);
            }}
          >
            创建角色
          </Button>,
        ]}
      />
      <ModalForm
        title="创建角色"
        width={400}
        visible={createUserModalVisible}
        onFinish={handleCreateUser}
        onVisibleChange={setCreateUserModalVisible}
      >
        <ProForm.Group>
          <ProFormText
            width="md"
            name="userName"
            label="姓名"
            placeholder="请输入姓名"
            rules={[{ required: true, message: '请输入姓名！' }]}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            width="md"
            name="userId"
            label="账号"
            placeholder="用于登录"
            tooltip="最长为 16 位"
            rules={[{ required: true, message: '请输入用户名！' }]}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            width="md"
            name="password"
            label="密码"
            placeholder="请输入密码"
            tooltip="最少为 8 位"
            rules={[{ required: true, message: '请输入密码！' }]}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormSelect
            initialValue={'1'}
            options={[
              {
                value: '1',
                label: '管理员',
              },
              {
                value: '2',
                label: '员工',
              },
            ]}
            width="sm"
            name="roleType"
            label="角色选择"
            // rules={[{ required: true, message: '请选择角色！' }]}
          />
          <ProFormSwitch
            width="xs"
            name="status"
            label="初始状态"
            initialValue={true}
            checkedChildren="启用"
            unCheckedChildren="停用"
          />
        </ProForm.Group>
      </ModalForm>
    </>
  );
};

export default UserList;
