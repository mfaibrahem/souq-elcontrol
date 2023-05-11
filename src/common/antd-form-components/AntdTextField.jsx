/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useController } from 'react-hook-form';
import { Form, Input } from 'antd';

const AntdTextField = ({
  disabled,
  setValue,
  control,
  name,
  type,
  label,
  placeholder,
  prefix,
  validateStatus,
  defaultValue,
  errorMsg,
  className,
  onChange,
  style
  // value
}) => {
  const {
    // field: { ...inputProps }
    field
  } = useController({
    name,
    control
  });

  React.useEffect(() => {
    if (defaultValue) {
      setValue(name, defaultValue);
    }
  }, [defaultValue]);

  return (
    <Form.Item
      label={label}
      help={errorMsg}
      validateStatus={validateStatus}
      colon={false}
    >
      <Input
        disabled={disabled ? disabled : false}
        {...field}
        onChange={(e) => {
          field.onChange(e);
          onChange && onChange();
        }}
        className={className}
        placeholder={placeholder}
        prefix={prefix}
        type={type}
        size="large"
        // defaultValue={defaultValue}
        // value={field.value ? field.value : defaultValue}
      />
    </Form.Item>
  );
};

export default AntdTextField;
