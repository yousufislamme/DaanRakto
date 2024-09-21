"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";

const NewPost = () => {
  const [inputData, setInputData] = useState("");

  // Handling input change
  const handleInputChange = (e) => {
    const inputResult = e.target.value;
    setInputData(inputResult); // Update state when input changes
  };

  // Handling form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the page from reloading on form submit

    try {
      // Sending POST request with the input data
      const res = await axios.post("http://localhost:5000/blood_api", {
        data: inputData,
      });
      console.log("Response:", res.data); // Handle success
    } catch (error) {
      console.log("Error:", error); // Handle error
    }
  };

  return (
    <div>
      <h1>New Post</h1>

      <div>
        <form onSubmit={handleSubmit} method="post">
          {/* Handle input change here */}
          <Input
            type="input"
            className="border-white"
            value={inputData}
            onChange={handleInputChange}
          />
          <Button size="sm" type="submit">
            Post
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NewPost;
