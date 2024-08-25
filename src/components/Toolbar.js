import React from 'react';

function Toolbar({
  brushSize, brushColor, shape, textOptions, eraserSize,
  onToolChange, onBrushSizeChange, onColorChange, onShapeChange,
  onTextChange, onEraserSizeChange, onUndo, onRedo
}) {
  return (
    <div className="flex flex-col justify-start p-4 bg-gray-200 w-64">
      <button className="mb-4 bg-blue-500 text-white p-2 rounded" onClick={() => onToolChange('brush')}>Brush</button>
      <input type="range" min="1" max="10" value={brushSize} onChange={(e) => onBrushSizeChange(e.target.value)} className="mb-4" />
      
      <button className="mb-4 bg-green-500 text-white p-2 rounded" onClick={() => onToolChange('shape')}>Shapes</button>
      <select value={shape} onChange={(e) => onShapeChange(e.target.value)} className="mb-4">
        <option value="line">Line</option>
        <option value="rectangle">Rectangle</option>
        <option value="circle">Circle</option>
        <option value="polygon">Polygon</option>
      </select>

      <button className="mb-4 bg-yellow-500 text-white p-2 rounded" onClick={() => onToolChange('text')}>Text</button>
      <input type="text" placeholder="Enter text" value={textOptions.text} onChange={(e) => onTextChange({ ...textOptions, text: e.target.value })} className="mb-4" />
      <input type="color" value={textOptions.color} onChange={(e) => onTextChange({ ...textOptions, color: e.target.value })} className="mb-4" />
      <input type="range" min="10" max="50" value={textOptions.fontSize} onChange={(e) => onTextChange({ ...textOptions, fontSize: e.target.value })} className="mb-4" />

      <button className="mb-4 bg-red-500 text-white p-2 rounded" onClick={() => onToolChange('eraser')}>Eraser</button>
      <input type="range" min="1" max="10" value={eraserSize} onChange={(e) => onEraserSizeChange(e.target.value)} className="mb-4" />
      
      <div className="flex justify-between">
        <button className="bg-gray-300 p-2 rounded mr-2" onClick={onUndo}>Undo</button>
        <button className="bg-gray-300 p-2 rounded" onClick={onRedo}>Redo</button>
      </div>
    </div>
  );
}

export default Toolbar;
