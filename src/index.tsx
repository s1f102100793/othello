import React from 'react';
import ReactDOM from 'react-dom';
import OthelloBoard from './components/OthelloBoard'; // この行を追

ReactDOM.render(
  <React.StrictMode>
    <OthelloBoard /> {/* "App" を "OthelloBoard" に変更 */}
  </React.StrictMode>,
  document.getElementById('root')
);