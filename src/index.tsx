import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css'; // <--- ESTA LÍNEA ES OBLIGATORIA

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}