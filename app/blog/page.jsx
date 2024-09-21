"use client";

import Loading from "@/components/Loading";
import { useEffect, useState } from "react";

const Blog = () => {
  const blogUrl = "https://fakestoreapi.com/products";
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(blogUrl)
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <p>Oops Error: {error}</p>;
  }

  return (
    <div className="container px-10">
      <div>
        <h1 className="mt-5 text-xl font-semibold">Blog page.</h1>
      </div>
      <div className="mt-10 grid grid-cols-3 gap-5">
        {blogs.map((blog) => (
          <div className="bg-red-600" key={blog.id}>
            {blog.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
