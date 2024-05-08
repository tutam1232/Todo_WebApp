import { useState, useEffect } from "react";
import useLogout from "../hooks/useLogout";
import fetchService from "../services/fetchService";
import showErrorService from "../services/showErrorService";

const Blog = ({ id }) => {
  console.log("[Blog]")
  const [blog, setBlog] = useState(null);
  const logout = useLogout();


  useEffect(() => {

    const getData = async () => {
      console.log('fetch blog')
      let result = await fetchService('/getblogs/' + id.toString(), 'GET', null);

      if (result.ok) {
        let resultJSON = await result.json();
        setBlog(resultJSON);
      }

      else if (result.status === 401) {
        logout();
      }
      else {
        showErrorService(result);
      }
    }

    getData();
  }, [id])

  return <h1 style={{ textAlign: "center", color: "white", marginTop: "2%" }}>{blog && blog.name}</h1>
};

export default Blog;