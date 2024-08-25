// src/components/BrushSizePicker.js

import React, { useState } from 'react';

function BrushSizePicker({ onBrushSizeChange }) {
  const [brushSize, setBrushSize] = useState(5); // Default brush size

  const handleChange = (event) => {
    const newSize = event.target.value;
    setBrushSize(newSize);
    onBrushSizeChange(newSize); // Notify parent component of the change
  };

  return (
    <div className="flex items-center ml-4">
      <label className="mr-2">Brush Size:</label>
      <input
        type="range"
        min="1"
        max="10"
        value={brushSize}
        onChange={handleChange}
        className="accent-purple-600"
      />
      <span className="ml-2 text-gray-700">{brushSize}</span>
    </div>
  );
}

export default BrushSizePicker;
