"use client";
import Loading from "@/components/Loading";
import axios from "axios";
import { useEffect, useState } from "react";

const SingleNewPage = ({ params }) => {
  const [singlePost, setSinglePost] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(
          `http://localhost:5000/blood_api/${params.slug}`,
        );
        setSinglePost(res.data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message || "An unknown error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params.slug]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div>
        <p>Sorry for the bad request: {error}</p>
      </div>
    );
  }

  if (!singlePost || !singlePost.data) {
    // Check both singlePost and its data
    return (
      <div>
        <p>No data available</p>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h1>Single New Page</h1>
      </div>
      <div>
        <p key={singlePost._id}>{singlePost.data}</p>
      </div>
    </div>
  );
};

export default SingleNewPage;
