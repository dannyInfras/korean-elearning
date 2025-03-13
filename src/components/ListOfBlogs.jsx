import React, { useEffect, useState } from "react";
import { StarsCanvas } from "./canvas";
import { useTheme } from "../ThemeContext";
import { fetchBlogs } from "./api/BlogAPI";
import { BlogSideBar } from "./BlogSideBar";
import { formatDate } from "../utils/DateTimeFormat";
import { useNavigate } from "react-router";

export const blogList = async () => {
  try {
    const data = await fetchBlogs();
    console.log("Blogs:", data);
    return data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
};

const BlogList = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    blogList().then((data) => {
      if (data.length !== 0) setBlogs(data);
    });
  }, []);
  if (blogs.length === 0) return <p>Loading...</p>;

  const mainBlog = blogs[0];
  const smallBlogs = blogs.slice(1, 4);
  const sidebarBlogs = blogs.slice(4, blogs.length);

  return (
    <div
      className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4"
      style={{ marginTop: "50px" }}
    >
      <div className="col-span-1 md:col-span-2 lg:col-span-3">
        <div className="mb-4 cursor-pointer" onClick={() => navigate("/blog/"+mainBlog._id)}>
          <img
            src={mainBlog.image}
            alt={mainBlog.title}
            className="rounded-xl w-full h-[450px] md:h-[350px] object-cover"
          />
          <h2 className="text-xl md:text-2xl font-bold mt-2">
            {mainBlog.title}
          </h2>
          <p className="text-gray-500">🕒 {formatDate(mainBlog.createdAt)}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {smallBlogs.map((blog, index) => (
            <div key={index} className="cursor-pointer" onClick={() => navigate("/blog/"+blog._id)}>
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full rounded-lg h-[200px] md:h-[150px] object-cover"
              />
              <h3 className="text-sm font-bold mt-1">{blog.title}</h3>
            </div>
          ))}
        </div>
      </div>
      <BlogSideBar blogs={sidebarBlogs} />
    </div>
  );
};

export const ListOfBlogs = () => {
  const { season } = useTheme();
  return (
    <>
      <div
        className={`${season}-gradient z-0 min-h-screen relative overflow-y-auto`}
      >
        <StarsCanvas />

        <BlogList />
      </div>
    </>
  );
};
