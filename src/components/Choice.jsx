/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import hoverSound from "../assets/mp3/hoverSound.mp3";
import { useTheme } from "../ThemeContext";
import { useSound } from "../SoundCotext";
import workHoverSound from "../assets/mp3/workSound.mp3";
import gameClick from "../assets/mp3/gameClick.mp3";
import { Link } from "react-router-dom";
const Choice = () => {
  const { isSoundEnabled } = useSound();
  const { season } = useTheme();

  const hoverUrl = useRef(new Audio(hoverSound));
  const clickAudioRef = useRef(new Audio(workHoverSound));
  const gameClickRef = useRef(new Audio(gameClick));

  const [hoverButton, setHoverButton] = useState(false);
  const [workHover, setWorkHover] = useState(false);
  const [playHover, setPlayHover] = useState(false);

  const playHoverSound = (audioRef) => {
    if (audioRef.current && isSoundEnabled) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((e) => {
        console.error("Sound play failed: ", e);
      });
    }
  };

  useEffect(() => {
    if (workHover) {
      playHoverSound(clickAudioRef);
    }
  }, [workHover]);

  useEffect(() => {
    if (playHover) {
      playHoverSound(gameClickRef);
    }
  }, [playHover]);

  useEffect(() => {
    if (hoverButton) {
      playHoverSound(hoverUrl);
    }
  }, [hoverButton]);
  return (
    <>
      <p
        className={
          workHover
            ? `text-xs italic ${season}-button-gradient-left-text max-md:hidden`
            : playHover
            ? `text-xs italic ${season}-button-gradient-right-text max-md:hidden`
            : `text-xs italic ${season}-button-gradient-none-text max-md:hidden`
        }
      >
        Choose the method you want to choose to learn
      </p>

      <div className="flex gap-8 justify-center ">
        <Link to="/learn">
          <button
            className={`${season}-button-gradient-left-hover ${season}-animated-button w-max pl-1 pr-1 border-2 border-pink-50 rounded-md cursor-pointer transition ease-in-out delay-150 ${season}-button-gradient-left-text text-base max-md:text-md `}
            onMouseEnter={() => setWorkHover(true)}
            onMouseLeave={() => setWorkHover(false)}
          >
            WORK HARD
          </button>
        </Link>
        <Link to="/play">
          <button
            className={`${season}-button-gradient-right-hover ${season}-animated-button w-max pl-1 pr-1 border-2 border-pink-50 rounded-md cursor-pointer transition ease-in-out delay-150 ${season}-button-gradient-right-text text-base max-md:text-md`}
            onMouseEnter={() => setPlayHover(true)}
            onMouseLeave={() => setPlayHover(false)}
          >
            PLAY HARD
          </button>
        </Link>
      </div>

      {playHover && (
        <span
          className={`${season}-button-gradient-left-note work-text opacity-100 absolute mt-24 max-md:hidden`}
          style={{ fontSize: "12px" }}
        >
          You can learn the Korean alphabet with Games
        </span>
      )}

      {workHover && (
        <span
          className={`${season}-button-gradient-left-note work-text opacity-100 absolute mt-24 max-md:hidden`}
          style={{ fontSize: "12px" }}
        >
          You can learn the Korean alphabet with Cards
        </span>
      )}
    </>
  );
};

export default Choice;
