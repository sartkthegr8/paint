// src/components/TextTool.js

import React, { useState } from 'react';

function TextTool({ onTextChange }) {
  const [text, setText] = useState('');
  const [color, setColor] = useState('#000000');
  const [fontSize, setFontSize] = useState(20);

  const handleTextChange = (event) => {
    setText(event.target.value);
    onTextChange({ text, color, fontSize });
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
    onTextChange({ text, color, fontSize });
  };

  const handleFontSizeChange = (event) => {
    setFontSize(event.target.value);
    onTextChange({ text, color, fontSize });
  };

  return (
    <div className="flex flex-col ml-4">
      <label className="mr-2">Text:</label>
      <input
        type="text"
        placeholder="Enter text"
        value={text}
        onChange={handleTextChange}
        className="mb-2 border rounded-md p-1"
      />
      <div className="flex items-center mb-2">
        <label className="mr-2">Color:</label>
        <input
          type="color"
          value={color}
          onChange={handleColorChange}
          className="ml-2"
        />
      </div>
      <div className="flex items-center">
        <label className="mr-2">Font Size:</label>
        <input
          type="range"
          min="10"
          max="50"
          value={fontSize}
          onChange={handleFontSizeChange}
          className="ml-2"
        />
        <span className="ml-2">{fontSize}px</span>
      </div>
    </div>
  );
}

export default TextTool;
