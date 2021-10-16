import React from 'react';

const SearchIcon = ({ color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18.049"
      height="18.049"
      viewBox="0 0 18.049 18.049"
    >
      <g id="loupe" transform="translate(0)">
        <g id="Group_1095" data-name="Group 1095" transform="translate(2.152)">
          <g>
            <path
              d="M7.948,0A7.948,7.948,0,1,1,0,7.948,7.958,7.958,0,0,1,7.948,0Zm0,14.429A6.481,6.481,0,1,0,1.467,7.948,6.488,6.488,0,0,0,7.948,14.429Z"
              fill={color ? color : '#fff'}
            />
          </g>
        </g>
        <g transform="translate(0 12.375)">
          <g>
            <path
              d="M351.261,355.467l4.207-4.207A.734.734,0,1,1,356.5,352.3L352.3,356.5a.734.734,0,0,1-1.037-1.037Z"
              transform="translate(-351.046 -351.046)"
              fill={color ? color : '#fff'}
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export default SearchIcon;
