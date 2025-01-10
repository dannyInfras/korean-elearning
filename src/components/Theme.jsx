import React, { useState } from "react";
import { springImg, summerImg, fallImg, winterImg } from "../assets";
import { useTheme } from "../ThemeContext";

const Theme = () => {
  const { season, setSeason } = useTheme();
  const handleClick = (season) => {
    setSeason(season);
  };

  return (
    <div className={`background ${season}-gradient`}>
      <img
        src={springImg}
        alt=""
        width={50}
        height={50}
        onClick={() => handleClick("spring")}
      />
      <img
        src={summerImg}
        alt=""
        width={50}
        height={50}
        onClick={() => handleClick("summer")}
      />
      <img
        src={fallImg}
        alt=""
        width={50}
        height={50}
        onClick={() => handleClick("fall")}
      />
      <img
        src={winterImg}
        alt=""
        width={50}
        height={50}
        onClick={() => handleClick("winter")}
      />
    </div>
  );
};

export default Theme;
