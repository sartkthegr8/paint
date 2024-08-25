// src/pages/HomePage.js

import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="text-center px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-8">Welcome to Drawing Paint</h1>
        <Link to="/draw">
          <button
            className="px-8 py-4 text-lg md:text-xl font-semibold text-purple-700 bg-white rounded-full shadow-lg hover:bg-gray-200 transition duration-300"
            aria-label="Start Drawing"
          >
            Start Drawing
          </button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
