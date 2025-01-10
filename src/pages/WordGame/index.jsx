import React from "react";
import { useSelector } from "react-redux";
import Heading from "../../components/Heading/Heading";
import Board from "../../components/Board/Board";
import ParticlesComponent from "../../components/Particles/Particles";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../ThemeContext";
import { Link } from "react-router-dom";
import "./styles.css";
const WordGame = () => {
  const { season } = useTheme();
  const board = useSelector((state) => state.board.board);

  return (
    <div id="wordGame" className={`w-full ${season}-gradient h-full relative`}>
      <div className="pt-8 h-screen flex overflow-hidden flex-col">
        {/* <Heading type="h1" text="Word guessing game" /> */}
        <Link to="/play">
          <button
            type="button"
            class=" flex items-center justify-center w-1/2 px-1 py-1 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto  hover:bg-gray-100   "
          >
            <svg
              class="w-3 h-3 rtl:rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
              />
            </svg>
            <span>Go back</span>
          </button>
        </Link>
        <div className="flex flex-wrap flex-col mt-6 items-center justify-center">
          <Board board={board} />
        </div>
      </div>
    </div>
  );
};

export default WordGame;
