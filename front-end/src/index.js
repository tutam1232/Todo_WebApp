import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { TasksProvider } from "./contexts/TasksContext"
import { BlogsProvider } from './contexts/BlogsContext';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useBlogs, useBlogsDispatch } from './contexts/BlogsContext';

import Todo from './pages/Todo';
import Layout from './pages/Layout';
import Contact from './pages/Contact';
import Blogs from './pages/Blogs';
import Blog from './components/Blog';
import NoPage from './pages/NoPage';

const API_URL = 'https://662674f6052332d55322eed8.mockapi.io/getblog';

export default function App() {

  console.log("[App]")
  const dispatch = useBlogsDispatch();
  const blogs = useBlogs();

  const fetchBlogs = async function (API_URL) {
    const fetched_blog = await fetch(API_URL).then(res => res.json()).catch(err => console.log(err));
    dispatch({
      type: 'set_blogs',
      blogs: fetched_blog
    })
  }

  useEffect(() => {
    fetchBlogs(API_URL);
    console.log("fetched blogs")
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Todo />} />


          <Route path="blog" element={<Blogs />}>
            {blogs.map(blog => (
              <Route key={blog.id} path={blog.id} element={<Blog id={blog.id} />} />
            ))}
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
  <BlogsProvider>
    <TasksProvider>
      <App />
    </TasksProvider>
  </BlogsProvider>
);
