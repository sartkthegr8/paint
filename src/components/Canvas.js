import React, { useRef, useState, useEffect } from 'react';

const Canvas = () => {
  const canvasRef = useRef(null);
  const [context, setContext] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [brushColor, setBrushColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);
  const [shape, setShape] = useState('freehand');
  const [text, setText] = useState('');
  const [textColor, setTextColor] = useState('#000000');
  const [textSize, setTextSize] = useState(20);
  const [textFont, setTextFont] = useState('Arial');
  const [textPos, setTextPos] = useState(null);
  const [isEraser, setIsEraser] = useState(false);
  const [history, setHistory] = useState([]); 
  const [redoStack, setRedoStack] = useState([]); 

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.8;

    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    setContext(ctx);
  }, []);

  const saveState = () => {
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL();
    setHistory([...history, dataUrl]);
    setRedoStack([]); 
  };

  const loadState = (dataUrl) => {
    const img = new Image();
    img.src = dataUrl;
    img.onload = () => {
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      context.drawImage(img, 0, 0);
    };
  };

  const undo = () => {
    if (history.length === 0) return;
    const previousState = history.pop();
    setRedoStack([canvasRef.current.toDataURL(), ...redoStack]);
    setHistory([...history]);
    loadState(previousState);
  };

  const redo = () => {
    if (redoStack.length === 0) return;
    const nextState = redoStack.shift();
    setHistory([...history, canvasRef.current.toDataURL()]);
    loadState(nextState);
    setRedoStack([...redoStack]);
  };

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    setStartPos({ x: offsetX, y: offsetY });
    setIsDrawing(true);

    if (shape === 'freehand' && !isEraser) {
      context.beginPath();
      context.moveTo(offsetX, offsetY);
    }
  };

  const drawShape = ({ nativeEvent }) => {
    if (!isDrawing) return;

    const { offsetX, offsetY } = nativeEvent;

    if (isEraser) {
      context.globalCompositeOperation = 'destination-out';
      context.beginPath();
      context.arc(offsetX, offsetY, brushSize, 0, Math.PI * 2, false);
      context.fill();
      context.closePath();
    } else {
      if (shape === 'freehand') {
        context.lineTo(offsetX, offsetY);
        context.strokeStyle = brushColor;
        context.lineWidth = brushSize;
        context.stroke();
      } else {
        context.globalCompositeOperation = 'source-over';
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        redrawCanvas();
        drawCurrentShape(offsetX, offsetY);
      }
    }
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);

    if (shape !== 'freehand' && !isEraser) {
      drawCurrentShape(startPos.x, startPos.y);
    }
    context.closePath();
    saveState();
  };

  const drawCurrentShape = (x, y) => {
    if (shape === 'line') {
      drawLine(x, y);
    } else if (shape === 'rectangle') {
      drawRectangle(x, y);
    } else if (shape === 'circle') {
      drawCircle(x, y);
    } else if (shape === 'polygon') {
      drawPolygon(x, y);
    }
  };

  const drawLine = (x, y) => {
    context.beginPath();
    context.moveTo(startPos.x, startPos.y);
    context.lineTo(x, y);
    context.strokeStyle = brushColor;
    context.lineWidth = brushSize;
    context.stroke();
    context.closePath();
  };

  const drawRectangle = (x, y) => {
    context.beginPath();
    context.rect(startPos.x, startPos.y, x - startPos.x, y - startPos.y);
    context.strokeStyle = brushColor;
    context.lineWidth = brushSize;
    context.stroke();
    context.closePath();
  };

  const drawCircle = (x, y) => {
    context.beginPath();
    const radius = Math.sqrt(
      Math.pow(x - startPos.x, 2) + Math.pow(y - startPos.y, 2)
    );
    context.arc(startPos.x, startPos.y, radius, 0, Math.PI * 2, false);
    context.strokeStyle = brushColor;
    context.lineWidth = brushSize;
    context.stroke();
    context.closePath();
  };

  const drawPolygon = (x, y) => {
    const sides = 5; 
    const radius = Math.sqrt(
      Math.pow(x - startPos.x, 2) + Math.pow(y - startPos.y, 2)
    );
    const angle = (Math.PI * 2) / sides;

    context.beginPath();
    for (let i = 0; i < sides; i++) {
      context.lineTo(
        startPos.x + radius * Math.cos(angle * i),
        startPos.y + radius * Math.sin(angle * i)
      );
    }
    context.closePath();
    context.strokeStyle = brushColor;
    context.lineWidth = brushSize;
    context.stroke();
  };

  const redrawCanvas = () => {
    const { width, height } = canvasRef.current;
    context.clearRect(0, 0, width, height);
  };

  const handleTextInput = () => {
    if (!textPos) return;

    context.font = `${textSize}px ${textFont}`;
    context.fillStyle = textColor;
    context.textAlign = 'left';
    context.textBaseline = 'top';
    context.fillText(text, textPos.x, textPos.y);

    setText('');
    setTextPos(null);
  };

  const startTextInput = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    setTextPos({ x: offsetX, y: offsetY });
  };

  return (
    <div className="flex">
      <div className="flex flex-col p-4 space-y-4 bg-gray-100 border-r border-gray-300 w-1/5">
        {/* Brush Size Selector */}
        <label className="flex items-center space-x-2">
          <span>Brush Size</span>
          <input
            type="range"
            min="1"
            max="50"
            value={brushSize}
            onChange={(e) => setBrushSize(e.target.value)}
            className="w-full"
          />
        </label>

        {/* Brush Color Picker */}
        <label className="flex items-center space-x-2">
          <span>Brush Color</span>
          <input
            type="color"
            value={brushColor}
            onChange={(e) => setBrushColor(e.target.value)}
            className="w-10 h-10 p-0 border-0"
          />
        </label>

        {/* Shape Selector */}
        <label className="flex items-center space-x-2">
          <span>Shape</span>
          <select
            value={shape}
            onChange={(e) => setShape(e.target.value)}
            className="w-full"
          >
            <option value="freehand">Freehand</option>
            <option value="line">Line</option>
            <option value="rectangle">Rectangle</option>
            <option value="circle">Circle</option>
            <option value="polygon">Polygon</option>
          </select>
        </label>

        {/* Eraser Tool */}
        <button
          onClick={() => setIsEraser(!isEraser)}
          className="px-4 py-2 text-white bg-red-500 rounded"
        >
          {isEraser ? 'Switch to Drawing' : 'Eraser'}
        </button>

        {/* Undo/Redo */}
        <div className="flex space-x-2">
          <button
            onClick={undo}
            className="px-4 py-2 text-white bg-blue-500 rounded"
          >
            Undo
          </button>
          <button
            onClick={redo}
            className="px-4 py-2 text-white bg-green-500 rounded"
          >
            Redo
          </button>
        </div>

        {/* Text Input Controls */}
        <label className="flex items-center space-x-2">
          <span>Text</span>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full px-2 py-1 border border-gray-300 rounded"
          />
        </label>

        <label className="flex items-center space-x-2">
          <span>Font Size</span>
          <input
            type="number"
            value={textSize}
            onChange={(e) => setTextSize(e.target.value)}
            className="w-full px-2 py-1 border border-gray-300 rounded"
          />
        </label>

        <label className="flex items-center space-x-2">
          <span>Font Color</span>
          <input
            type="color"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
            className="w-10 h-10 p-0 border-0"
          />
        </label>

        <label className="flex items-center space-x-2">
          <span>Font</span>
          <select
            value={textFont}
            onChange={(e) => setTextFont(e.target.value)}
            className="w-full"
          >
            <option value="Arial">Arial</option>
            <option value="Verdana">Verdana</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Courier New">Courier New</option>
          </select>
        </label>

        {/* Submit Text Button */}
        <button
          onClick={handleTextInput}
          className="px-4 py-2 text-white bg-indigo-500 rounded"
        >
          Add Text
        </button>
      </div>

      <div className="flex-1 p-4">
        <canvas
          ref={canvasRef}
          onMouseDown={shape === 'text' ? startTextInput : startDrawing}
          onMouseMove={drawShape}
          onMouseUp={stopDrawing}
          className="border border-gray-300"
        />
      </div>
    </div>
  );
};

export default Canvas;
