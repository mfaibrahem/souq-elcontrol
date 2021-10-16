import React from 'react';
import { useController } from 'react-hook-form';
import { Form, Radio } from 'antd';

const AntdRadioGroup = ({
  control,
  name,
  label,
  onChange,
  validateStatus,
  errorMsg,
  radios,
  defaultValue,
  isRadioButton,
  className,
  disabled
}) => {
  const {
    // field: { ...inputProps }
    field
  } = useController({
    name,
    control
  });

  return (
    <Form.Item
      name={name}
      label={label}
      help={errorMsg}
      validateStatus={validateStatus}
      className={className}
    >
      <Radio.Group
        disabled={disabled ? disabled : false}
        {...field}
        size="large"
        buttonStyle="solid"
        onChange={(e) => {
          field.onChange(e);
          onChange && onChange();
        }}
        defaultValue={defaultValue ? defaultValue : ''}
      >
        {radios?.length &&
          radios.map((radio, index) =>
            isRadioButton ? (
              <Radio.Button key={index} value={radio.value}>
                {radio.title}
              </Radio.Button>
            ) : (
              <Radio key={index} value={radio.value}>
                {radio.title}
              </Radio>
            )
          )}
      </Radio.Group>
    </Form.Item>
  );
};

export default AntdRadioGroup;
