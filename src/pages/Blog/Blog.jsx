import React from "react";
import Navbar from "../../components/Navbar";
import { ListOfBlogs } from "../../components/ListOfBlogs";

export const Blog = () => {
  return (
    <>
      <div>
        <Navbar active="blog" />
        <ListOfBlogs />
      </div>
    </>
  );
};
