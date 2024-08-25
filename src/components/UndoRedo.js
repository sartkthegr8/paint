// src/components/UndoRedo.js

import React from 'react';

function UndoRedo({ onUndo, onRedo }) {
  return (
    <div className="flex items-center ml-4">
      <button 
        className="bg-gray-300 p-2 rounded mr-2" 
        onClick={onUndo}
      >
        Undo
      </button>
      <button 
        className="bg-gray-300 p-2 rounded" 
        onClick={onRedo}
      >
        Redo
      </button>
    </div>
  );
}

export default UndoRedo;
