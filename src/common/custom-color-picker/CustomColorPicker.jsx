import React from 'react';
import { SketchPicker } from 'react-color';

const CustomColorPicker = ({ color, setColor }) => {
  return (
    <div
      style={{
        display: 'grid',
        placeItems: 'center'
      }}
    >
      <SketchPicker
        width="332px"
        color={color}
        onChange={(color) => {
          setColor(color.hex);
        }}
      />
    </div>
  );
};

export default CustomColorPicker;
