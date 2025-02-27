import React from "react";
import Navbar from "../../components/Navbar";
import { BlogDetail } from "../../components/BlogDetails";

export const BlogDetailPage = () => {
  return (
    <>
      <div>
        <Navbar active="blog" />
        <BlogDetail />
      </div>
    </>
  );
};
