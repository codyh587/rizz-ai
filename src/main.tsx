import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import Example from './buttonexample.tsx';

window.global ||= window; // take care of Vite not defining window.global

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
        <Example />
    </React.StrictMode>
);
