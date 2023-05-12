import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
//redux
import { Provider } from "react-redux";
import { store } from './components/reducers/store'
//route
import {BrowserRouter} from "react-router-dom"

// import 'antd/dist/antd.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

