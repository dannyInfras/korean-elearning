import React from "react";
import Key from "../Key/Key";
import { useSelector, useDispatch } from "react-redux";
import {
  decPos,
  incRow,
  setBoard,
  incPos,
  setStatus,
  resetGame,
} from "../../redux/BoardSlice";
import wordList from "../../words.json";
import Swal from "sweetalert2";
import winner from "../../assets/GameImage/winner.jpeg";
import error from "../../assets/GameImage/err.jpeg";

const rows = ["q w e r t y u i o p", "a s d f g h j k l", "z x c v b n m"];

const keyMap = {
  q: "ㅂ",
  w: "ㅈ",
  e: "ㄷ",
  r: "ㄱ",
  t: "ㅅ",
  y: "ㅛ",
  u: "ㅕ",
  i: "ㅑ",
  o: "ㅐ",
  p: "ㅔ",
  a: "ㅁ",
  s: "ㄴ",
  d: "ㅇ",
  f: "ㄹ",
  g: "ㅎ",
  h: "ㅗ",
  j: "ㅓ",
  k: "ㅏ",
  l: "ㅣ",
  z: "ㅋ",
  x: "ㅌ",
  c: "ㅊ",
  v: "ㅍ",
  b: "ㅠ",
  n: "ㅜ",
  m: "ㅡ",
};

const Keyboard = () => {
  const position = useSelector((state) => state.board.pos);
  const board = useSelector((state) => state.board.board);
  const row = useSelector((state) => state.board.row);
  const correctWord = useSelector((state) => state.board.correctWord);
  const dispatch = useDispatch();

  let allWords = wordList.words;
  let board4Words = `${board[position - 4]}${board[position - 3]}${
    board[position - 2]
  }${board[position - 1]}`.toLowerCase();

  const clickBack = () => {
    if (Math.floor((position - 1) / 4) < row) return;
    const newBoard = [...board];
    newBoard[position - 1] = "";
    dispatch(decPos());
    dispatch(setBoard(newBoard));
  };
  const hanleInva = () => {
    Swal.fire({
      title: "Error",
      text: "Oops! Something went wrong. Please try again.",
      imageUrl: error,
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Custom image",
    });
  };

  const clickEnter = () => {
    console.log("correct:", correctWord);
    if (position % 4 !== 0 || position === 0) return;

    if (!allWords.includes(board4Words)) {
      hanleInva();
      return;
    }

    // Check the word and set statuses
    for (let i = 0; i < 4; i++) {
      const index = position - 4 + i;
      const letter = board[index];
      const status =
        correctWord[i] === letter
          ? "correct"
          : correctWord.includes(letter)
          ? "almost"
          : "wrong";
      dispatch(setStatus({ index, status }));
    }
    const hanleWin = () => {
      Swal.fire({
        title: "Success",
        text: "Congratulations! You've won the game! Well done!",
        imageUrl: winner,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
      });
    };

    if (board4Words === correctWord) {
      // alert("Congratulations! You guessed the word!");
      dispatch(resetGame());
      hanleWin();
    } else {
      dispatch(incRow());
    }
  };

  const handleClick = (letter) => {
    if (position >= 24) return;
    const newBoard = [...board];
    newBoard[position] = keyMap[letter];
    dispatch(setBoard(newBoard));
    dispatch(incPos());
  };

  return (
    <div>
      {rows.map((row, rowIndex) => (
        <div className="flex justify-center text-center" key={rowIndex}>
          {rowIndex === 2 && (
            <span className="flex items-center" onClick={clickEnter}>
              Enter
            </span>
          )}
          {row.split(" ").map((letter, letterIndex) => (
            <div
              style={{ margin: "5px" }}
              className="flex items-center"
              key={letterIndex}
            >
              <Key
                letter={keyMap[letter]}
                onClick={() => handleClick(letter)}
              />
              {letter === "m" && <span onClick={clickBack}>Delete</span>}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
