import React, { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import {
  alphabet,
  fallAlphabet,
  springAlphabet,
  summerAlphabet,
} from "../assets";
import paperMp3 from "../assets/mp3/paper.mp3";
import StarsCanvas from "./canvas/Stars";
import { useSound } from "../SoundCotext";
import { useTheme } from "../ThemeContext";
import { Link } from "react-router-dom";

const SeasonalElements = () => {
  const { season } = useTheme();
  switch (season) {
    case "spring":
    case "summer":
    case "fall":
    case "winter":
    default:
      return null;
  }
};

const HomeStudy = () => {
  const { season } = useTheme();
  const audioRef = useRef(new Audio(paperMp3));
  const { isSoundEnabled } = useSound();

  const playHoverSound = () => {
    if (audioRef.current && isSoundEnabled) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((error) => {
        console.error("Sound play failed: ", error);
      });
    }
  };

  return (
    <div className="overflow-hidden h-screen w-screen">
      <StarsCanvas />
      <Link to="/alphabet">
        <div
          className={`${season}-gradient h-lvh flex items-center justify-center`}
          onClick={playHoverSound}
        >
          <div
            className={`border-solid border-2 overflow-hidden rounded-xl max-w-xs shadow-lg ${
              season === "spring"
                ? "shadow-pink-500/50"
                : season === "summer"
                ? "shadow-white-500"
                : season === "fall"
                ? "shadow-yellow-500/50"
                : season === "winter"
                ? "shadow-white-500/50"
                : ""
            }`}
          >
            <div className="w-full overflow-hidden flex items-center justify-center h-full">
              <img
                src={
                  season === "spring"
                    ? springAlphabet
                    : season === "summer"
                    ? summerAlphabet
                    : season === "fall"
                    ? fallAlphabet
                    : alphabet
                }
                alt="Alphabet"
                className="object-contain w-full h-full"
              />
            </div>
            <div className="p-4">
              <div className="tracking-wide text-sm">Card Alphabet</div>
              <h1
                className={`block mt-1 text-lg leading-tight font-medium uppercase ${season}-top-text cursor-pointer text-center font-semibold hover:underline`}
              >
                Learn the Alphabet
              </h1>
              <p className="mt-2 text-slate-500 text-wrap text-justify">
                Explore our alphabet cards to get familiar with the letters, how
                to write them, and how to memorize them.
              </p>
            </div>
          </div>
        </div>
      </Link>

      <Canvas>
        <Suspense fallback={null}>
          <SeasonalElements />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HomeStudy;
