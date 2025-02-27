import React from "react";
import { formatDate } from "../utils/DateTimeFormat";
import { useNavigate } from "react-router";

export const BlogSideBar = ({blogs}) => {
    const navigate = useNavigate();
    return (
        <div className="max-h-[600px] overflow-y-auto md:block position-absolute">
        {blogs.map((blog, index) => (
          <div key={index} className="flex mb-4 cursor-pointer" onClick={() => navigate("/blog/"+blog._id)}>
            <img
              src={blog.image}
              alt={blog.title}
              className="w-16 h-16 rounded-md"
            />
            <div className="ml-2">
              <h3 className="text-sm font-bold">{blog.title}</h3>
              <p className="text-xs text-gray-500">🕒 {formatDate(blog.createdAt)}</p>
            </div>
          </div>
        ))}
      </div>
    );
}