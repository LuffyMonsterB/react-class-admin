import fallbackImg from '@/assets/fallback.png';
import { getVideo, getVideoCover, uploadVideo, uploadVideoCover } from '@/services/api';
import {
  PictureOutlined,
  RedoOutlined,
  UploadOutlined,
  VideoCameraAddOutlined,
} from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { Button, Card, Divider, Image, message, Upload, UploadFile, UploadProps } from 'antd';
import { RcFile } from 'antd/lib/upload';
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

const CoverUploadButton = () => {
  const handleUpload = async (file: UploadFile) => {
    const hide = message.loading('正在上传');
    const formData = new FormData();
    formData.append('videoCover', file as RcFile);
    await uploadVideoCover(formData).then((res) => {
      hide();
      if (res.code === '200') {
        message.success('上传成功');
        return true;
      } else {
        message.error('上传失败，请重试！');
        return false;
      }
    });
    return true;
  };
  const uploadProps: UploadProps = {
    name: 'file',
    showUploadList: false,
    accept: '.jpg,.png,.jpeg',
    beforeUpload: async (file) => {
      handleUpload(file);
      return false;
    },
  };
  return (
    <Upload {...uploadProps}>
      <Button type="link" icon={<UploadOutlined />}>
        上传
      </Button>
    </Upload>
  );
};

const VideoUploadButton = () => {
  const handleUpload = async (file: UploadFile) => {
    const formData = new FormData();
    const hide = message.loading('正在上传,大文件上传时间较长，请稍后查看');
    await formData.append('video', file as RcFile);

    await uploadVideo(formData).then((res) => {
      hide();
      if (res.code === '200') {
        message.success('上传成功');
        return true;
      } else {
        message.error('上传失败，请重试！');
        return false;
      }
    });
    return true;
  };
  const uploadProps: UploadProps = {
    name: 'file',
    showUploadList: false,
    accept: '.mp4',
    beforeUpload: async (file) => {
      handleUpload(file);
      return false;
    },
  };
  return (
    <Upload {...uploadProps}>
      <Button type="link" icon={<UploadOutlined />}>
        上传
      </Button>
    </Upload>
  );
};

const Player = (props: { url: string }) => {
  return (
    <>
      {React.createElement(ReactPlayer, {
        url: props.url,
        width: '100%',
        playing: false,
        controls: true,
      })}
    </>
  );
};

export default function VideoUpload() {
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [videoCoverUrl, setVideoCoverUrl] = useState<string>('');
  const getVideoRequest = async () => {
    const newVideoUrl = await getVideo().then((res) => {
      if (res.code === '200') {
        return res.data;
      } else {
        message.error('获取视频地址失败，请重试！');
      }
    });
    setVideoUrl(`${newVideoUrl}?timestamp=${Date.now()}`);
    const newVideoCoverUrl = await getVideoCover().then((res) => {
      if (res.code === '200') {
        return res.data;
      } else {
        message.error('获取视频封面地址失败，请重试！');
      }
    });
    setVideoCoverUrl(`${newVideoCoverUrl}?timestamp=${Date.now()}`);
  };

  useEffect(() => {
    getVideoRequest();
  }, []);
  return (
    <>
      <ProCard>
        <Button
          type="primary"
          icon={<RedoOutlined />}
          onClick={() => {
            getVideoRequest();
          }}
        >
          刷新
        </Button>
        <div>
          <div style={{ fontWeight: 'bold' }}>
            <PictureOutlined style={{ marginRight: 4 }} />
            视频封面
          </div>

          <Card
            hoverable
            style={{ width: '100%' }}
            bodyStyle={{ padding: 0, textAlign: 'center' }}
            actions={[<CoverUploadButton />]}
          >
            <Image height={270} src={videoCoverUrl} fallback={fallbackImg} />
          </Card>
        </div>
        <Divider></Divider>
        <div>
          <div style={{ fontWeight: 'bold' }}>
            <VideoCameraAddOutlined style={{ marginRight: 4 }} />
            宣传视频
          </div>
          <Card
            hoverable
            style={{ width: '100%' }}
            bodyStyle={{ padding: 0 }}
            actions={[<VideoUploadButton />]}
          >
            <Player url={videoUrl} />
          </Card>
        </div>
      </ProCard>
    </>
  );
}
