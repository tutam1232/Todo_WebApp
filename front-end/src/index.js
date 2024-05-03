import React from 'react';
import ReactDOM from 'react-dom/client';
import { TasksProvider } from "./contexts/TasksContext"
import { BlogsProvider } from './contexts/BlogsContext';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import PrivateRoute from './components/PrivateRoute';

import Todo from './pages/Todo';
import Layout from './pages/Layout';
import Contact from './pages/Contact';
import Blogs from './pages/Blogs';
import NoPage from './pages/NoPage';

import Register from './pages/Register';
import Login from './pages/Login';

export default function App() {

  console.log("[App]")


  return (
    <BrowserRouter>
      <Routes>

        {/* public route */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* private route */}

        <Route path="/" element={<Layout />}>


          <Route element={<PrivateRoute />}>
            <Route index element={<Todo />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="blog/*" element={<Blogs />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="contact" element={<Contact />} />
          </Route>


          {/* catch all invalid routing */}
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
