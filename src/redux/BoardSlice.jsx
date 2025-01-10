import { createSlice } from "@reduxjs/toolkit";
import wordList from "../words.json";

const getRandomWord = () => {
  const words = wordList.words;
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
};

export const boardSlice = createSlice({
  name: "board",
  initialState: {
    board: Array(24).fill(""),
    pos: 0,
    row: 0,
    correctWord: getRandomWord(), // Chọn ngẫu nhiên một từ chính xác từ danh sách từ
    statuses: Array(24).fill(""),
  },
  reducers: {
    setBoard: (state, action) => {
      state.board = action.payload;
    },
    incPos: (state) => {
      state.pos += 1;
    },
    decPos: (state) => {
      state.pos -= 1;
    },
    incRow: (state) => {
      state.row += 1;
    },
    setStatus: (state, action) => {
      const { index, status } = action.payload;
      state.statuses[index] = status;
    },
    resetGame: (state) => {
      state.board = Array(24).fill("");
      state.pos = 0;
      state.row = 0;
      state.correctWord = getRandomWord();
      state.statuses = Array(24).fill("");
    },
  },
});

export const { setBoard, incPos, decPos, incRow, setStatus, resetGame } =
  boardSlice.actions;

export default boardSlice.reducer;
