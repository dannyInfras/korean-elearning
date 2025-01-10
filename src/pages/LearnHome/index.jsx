import React from "react";
import HomeStudy from "../../components/HomeStudy";
import Navbar from "../../components/Navbar";

const LearnHome = () => {
  return (
    <>
      <div
      // initial={{
      //   x: "-100vw",
      //   opacity: 0,
      // }}
      // animate={{
      //   x: 0,
      //   opacity: 1,
      // }}
      // transition={{
      //   transition: 0.5,
      // }}
      // exit={{ y: "-100vh" }}
      >
        <Navbar active="work" />
        <HomeStudy />
      </div>
    </>
  );
};

export default LearnHome;
