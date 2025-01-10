import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
const Square = (props) => {
  const { val, squareIdx } = props;
  // Redux state
  const status = useSelector((state) => state.board.statuses[squareIdx]);

  const variants = {
    filled: {
      scale: [1.2, 1],
      transition: {
        duration: 0.2,
      },
    },
    unfilled: {
      scale: [1.2, 1],
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div animate={val ? "filled" : "unfilled"} variants={variants}>
      <div id="wordGame">
        <div
          style={{
            border: "1px solid blue",
          }}
          className={`square 
         ${status}`}
        >
          {val}
        </div>
      </div>
    </motion.div>
  );
};

export default Square;
