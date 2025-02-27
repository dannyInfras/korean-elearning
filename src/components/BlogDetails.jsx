import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { StarsCanvas } from "./canvas";
import { useTheme } from "../ThemeContext";
import { BlogSideBar } from "./BlogSideBar";
import { formatDate } from "../utils/DateTimeFormat";
import { blogList } from "./ListOfBlogs";

const Detail = () => {
  const { id } = useParams();
  const [mainBlog, setMainBlog] = useState(null);
  const [otherBlogs, setOtherBlogs] = useState([]);

  useEffect(() => {
    blogList().then((data) => {
      if (data.length !== 0) {
        setMainBlog(data.find((blog) => blog._id === id));
        setOtherBlogs(data.filter((blog) => blog._id !== id));
      }
    });
  }, [id]);

  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 mt-12">
      {mainBlog && (
        <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-white p-6 shadow-lg rounded-xl">
          <img
            src={mainBlog.image}
            alt={mainBlog.title}
            className="w-full h-100 object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
          />
          <h2 className="text-3xl font-bold text-gray-800 mt-4">
            {mainBlog.title}
          </h2>
          <p className="text-gray-600 text-sm mt-2">
            🕒 {formatDate(mainBlog.createdAt)}
          </p>
          <div className="mt-4 text-lg text-gray-700 leading-relaxed">
            {mainBlog.content}
          </div>
        </div>
      )}

      <BlogSideBar blogs={otherBlogs} />
    </div>
  );
};

export const BlogDetail = () => {
  const { season } = useTheme();
  return (
    <div className={`${season}-gradient z-0 min-h-screen relative overflow-y-auto`}>
      <StarsCanvas />
      <Detail />
    </div>
  );
};
