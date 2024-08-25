// src/components/ColorPicker.js

import React, { useState } from 'react';

function ColorPicker({ onColorChange }) {
  const [color, setColor] = useState('#000000'); // Default color

  const handleChange = (event) => {
    const newColor = event.target.value;
    setColor(newColor);
    onColorChange(newColor); // Notify parent component of the change
  };

  return (
    <div className="flex items-center ml-4">
      <label className="mr-2">Color:</label>
      <input
        type="color"
        value={color}
        onChange={handleChange}
        className="border-none"
      />
    </div>
  );
}

export default ColorPicker;
