import React from 'react';
import breadcrumbBgImg from '../../assets/imgs/bgs/breadcrumb-bg.png';
import { Link as RouterLink } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import './Breadcrumb.scss';

const CustomBreadcrubm = ({ arr }) => {
  return (
    <div className="breadcrumb-section">
      <div className="custom-container">
        <div
          className="breadcrumb-content"
          style={{
            backgroundImage: `url(${breadcrumbBgImg})`
          }}
        >
          <Breadcrumb>
            {arr?.length > 0 &&
              arr.map((ele, index) => {
                return (
                  <Breadcrumb.Item key={index}>
                    {ele?.isLink ? (
                      <RouterLink to={ele.to}>{ele.title}</RouterLink>
                    ) : (
                      ele.title
                    )}
                  </Breadcrumb.Item>
                );
              })}
          </Breadcrumb>
        </div>
      </div>
    </div>
  );
};

export default CustomBreadcrubm;
