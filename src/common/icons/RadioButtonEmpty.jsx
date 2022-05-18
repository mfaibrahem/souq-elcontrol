import React from 'react';

const RadioButtonEmpty = ({ color }) => {
  return (
    // <svg
    //   xmlns="http://www.w3.org/2000/svg"
    //   width="24"
    //   height="24"
    //   viewBox="0 0 24 24"
    // >
    //   <path
    //     color={color ? color : '#C4C4C4'}
    //     d="M5 12c0 3.859 3.14 7 7 7 3.859 0 7-3.141 7-7s-3.141-7-7-7c-3.86 0-7 3.141-7 7zm12 0c0 2.757-2.243 5-5 5s-5-2.243-5-5 2.243-5 5-5 5 2.243 5 5z"
    //   ></path>
    // </svg>
    <svg
      width="29"
      height="29"
      viewBox="0 0 29 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M27.3268 14.5C27.3268 21.9781 21.4113 28 14.1634 28C6.91546 28 1 21.9781 1 14.5C1 7.02188 6.91546 1 14.1634 1C21.4113 1 27.3268 7.02188 27.3268 14.5Z"
        stroke={color || '#6d6d6d'}
        strokeWidth="2"
      />
    </svg>
  );
};

export default RadioButtonEmpty;
