import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Area from './models/Area';

const area: Area = new Area(0, 0, 50, 50);

ReactDOM.render(
  <React.StrictMode>
    <App area={area}/>
  </React.StrictMode>,
  document.getElementById('root')
);