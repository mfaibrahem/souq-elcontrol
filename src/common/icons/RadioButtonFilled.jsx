import React from 'react';

const RadioButtonFilled = ({ color }) => {
  return (
    // <svg
    //   xmlns="http://www.w3.org/2000/svg"
    //   width="24"
    //   height="24"
    //   viewBox="0 0 24 24"
    // >
    //   <path
    //     color={color ? color : '#C4C4C4'}
    //     d="M12 5c-3.859 0-7 3.141-7 7s3.141 7 7 7 7-3.141 7-7-3.141-7-7-7zm0 12c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z"
    //   ></path>
    //   <path
    //     color={color ? color : '#C4C4C4'}
    //     d="M12 9c-1.627 0-3 1.373-3 3s1.373 3 3 3 3-1.373 3-3-1.373-3-3-3z"
    //   ></path>
    // </svg>

    <svg
      width="33"
      height="33"
      viewBox="0 0 33 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.1634 32C24.5599 32 31.3268 25.0381 31.3268 16.5C31.3268 7.96186 24.5599 1 16.1634 1C7.76687 1 1 7.96186 1 16.5C1 25.0381 7.76687 32 16.1634 32Z"
        fill="#9D4EDD"
        stroke="#9D4EDD"
        strokeWidth="2"
      />
      <g clipPath="url(#clip0_2046_4953)">
        <path
          d="M24.599 10.2122L13.8953 21.6913C13.8233 21.7688 13.7378 21.8302 13.6436 21.8722C13.5495 21.9141 13.4485 21.9357 13.3465 21.9357C13.2446 21.9357 13.1436 21.9141 13.0494 21.8722C12.9552 21.8302 12.8697 21.7688 12.7978 21.6913L8.6585 17.2477C8.58654 17.1702 8.50102 17.1087 8.40685 17.0668C8.31267 17.0248 8.2117 17.0032 8.10973 17.0032C8.00775 17.0032 7.90678 17.0248 7.81261 17.0668C7.71844 17.1087 7.63292 17.1702 7.56095 17.2477C7.4887 17.3249 7.43138 17.4166 7.39226 17.5176C7.35314 17.6186 7.33301 17.7269 7.33301 17.8363C7.33301 17.9456 7.35314 18.0539 7.39226 18.1549C7.43138 18.2559 7.4887 18.3477 7.56095 18.4248L11.7018 22.8651C12.1386 23.3327 12.7305 23.5953 13.3477 23.5953C13.9649 23.5953 14.5568 23.3327 14.9936 22.8651L25.6965 11.3886C25.7686 11.3114 25.8259 11.2197 25.8649 11.1188C25.904 11.0179 25.9241 10.9097 25.9241 10.8004C25.9241 10.6911 25.904 10.5829 25.8649 10.482C25.8259 10.3811 25.7686 10.2894 25.6965 10.2122C25.6245 10.1348 25.539 10.0733 25.4449 10.0313C25.3507 9.98937 25.2497 9.96777 25.1477 9.96777C25.0458 9.96777 24.9448 9.98937 24.8506 10.0313C24.7564 10.0733 24.6709 10.1348 24.599 10.2122Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_2046_4953">
          <rect
            width="18.5895"
            height="19.9375"
            fill="white"
            transform="translate(7.31152 6.53125)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default RadioButtonFilled;
