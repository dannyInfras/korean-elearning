import React from "react";
import Square from "../Square/Square";
import Keyboard from "../Keyboard/Keyboard";

const Board = (props) => {
  const { board } = props;
  return (
    <>
      <div className="h-72 w-72 self-center justify-center grid grid-cols-4 gap-1 mb-8 text-white">
        {board.map((square, idx) => {
          return (
            <div key={idx}>
              <Square val={square} squareIdx={idx} />
            </div>
          );
        })}
      </div>
      <div className="mt-[55px]">
        <Keyboard />
      </div>
    </>
  );
};

export default Board;
