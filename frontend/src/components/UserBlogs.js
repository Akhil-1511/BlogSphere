import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";

const UserBlogs = () => {
  const [user, setUser] = useState();
  const [error, setError] = useState(null);
  const id = localStorage.getItem("userId");

  const sendRequest = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/blog/user/${id}`);
      console.log("Full API Response:", res); 
      return res.data;
    } catch (err) {
      setError(err);
      console.log("API Request Error:", err);
    }
  };

  useEffect(() => {
    sendRequest().then((data) => {
      if (data && data.user) {
        setUser(data.user);
      } else {
        console.log("No user found or incorrect data structure:", data);
      }
    });
  }, []);

  console.log("User state:", user);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {user && user.blogs && user.blogs.length > 0 ? (
        user.blogs.map((blog, index) => (
          <Blog
            id={blog._id}
            key={index}
            isUser={true}
            title={blog.title}
            description={blog.description}
            imageURL={blog.image}
            username={blog.user.name}
          />
        ))
      ) : (
        <p>No blogs found</p>
      )}
    </div>
  );
};

export default UserBlogs;
