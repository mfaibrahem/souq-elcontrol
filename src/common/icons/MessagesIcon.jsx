import React from 'react';

const MessagesIcon = ({ color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="23.175"
      viewBox="0 0 24 23.175"
    >
      <path
        id="marketing"
        d="M12.456,16.388l9.6,2.812V14.027a4.584,4.584,0,0,0,.836-.927A6.8,6.8,0,0,0,24,9.269a6.8,6.8,0,0,0-1.105-3.83,4.583,4.583,0,0,0-.836-.927V0L5.589,4.52H0V14.5H4.913c.075,1.529.475,5.657,2.6,7.994l.622.683,2.906-3.521-.2-.453a7.531,7.531,0,0,1-.321-.978c.085-.04.173-.084.263-.134A4.172,4.172,0,0,0,12.456,16.388ZM6.5,5.931,20.457,2.1V17.062L8.47,13.552v1.069a14.952,14.952,0,0,0,.73,4.753L8.136,20.664C6.524,18.107,6.5,13.961,6.5,13.915V5.931ZM22.4,9.269a5.748,5.748,0,0,1-.34,1.971V7.3A5.748,5.748,0,0,1,22.4,9.269ZM1.6,6.121H4.9V12.9H1.6Zm8.6,10.451c-.036-.272-.066-.563-.088-.871l.753.221A2.576,2.576,0,0,1,10.2,16.572Z"
        fill={color ? color : '#5f758e'}
      />
    </svg>
  );
};

export default MessagesIcon;
