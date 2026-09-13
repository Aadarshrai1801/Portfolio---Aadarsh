import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { TransitionProvider } from './context/TransitionContext';

// Authentic 144KB Original Portfolio Stylesheet
import './styles/styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <TransitionProvider>
        <App />
      </TransitionProvider>
    </BrowserRouter>
  </React.StrictMode>
);
