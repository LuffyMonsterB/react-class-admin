import {
  addAnnounce,
  deleteAnnounce,
  getAnnounceList,
  getMiniProgramMsg,
  updateAnnounce,
  updateMiniProgramAboutMsg,
  updateMiniProgramPhoneMsg,
} from '@/services/api';
import { AlertOutlined, PhoneOutlined, SoundOutlined } from '@ant-design/icons';
import { EditableProTable, ProCard, ProColumns } from '@ant-design/pro-components';
import { Button, Divider, Input, message, Typography } from 'antd';
import React, { useEffect, useState } from 'react';

const { Paragraph } = Typography;
const { TextArea } = Input;
interface AnnounceListItem {
  id: number;
  title?: string;
  content?: string;
  createTime?: string;
  status?: string;
}

export default function Message() {
  const [announceList, setAnnounceList] = useState<AnnounceListItem[]>();
  const [announceEditableKey, setAnnounceEditableKey] = useState<React.Key[]>();
  const [phoneMsg, setPhoneMsg] = useState<string>('');
  const [aboutMsg, setAboutMsg] = useState<string>('');

  const announceListColumns: ProColumns<AnnounceListItem>[] = [
    {
      title: '时间',
      dataIndex: 'createTime',
      valueType: 'date',
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
      title: '标题',
      dataIndex: 'title',
      valueType: 'text',
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
      title: '内容',
      dataIndex: 'content',
      valueType: 'textarea',
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
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {
        '0': {
          text: '显示',
          status: 'Processing',
        },
        '1': {
          text: '隐藏',
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
      valueType: 'option',
      width: 200,
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id || '');
          }}
        >
          编辑
        </a>,
      ],
    },
  ];

  const init = () => {
    getAnnounceList().then((res) => {
      if (res.code === '200') {
        const newAnnounceList: AnnounceListItem[] = res.data.map((item) => {
          let newAnnounce: AnnounceListItem = {
            id: item.id,
            title: item.title,
            content: item.content,
            createTime: item.createTime,
            status: item.status,
          };
          return newAnnounce;
        });
        setAnnounceList(newAnnounceList);
      } else {
        message.error('公告列表获取失败，请重试！');
      }
    });
    getMiniProgramMsg().then((res) => {
      if (res.code === '200') {
        setPhoneMsg(res.data.connectPhone || '');
        setAboutMsg(res.data.about || '');
      } else {
        message.error('信息获取失败，请重试！');
      }
    });
  };

  const handleAnnounceItemSave = (data: AnnounceListItem) => {
    const announce = {
      id: data.id,
      title: data.title,
      content: data.content,
      createTime: data.createTime,
      status: data.status,
    };
    if (announce.id === -1) {
      const hide = message.loading('正在创建');
      addAnnounce({
        createTime: announce.createTime || '',
        title: announce.title || '',
        content: announce.content || '',
        status: announce.status || '1',
      }).then((res) => {
        hide();
        if (res.code === '200') {
          message.success('创建成功');
          init();
        } else {
          message.error('创建失败，请重试！');
        }
      });
    } else {
      const hide = message.loading('正在保存');
      updateAnnounce(announce).then((res) => {
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
  const handleAnnounceItemDelete = (data: AnnounceListItem) => {
    const hide = message.loading('正在删除');
    deleteAnnounce(data.id).then((res) => {
      hide();
      if (res.code === '200') {
        message.success('删除成功');
        init();
      } else {
        message.error('删除失败，请重试！');
      }
    });
  };

  const handlePhoneMsgSave = () => {
    const hide = message.loading('正在保存');
    updateMiniProgramPhoneMsg(phoneMsg).then((res) => {
      hide();
      if (res.code === '200') {
        message.success('保存成功');
      } else {
        message.error('保存失败，请重试！');
      }
    });
  };
  const handleAboutMsgSave = () => {
    const hide = message.loading('正在保存');
    updateMiniProgramAboutMsg(aboutMsg).then((res) => {
      hide();
      if (res.code === '200') {
        message.success('保存成功');
      } else {
        message.error('保存失败，请重试！');
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <ProCard>
        <div>
          <div style={{ fontWeight: 'bold' }}>
            <SoundOutlined style={{ marginRight: 4 }} />
            公告
          </div>

          <EditableProTable<AnnounceListItem>
            rowKey="id"
            scroll={{
              x: 800,
            }}
            recordCreatorProps={{
              position: 'bottom',
              record: () => ({ id: -1 }),
            }}
            loading={false}
            value={announceList}
            columns={announceListColumns}
            // onChange={handleAnnounceListChange}
            editable={{
              type: 'multiple',
              editableKeys: announceEditableKey,
              onChange: setAnnounceEditableKey,
              onSave: async (rowKey, data, row) => {
                handleAnnounceItemSave(data);
              },
              onDelete: async (key, row) => {
                handleAnnounceItemDelete(row);
              },
              // actionRender: (row, config, defaultDom) => [defaultDom.save, defaultDom.cancel],
            }}
          />
        </div>
        <Divider></Divider>
        <div>
          <div style={{ fontWeight: 'bold' }}>
            <PhoneOutlined style={{ marginRight: 4 }} />
            联系电话
          </div>

          <Input
            placeholder="请输入联系电话"
            value={phoneMsg}
            onChange={(e) => {
              setPhoneMsg(e.target.value);
            }}
            onPressEnter={handlePhoneMsgSave}
          />
          <Button style={{ marginTop: 4 }} type="primary" onClick={handlePhoneMsgSave}>
            保存
          </Button>
        </div>
        <Divider></Divider>
        <div>
          <div style={{ fontWeight: 'bold' }}>
            <AlertOutlined style={{ marginRight: 4 }} />
            关于我们
          </div>

          <TextArea
            value={aboutMsg}
            onChange={(e) => {
              setAboutMsg(e.target.value);
            }}
            placeholder="请输入公司的介绍"
            rows={4}
            showCount
            onPressEnter={handleAboutMsgSave}
          />
          <Button style={{ marginTop: 4 }} type="primary" onClick={handleAboutMsgSave}>
            保存
          </Button>
        </div>
      </ProCard>
    </>
  );
}
