import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'antd/dist/antd.css';
import { BrowserRouter } from 'react-router-dom'
import  {CookiesProvider} from 'react-cookie'

import { AuthProvider } from './context/AuthProvider';

ReactDOM.render(
  <BrowserRouter>
  <CookiesProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </CookiesProvider>
  </BrowserRouter>,
  document.getElementById('root')
);



