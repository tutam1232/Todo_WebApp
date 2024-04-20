import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { TasksProvider } from "./contexts/TasksContext"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <TasksProvider>
    <App />
  </TasksProvider>
);
