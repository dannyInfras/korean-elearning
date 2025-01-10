import React from "react";
import Navbar from "../../components/Navbar";
import Slider from "../../components/Game/Slider";
import "../PlayHard/styles.css";
function PlayHard() {
  return (
    <>
      <Navbar active="play" />
      <div id="wrapper">
        <Slider />
      </div>
    </>
  );
}

export default PlayHard;
