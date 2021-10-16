import React from 'react';
import SortAscDescIcon from '../../common/icons/SortAscDescIcon';
import './CustomSharedTableHead.scss';

const CustomSharedTableHead = (props) => {
  const { tableHead } = props;

  const renderAction = (action) => {
    if (action.type === 'sort-asc-desc') {
      return <SortAscDescIcon />;
    }
    return null;
  };

  const renderTableHead = () => {
    if (tableHead?.length > 0) {
      return tableHead.map((th, index) => (
        <div
          key={index}
          className={`row-cell row-text ${index === 0 ? 'row-index' : ''} row-${
            th.col
          }`}
        >
          <div className={`text-wrap  ${th?.action?.type ? 'row-icon' : ''}`}>
            <div className="th-title">{th.title}</div>
            {th?.action && (
              <div className="th-action">{renderAction(th.action)}</div>
            )}
          </div>
        </div>
      ));
    }
  };

  return <div className="custom-shared-table-head">{renderTableHead()}</div>;
};

export default CustomSharedTableHead;
