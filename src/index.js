import React from 'react';
import ReactDOM from 'react-dom/client';
import { TasksProvider } from "./contexts/TasksContext"
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Todo from './pages/Todo';
import Layout from './pages/Layout';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import Blog1 from './pages/Blog1';
import Blog2 from './pages/Blog2';
import NoPage from './pages/NoPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Todo />} />

          <Route path="blog" element={<Blog />}>
            <Route path="1" element={<Blog1 />} />
            <Route path="2" element={<Blog2 />} />
          </Route>

          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <TasksProvider>
    <App />
  </TasksProvider>
);
