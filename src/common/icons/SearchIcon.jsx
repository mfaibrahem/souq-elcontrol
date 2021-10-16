import React from 'react';

const SearchIcon = ({ color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18.006"
      height="18.006"
      viewBox="0 0 18.006 18.006"
    >
      <path
        id="search"
        d="M17.71,16.29l-3.4-3.39A7.92,7.92,0,0,0,16,8a8,8,0,1,0-8,8,7.92,7.92,0,0,0,4.9-1.69l3.39,3.4a1,1,0,1,0,1.42-1.42ZM2,8a6,6,0,1,1,1.757,4.243A6,6,0,0,1,2,8Z"
        transform="translate(0)"
        fill={color ? color : '#afb7d1'}
      />
    </svg>
  );
};

export default SearchIcon;
