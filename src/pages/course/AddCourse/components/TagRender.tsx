import { Tag } from 'antd';
import type { CustomTagProps } from 'rc-select/lib/BaseSelect';

const TagRender = (props: CustomTagProps) => {
  const { label, value, closable, onClose } = props;
  const textColor = label?.toString().split(',') || [];
  const text = textColor[0] || '';
  const color = textColor[1] || '';
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={color}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}
    >
      {text}
    </Tag>
  );
};
export default TagRender;
