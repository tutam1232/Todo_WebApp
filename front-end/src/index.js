import React from 'react';
import ReactDOM from 'react-dom/client';
import { TasksProvider } from "./contexts/TasksContext"
import { BlogsProvider } from './contexts/BlogsContext';
import { UsersProvider } from './contexts/UsersContext'
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BlogsProvider>
    <TasksProvider>
      <UsersProvider>
        <App />
      </UsersProvider>
    </TasksProvider>
  </BlogsProvider>
);
