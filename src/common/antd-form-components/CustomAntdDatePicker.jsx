import React from 'react';
import { useController } from 'react-hook-form';
import { DatePicker } from 'antd';
import moment from 'moment';

const CustomAntdDatePicker = ({
  control,
  name,
  label,
  placeholder,
  validateStatus,
  defaultValue,
  errorMsg,
  className,
  formCalssName,
  disablePast
}) => {
  const {
    // field: { ...inputProps }
    field
  } = useController({
    name,
    control
  });

  const handleDisabledDate = (curr) => {
    if (disablePast) {
      return curr && curr <= moment();
      // return curr && moment(curr).isBefore();
    }
    return null;
  };
  return (
    <div className="custom-picker-wrap">
      <DatePicker
        disabledDate={handleDisabledDate}
        {...field}
        className={className}
        format="DD/MM/YYYY"
        placeholder={placeholder}
        size="large"
        defaultValue={defaultValue}
        bordered={false}
        getPopupContainer={() => document.querySelector(`.${formCalssName}`)}
        // value={defaultValue ? defaultValue : field.value}
      />

      {errorMsg && <p className="error-p">{errorMsg}</p>}
    </div>
  );
};

export default CustomAntdDatePicker;
