import React from 'react';
import ReactDOM from 'react-dom/client';
import { TasksProvider } from "./contexts/TasksContext"
import { BlogsProvider } from './contexts/BlogsContext';
import { UsersProvider } from './contexts/UsersContext'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import PrivateRoute from './components/PrivateRoute';

import Todo from './pages/Todo';
import Layout from './pages/Layout';
import Contact from './pages/Contact';
import Blogs from './pages/Blogs';
import NoPage from './pages/NoPage';
import Users from './pages/Users';
import EditUser from './pages/EditUser';
import AddUser from './pages/AddUser';

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

          <Route element={<PrivateRoute />}>
            <Route path="user" element={<Users />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="user/adduser" element={<AddUser />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="user/:id" element={<EditUser />} />
          </Route>

          {/* TODO: make route for admin only */}


          {/* catch all invalid routing */}
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>

    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <BlogsProvider>
    <TasksProvider>
      <UsersProvider>
        <App />
      </UsersProvider>
    </TasksProvider>
  </BlogsProvider>
);
