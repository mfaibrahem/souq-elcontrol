/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import moment from 'moment';
import { DatePicker } from 'antd';
const AntdDatePicker = ({
  fieldName,
  dateState,
  setDateState,
  setValue,
  errors,
  setError,
  clearErrors,
  errMsg,
  //
  selectedObject,
  selectedDateKeyName
}) => {
  function onDateChange(date, dateString) {
    // console.log(date.toDate(), dateString);
    if (date) {
      // setValue('fieldName', date.toDate());
      setDateState(date.toDate());
      clearErrors('fieldName');
    } else {
      setError('fieldName', errMsg);
    }
  }

  const handleDateValue = () => {
    if (selectedObject && selectedObject[selectedDateKeyName]) {
      if (dateState) {
        return moment(dateState, 'DD/MM/YYYY');
      }
      return moment(selectedObject[selectedDateKeyName], 'DD/MM/YYYY');
    } else if (dateState) {
      return moment(dateState, 'DD/MM/YYYY');
    }
    return null;
  };

  React.useEffect(() => {
    if (dateState) {
      setValue('expiration_date', dateState);
    }
  }, [dateState]);

  // initial values
  // handle initial values
  React.useEffect(() => {
    if (selectedObject) {
      if (selectedObject[selectedDateKeyName] && !dateState) {
        setValue(
          fieldName,
          moment(selectedObject.dateState, 'DD/MM/YYYY').toDate()
        );
      }
    }
  }, []);

  return (
    <div className="date-picker-wrap">
      <p className="label-p">تاريخ انتهاء الصلاحية ( DD / MM / YYYY )</p>

      <DatePicker
        onChange={onDateChange}
        allowClear={false}
        format="DD/MM/YYYY"
        value={handleDateValue()}
      />
      {errors && errors[fieldName] && (
        <p className="error-p">{errors[fieldName].message}</p>
      )}
    </div>
  );
};

export default AntdDatePicker;
