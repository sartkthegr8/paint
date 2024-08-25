// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DrawingPage from './pages/DrawingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/draw" element={<DrawingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
