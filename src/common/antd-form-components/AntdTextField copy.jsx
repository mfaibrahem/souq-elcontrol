import React from 'react';
import { useController } from 'react-hook-form';
import { Form, Input } from 'antd';

const AntdTextField = ({
  control,
  name,
  type,
  label,
  placeholder,
  prefix,
  validateStatus,
  errorMsg
}) => {
  const {
    // field: { ...inputProps }
    field
  } = useController({
    name,
    control
  });

  return (
    <Form.Item label={label} help={errorMsg} validateStatus={validateStatus} colon={false}>
      <Input {...field} placeholder={placeholder} prefix={prefix} type={type} size="large" />
    </Form.Item>
  );
};

export default AntdTextField;
