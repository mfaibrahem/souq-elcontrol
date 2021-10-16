import React from 'react';

const AddCircledIcon = ({ color }) => {
  return (
    <svg
      id="add_3_"
      data-name="add (3)"
      xmlns="http://www.w3.org/2000/svg"
      width="16.999"
      height="16.999"
      viewBox="0 0 16.999 16.999"
    >
      <g id="Group_82" data-name="Group 82">
        <g id="Group_81" data-name="Group 81">
          <path
            id="Path_64"
            data-name="Path 64"
            d="M8.5,0A8.5,8.5,0,1,0,17,8.5,8.509,8.509,0,0,0,8.5,0Zm0,15.785A7.285,7.285,0,1,1,15.785,8.5,7.293,7.293,0,0,1,8.5,15.785Z"
            fill={color ? color : '#afb7d1'}
          />
        </g>
      </g>
      <g id="Group_84" data-name="Group 84" transform="translate(7.892 4.452)">
        <g id="Group_83" data-name="Group 83">
          <path
            id="Path_65"
            data-name="Path 65"
            d="M238.321,134.1a.607.607,0,0,0-.607.607v6.881a.607.607,0,1,0,1.214,0V134.7A.607.607,0,0,0,238.321,134.1Z"
            transform="translate(-237.714 -134.095)"
            fill={color ? color : '#afb7d1'}
          />
        </g>
      </g>
      <g id="Group_86" data-name="Group 86" transform="translate(4.452 7.892)">
        <g id="Group_85" data-name="Group 85">
          <path
            id="Path_66"
            data-name="Path 66"
            d="M141.583,237.714H134.7a.607.607,0,1,0,0,1.214h6.881a.607.607,0,1,0,0-1.214Z"
            transform="translate(-134.095 -237.714)"
            fill={color ? color : '#afb7d1'}
          />
        </g>
      </g>
    </svg>
  );
};

export default AddCircledIcon;
