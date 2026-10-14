import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import './styles/index.css';

export const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
