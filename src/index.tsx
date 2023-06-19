import React from 'react';
import ReactDOM from 'react-dom';
import OthelloBoard from './components/OthelloBoard';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <OthelloBoard />
  </React.StrictMode>,
  document.getElementById('root')
);