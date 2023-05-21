import { Spin } from 'antd';

export default function StyleSpin() {
  return (
    <div
      style={{
        margin: ' 20px 0',
        marginBottom: '20px',
        padding: ' 30px 50px',
        textAlign: 'center',
        borderRadius: '4px',
      }}
    >
      <Spin size="large" />
    </div>
  );
}
