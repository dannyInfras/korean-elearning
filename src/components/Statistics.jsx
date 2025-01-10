import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useTheme } from "../ThemeContext";

const Statistics = ({ feedbackCount, visited }) => {
  const [_, setVisited] = useState(0);
  const [feedback, setFeedback] = useState(0);
  const { season } = useTheme();

  const visitedProps = useSpring({
    from: { number: 1 },
    to: { number: visited },
    config: { duration: 1000 },
    reset: true,
  });
  const feedbackProps = useSpring({
    from: { number: 1 },
    to: { number: feedbackCount },
    config: { duration: 1000 },
    reset: true,
  });

  return (
    <>
      <button
        className={`${season}-bottom-text flex gap-2 justify-center items-center`}
        onClick={() => setVisited(visited)}
        style={{
          padding: "10px 20px",
          border: "none",
          cursor: "pointer",
        }}
      >
        <animated.span className="font-bold text-4xl">
          {visitedProps.number.to((n) => Math.floor(n))}
        </animated.span>
        <p className="flex flex-col text-sm">
          <span className=" text-sm">visited the</span>
          <span className=" text-sm"> website</span>
        </p>
      </button>
      <button
        className={`  ${season}-bottom-text flex gap-2 justify-center items-center`}
        onClick={() => setFeedback(feedbackCount)}
        style={{
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        <animated.span className="font-bold text-4xl ">
          {feedbackProps.number.to((n) => Math.floor(n))}
        </animated.span>{" "}
        <p className={` flex flex-col text-sm items-center justify-center`}>
          <span className=" text-sm">gave</span>
          <span className=" text-sm"> feedback</span>
        </p>
      </button>
    </>
  );
};

export default Statistics;
