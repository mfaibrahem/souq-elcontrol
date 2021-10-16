/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
// import { useLocation } from 'react-router-dom';
// import queryString from 'query-string';
import { Select } from 'antd';
import SelectDropDown from '../../common/icons/SelectDropDown';
import getAllRealestatesApi from '../../apis/realestates-apis/getAllRealestatesApis';
import SearchIcon from '../../common/icons/SearchIcon';
import checkRes from '../../utils/checkRes';

const RealestatePageFilter = ({
  setIsLoading,
  setAllFetchedRealestates,
  setRealestatePagination
}) => {
  // const { search } = useLocation();
  // const values = queryString.parse(search);
  const { Option } = Select;
  const [filterValues, setFilterValues] = React.useState({
    title: '',
    rooms: '',
    price: '',
    type: ''
  });

  async function handleChange(filterType, value) {
    // console.log(`selected ${value}`);
    setFilterValues((prevState) => {
      if (filterType === 'title') {
        return {
          ...prevState,
          title: value
        };
      } else if (filterType === 'rooms') {
        return {
          ...prevState,
          rooms: value
        };
      } else if (filterType === 'price') {
        return {
          ...prevState,
          price: value
        };
      } else if (filterType === 'type') {
        return {
          ...prevState,
          type: value
        };
      }
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await getAllRealestatesApi(
        {
          ...filterValues,
          // ...values
          page: 1
        },
        filterValues
      );

      // is response is success
      if (checkRes(res)) {
        const data = res.data?.data?.data;
        if (data?.length >= 0) setAllFetchedRealestates(data);
        if (res?.data?.data?.pagination)
          setRealestatePagination(res.data.data.pagination);

        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }

  return (
    <div className="custom-table-fitler" style={{ marginBottom: '92px' }}>
      <form className="filter-form receipt-filter-form" onSubmit={handleSubmit}>
        <div className="table-search">
          <label>
            <SearchIcon />
            <input
              placeholder="أدخل اسم العقــار للبحث"
              type="text"
              name="title"
              onChange={(e) => handleChange('title', e.target.value)}
            />
          </label>
        </div>
        <div className="table-search">
          <label>
            <SearchIcon />
            <input
              placeholder="عدد الغرف"
              type="text"
              name="rooms"
              onChange={(e) => handleChange('rooms', e.target.value)}
            />
          </label>
        </div>
        <div className="table-search">
          <label>
            <SearchIcon />
            <input
              placeholder="سعر العقــار"
              type="text"
              name="price"
              onChange={(e) => handleChange('price', e.target.value)}
            />
          </label>
        </div>
        <label className="receipt-filter-option-wrap">
          <Select
            defaultValue={null}
            style={{ width: 172 }}
            onChange={(v) => handleChange('type', v)}
            suffixIcon={<SelectDropDown />}
            showSearch={true}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value={null}>الترتيب حسب السعر</Option>
            {[
              { id: 1, name: 'الأعلى سعر الى الاقل سعر' },
              { id: 2, name: 'الاقل سعر الى الأعلى سعر' }
            ].map((item) => (
              <Option key={item.id} value={String(item.id)}>
                {item.name}
              </Option>
            ))}
          </Select>
        </label>

        <button className="filter-submit-btn" type="submit">
          بحث
        </button>
      </form>
    </div>
  );
};

export default RealestatePageFilter;
