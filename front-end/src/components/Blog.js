import { useState, useEffect } from "react";
const API_URL = process.env.REACT_APP_API_URL

const Blog = ({ id }) => {
  console.log("[Blog]")
  const [blog, setBlog] = useState(null);

  const fetchBlog = async function (API_URL) {
    //fetch with method get
    let fetched_blog = await fetch(API_URL + '/getblogs/' + id.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    let fetched_blogJSON = await fetched_blog.json();

    if (fetched_blog.ok) {
      return fetched_blogJSON
    }

    //TODO: handle not ok
  }

  useEffect(() => {
    fetchBlog(API_URL).then(fetchedBlog => {
      setBlog(fetchedBlog[0]);
      console.log("fetched blog");
    });
  }, [id])

  return <h1 style={{ textAlign: "center", color: "white", marginTop: "2%" }}>{blog && blog.name }</h1>
};

export default Blog;