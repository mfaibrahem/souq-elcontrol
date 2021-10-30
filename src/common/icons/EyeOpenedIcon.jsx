import React from 'react';

const EyeOpenedIcon = ({ color, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25.681"
      height="15.537"
      viewBox="0 0 25.681 15.537"
      {...props}
    >
      <g id="eye" transform="translate(0 -96.767)">
        <g id="Group_952" transform="translate(0 96.767)">
          <g id="Group_951" transform="translate(0)">
            <path
              id="Path_2514"
              d="M25.507,105.065a.9.9,0,0,0-.026-1.1c-3.884-4.775-8.078-7.2-12.47-7.2C5.562,96.767.388,103.707.174,104A.9.9,0,0,0,.2,105.1c3.879,4.781,8.072,7.2,12.465,7.2C20.113,112.3,25.287,105.364,25.507,105.065Zm-12.842,5.441c-3.659,0-7.223-2.013-10.609-5.976,1.326-1.567,5.541-5.965,10.955-5.965,3.659,0,7.223,2.013,10.609,5.976C22.294,106.108,18.08,110.506,12.665,110.506Z"
              transform="translate(0 -96.767)"
              fill={color ? color : '#9a9a9a'}
            />
            <path
              id="Path_2515"
              d="M162.383,157.867a4.566,4.566,0,1,0,4.566,4.566A4.573,4.573,0,0,0,162.383,157.867Zm0,7.333a2.768,2.768,0,1,1,2.768-2.768A2.772,2.772,0,0,1,162.383,165.2Z"
              transform="translate(-149.545 -154.664)"
              fill={color ? color : '#9a9a9a'}
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export default EyeOpenedIcon;
