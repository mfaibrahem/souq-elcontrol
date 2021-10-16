import React from 'react';

const BlockedIcon = ({ color }) => {
  return (
    <svg
      id="blocked"
      xmlns="http://www.w3.org/2000/svg"
      width="14.511"
      height="14.511"
      viewBox="0 0 14.511 14.511"
    >
      <path
        id="Path_8416"
        data-name="Path 8416"
        d="M0,0H6.815V.907H0Z"
        transform="translate(7.848 12.669) rotate(-45)"
        fill={color ? color : '#fff'}
      />
      <path
        id="Path_8417"
        data-name="Path 8417"
        d="M14.93,18.86a3.93,3.93,0,1,1,3.93-3.93A3.934,3.934,0,0,1,14.93,18.86Zm0-6.953a3.023,3.023,0,1,0,3.023,3.023A3.026,3.026,0,0,0,14.93,11.907Z"
        transform="translate(-4.349 -4.349)"
        fill={color ? color : '#fff'}
      />
      <path
        id="Path_8418"
        data-name="Path 8418"
        d="M4.988,14.86H1.36A1.362,1.362,0,0,1,0,13.5V8.36A1.362,1.362,0,0,1,1.36,7H8.313a1.34,1.34,0,0,1,1.013.458.453.453,0,0,1-.683.6.437.437,0,0,0-.33-.148H1.36a.454.454,0,0,0-.453.453V13.5a.454.454,0,0,0,.453.453H4.988a.453.453,0,0,1,0,.907Z"
        transform="translate(0 -2.768)"
        fill={color ? color : '#fff'}
      />
      <path
        id="Path_8419"
        data-name="Path 8419"
        d="M8.593,5.139a.454.454,0,0,1-.453-.453V3.023a2.116,2.116,0,1,0-4.232,0V4.686a.453.453,0,0,1-.907,0V3.023a3.023,3.023,0,0,1,6.046,0V4.686A.454.454,0,0,1,8.593,5.139Z"
        transform="translate(-1.186)"
        fill={color ? color : '#fff'}
      />
    </svg>
  );
};

export default BlockedIcon;
