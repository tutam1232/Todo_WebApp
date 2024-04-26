import { useState, useEffect } from "react";
const API_URL = process.env.REACT_APP_API_URL

const Blog = ({ id }) => {
  console.log("[Blog]")
  const [blog, setBlog] = useState(null);

  const fetchBlog = async function (API_URL) {
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
    else{
      throw new Error("fetch blog failed")
    }
  }

  useEffect(() => {
    fetchBlog(API_URL).then(fetchedBlog => {
      setBlog(fetchedBlog[0]);
      console.log("fetched blog");
    }).catch(err => {
      console.log(err)
    });
  }, [id])

  return <h1 style={{ textAlign: "center", color: "white", marginTop: "2%" }}>{blog && blog.name }</h1>
};

export default Blog;