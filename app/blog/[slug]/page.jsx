"use client";
import Loading from "@/components/Loading";
import { useEffect, useState } from "react";

const SingleProduct = ({ params }) => {
  const [singlePost, setSinglePost] = useState(null); // Initialize with null instead of an empty array

  useEffect(() => {
    fetch(`https://fakestoreapi.com/users/${params.slug}`)
      .then((res) => res.json())
      .then((data) => {
        setSinglePost(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching single post:", error);
      });
  }, [params.slug]);

  if (!singlePost) {
    return <Loading />;
  }

  return (
    <div>
      <h2>Single product</h2>
      <div>
        <h3>{singlePost.email}</h3>
        <h3>{singlePost.password}</h3>
      </div>
    </div>
  );
};

export default SingleProduct;
