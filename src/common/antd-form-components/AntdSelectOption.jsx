import React from 'react';
import { useController } from 'react-hook-form';
import { Empty, Form, Select } from 'antd';
import ArrowDownIcon from '../icons/ArrowDownIcon';

const AntdSelectOption = ({
  control,
  name,
  label,
  placeholder,
  setValue,
  validateStatus,
  errorMsg,
  options,
  showSearch,
  onSearch,
  filterOption,
  formClassName,
  // onSelect
  onChange,
  mode,
  disabled
}) => {
  const {
    // field: { ...inputProps }
    field
  } = useController({
    name,
    control
  });
  const { Option } = Select;

  const hanldeClear = () => {
    setValue(name, '');
  };

  return (
    <Form.Item label={label} help={errorMsg} validateStatus={validateStatus}>
      <Select
        disabled={disabled ? disabled : false}
        onClear={hanldeClear}
        onChange={onChange && onChange()}
        mode={mode ? mode : null}
        // onChange={field.onChange}
        // onBlur={field.onBlur}
        notFoundContent={
          <Empty description={false}>لا يوجد بيانات متاحة</Empty>
        }
        {...field}
        placeholder={placeholder}
        size="large"
        suffixIcon={<ArrowDownIcon />}
        // allowClear
        getPopupContainer={() => document.querySelector(`.${formClassName}`)}
        showSearch={showSearch ? showSearch : false}
        filterOption={filterOption ? filterOption : true}
        onSearch={onSearch ? onSearch : null}
      >
        {options?.length > 0 &&
          options.map((op, index) => (
            <Option key={index} value={String(op.value)}>
              {op.title}
            </Option>
          ))}
      </Select>
    </Form.Item>
  );
};

export default AntdSelectOption;
