import React from 'react';
import './CustomSharedTable.scss';

const CustomSharedTable = ({ children, className }) => {
  return <div className={`custom-shared-table ${className}`}>{children}</div>;
};

export default CustomSharedTable;
