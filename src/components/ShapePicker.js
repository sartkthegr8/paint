// src/components/ShapePicker.js

import React, { useState } from 'react';

function ShapePicker({ onShapeChange }) {
  const [shape, setShape] = useState('line'); // Default shape

  const handleChange = (event) => {
    const newShape = event.target.value;
    setShape(newShape);
    onShapeChange(newShape); // Notify parent component of the change
  };

  return (
    <div className="flex items-center ml-4">
      <label className="mr-2">Shape:</label>
      <select value={shape} onChange={handleChange} className="border rounded-md p-1">
        <option value="line">Line</option>
        <option value="rectangle">Rectangle</option>
        <option value="circle">Circle</option>
        <option value="polygon">Polygon</option>
      </select>
    </div>
  );
}

export default ShapePicker;
