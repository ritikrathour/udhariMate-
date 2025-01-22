import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux';
import { Store } from './ReduxStore/Store.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from "react-hot-toast"
import React from 'react';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={Store}>
        <Toaster toastOptions={{
          style: {
            paddingTop: "4px",
            paddingBottom: "4px",
            background: "rgb(0,0,0)",
            color: "#fff",
            fontSize: '15px',
            border: "1px solid #333",
            textAlign: "center"
          }
        }} />
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
)
