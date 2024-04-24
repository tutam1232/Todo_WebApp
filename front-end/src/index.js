import React from 'react';
import ReactDOM from 'react-dom/client';
import { TasksProvider } from "./contexts/TasksContext"
import { BlogsProvider } from './contexts/BlogsContext';
import { BrowserRouter, Routes, Route } from "react-router-dom";


import Todo from './pages/Todo';
import Layout from './pages/Layout';
import Contact from './pages/Contact';
import Blogs from './pages/Blogs';
import NoPage from './pages/NoPage';

export default function App() {

  console.log("[App]")

  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Todo />} />
          <Route path="blog/*" element={<Blogs />}/>
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BlogsProvider>
    <TasksProvider>
      <App />
    </TasksProvider>
  </BlogsProvider>
);
