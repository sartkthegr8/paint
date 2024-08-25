// src/components/EraserTool.js

import React, { useState } from 'react';

function EraserTool({ onEraserSizeChange }) {
  const [eraserSize, setEraserSize] = useState(5); // Default eraser size

  const handleChange = (event) => {
    const newSize = event.target.value;
    setEraserSize(newSize);
    onEraserSizeChange(newSize); // Notify parent component of the change
  };

  return (
    <div className="flex items-center ml-4">
      <label className="mr-2">Eraser Size:</label>
      <input
        type="range"
        min="1"
        max="10"
        value={eraserSize}
        onChange={handleChange}
        className="accent-purple-600"
      />
      <span className="ml-2 text-gray-700">{eraserSize}</span>
    </div>
  );
}

export default EraserTool;
