import React, { useState } from 'react';
import Canvas from '../components/Canvas'; // Adjust the import path based on your file structure

const DrawingPage = () => {
  const [brushSize, setBrushSize] = useState(5);
  const [brushColor, setBrushColor] = useState('#000000');
  const [shape, setShape] = useState('freehand');
  const [isEraser, setIsEraser] = useState(false);
  const [text, setText] = useState('');
  const [textSize, setTextSize] = useState(20);
  const [textColor, setTextColor] = useState('#000000');
  const [textFont, setTextFont] = useState('Arial');

  const handleBrushSizeChange = (size) => setBrushSize(size);
  const handleBrushColorChange = (color) => setBrushColor(color);
  const handleShapeChange = (newShape) => setShape(newShape);
  const handleEraserToggle = () => setIsEraser(!isEraser);
  const handleTextChange = (textValue) => setText(textValue);
  const handleTextSizeChange = (size) => setTextSize(size);
  const handleTextColorChange = (color) => setTextColor(color);
  const handleTextFontChange = (font) => setTextFont(font);

  return (
    <div>
      <Canvas
        brushSize={brushSize}
        brushColor={brushColor}
        shape={shape}
        isEraser={isEraser}
        text={text}
        textSize={textSize}
        textColor={textColor}
        textFont={textFont}
        onBrushSizeChange={handleBrushSizeChange}
        onBrushColorChange={handleBrushColorChange}
        onShapeChange={handleShapeChange}
        onEraserToggle={handleEraserToggle}
        onTextChange={handleTextChange}
        onTextSizeChange={handleTextSizeChange}
        onTextColorChange={handleTextColorChange}
        onTextFontChange={handleTextFontChange}
      />
    </div>
  );
};

export default DrawingPage;
