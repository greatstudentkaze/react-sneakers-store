import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';

import './styles/index.scss';
import App from './components/app';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Scrollbars
        style={{ height: '100vh' }}
        autoHide
        autoHideTimeout={5000}
        autoHideDuration={300}
      >
        <App />
      </Scrollbars>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
