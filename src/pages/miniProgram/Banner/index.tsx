import fallbackImg from '@/assets/fallback.png';
import { getBannerList, uploadBanner } from '@/services/api';
import { RedoOutlined, UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Divider,
  Image,
  message,
  Row,
  Typography,
  Upload,
  UploadFile,
  UploadProps,
} from 'antd';
import ImgCrop from 'antd-img-crop';
import { RcFile } from 'antd/lib/upload';
import { useEffect, useState } from 'react';

const { Title } = Typography;

interface BannerListItem {
  bannerId: string;
  imgUrl: string;
}

const Banner = () => {
  const [loading, setLoading] = useState<Boolean>(true);
  const [bannerList, setBannerList] = useState<BannerListItem[]>([]);
  const getBannerListRequest = () => {
    getBannerList().then((res) => {
      if (res.code === '200') {
        setBannerList(res.data);
        setLoading(false);
      } else {
        message.error('banner列表获取失败，请重试！');
      }
    });
  };
  useEffect(() => {
    getBannerListRequest();
  }, []);

  return loading ? (
    <></>
  ) : (
    <>
      <Button
        type="primary"
        icon={<RedoOutlined />}
        onClick={() => {
          setLoading(true);
          getBannerListRequest();
        }}
      >
        刷新
      </Button>
      <Divider orientation="left" orientationMargin="0">
        <Title level={3}>首页海报</Title>
      </Divider>

      <Row justify="center" align="middle" gutter={[16, 16]}>
        {bannerList.map((banner) => {
          return (
            <Col span={8} key={banner.bannerId}>
              <Card
                hoverable
                style={{ width: 480 }}
                bodyStyle={{ padding: 0 }}
                actions={[<UploadButton bannerId={banner.bannerId} />]}
              >
                <Image
                  width={480}
                  height={270}
                  src={`${banner.imgUrl}?timestamp=${Date.now()}`}
                  fallback={fallbackImg}
                />
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

const UploadButton = (props: { bannerId: string }) => {
  const handleUpload = (file: UploadFile) => {
    const formData = new FormData();
    const hide = message.loading('正在上传');
    formData.append('homepage', file as RcFile);
    formData.append('bannerId', props.bannerId);
    uploadBanner(formData).then((res) => {
      hide();
      if (res.code === '200') {
        message.success('上传成功');
      } else {
        message.error('上传失败，请重试！');
      }
    });
  };
  const uploadProps: UploadProps = {
    name: 'file',
    showUploadList: false,
    accept: '.jpg,.png,.jpeg',
    beforeUpload: (file) => {
      handleUpload(file);
      return false;
    },
  };
  return (
    <ImgCrop aspect={16 / 9} quality={1} modalWidth={600} modalTitle="图片裁剪">
      <Upload {...uploadProps}>
        <Button type="link" icon={<UploadOutlined />}>
          上传
        </Button>
      </Upload>
    </ImgCrop>
  );
};

export default Banner;
