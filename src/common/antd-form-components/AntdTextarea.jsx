import React from 'react';
import { useController } from 'react-hook-form';
import { Form, Input } from 'antd';

const AntdTextarea = ({
  name,
  maxLength,
  rows,
  label,
  placeholder,
  prefix,
  showCount,
  validateStatus,
  errorMsg,
  control,
  className
}) => {
  const { TextArea } = Input;
  const {
    // field: { ...inputProps }
    field
  } = useController({
    name,
    control
  });

  return (
    <Form.Item
      label={label}
      help={errorMsg}
      validateStatus={validateStatus}
      colon={false}
    >
      <TextArea
        {...field}
        rows={rows}
        showCount={showCount}
        maxLength={maxLength}
        placeholder={placeholder}
        prefix={prefix}
        className={className}
      />
    </Form.Item>
  );
};

export default AntdTextarea;
