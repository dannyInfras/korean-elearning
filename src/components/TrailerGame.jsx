import React, { useEffect, useState } from "react";
import sadBoyImage from "../../assets/sadstory/sadboy.png";
import boyImage from "../../assets/sadstory/boy.png";
import studyingBoyImage from "../../assets/sadstory/girl.png";
import buddhaImage from "../../assets/sadstory/boy.png";
import gameImage from "../../assets/sadstory/boy.png";
import HighExamImage from "../../assets/sadstory/flower.png";
import LowExamImage from "../../assets/sadstory/flower.png";

export default function Scene() {
  const [lowExamStyles, setlowExamStyles] = useState("opacity-0 right-[-20%]");
  const [highExamStyles, sethighExamStyles] = useState(
    "opacity-0 right-[-20%]"
  );
  const [boySrc, setBoySrc] = useState(boyImage);
  const [buddhaVisible, setBuddhaVisible] = useState(false);
  const [gameVisible, setGameVisible] = useState(false);
  const [studyVisible, setStudyVisible] = useState(false);
  const [examVisible, setExamVisible] = useState(false);
  const [storyText, setStoryText] = useState("");
  const [boyStyle, setBoyStyle] = useState({ left: "10%", opacity: 1 });
  const [chatBoxOpacity, setChatBoxOpacity] = useState("opacity-0");

  useEffect(() => {
    setTimeout(() => {
      setStoryText("Cậu bé A");
    }, 1000);

    setTimeout(() => {
      setlowExamStyles("right-[58%] bottom-[20%] opacity-100");
    }, 1500);

    setTimeout(() => {
      setBoyStyle({ left: "30%", opacity: 1 });
    }, 2000);

    setTimeout(() => {
      setlowExamStyles("right-[58%] bottom-[20%] opacity-0");
      setStoryText("Nhận được bài kiểm tra và khóc");
      setBoySrc(sadBoyImage);
    }, 3000);

    setTimeout(() => {
      setStoryText("Ông Bụt hiện lên và nói:");
      setBuddhaVisible(true);
    }, 4000);

    setTimeout(() => {
      setChatBoxOpacity("opacity-100");
    }, 4500);

    setTimeout(() => {
      setBoyStyle({ left: "30%", opacity: 0 });
      setBuddhaVisible(false);
      setChatBoxOpacity("opacity-0");
    }, 6000);

    setTimeout(() => {
      setStoryText("Cậu bé chăm chỉ học tại...");
      setGameVisible(true);
    }, 7000);

    setTimeout(() => {
      setStoryText("Một thời gian sau ... ");
      setGameVisible(false);
      setBoySrc(boyImage);
      setBoyStyle({ opacity: 1 });
    }, 7500);

    setTimeout(() => {
      sethighExamStyles("right-[58%] bottom-[20%] opacity-100");
    }, 8500);

    setTimeout(() => {
      setStoryText("Cậu có một cuộc thi và đạt được điểm cao");
    }, 9000);
    setTimeout(() => {
      setBoyStyle({ left: "30%", opacity: 1 });
    }, 9500);
  }, []);

  return (
    <div className="relative w-[1500px] h-[800px] overflow-hidden bg-black">
      <div className="fixed top-0 left-0 w-full p-4 bg-white/70 backdrop-blur-md">
        {storyText}
      </div>
      <img
        src={boySrc}
        alt="Boy"
        className="absolute bottom-[10%] transition-all duration-2000 w-[15%]"
        style={boyStyle}
      />
      {buddhaVisible && (
        <img
          src={buddhaImage}
          alt="Buddha"
          className="absolute bottom-[10%] left-[45%] transition-all duration-2000 opacity-100 w-[15%]"
        />
      )}
      <div
        className={`absolute bottom-[50%] right-[35%] bg-white p-2.5 rounded-lg shadow-lg transition-all duration-2000 ${chatBoxOpacity}`}
      >
        Hãy học tại .....
      </div>
      <img
        src={LowExamImage}
        alt="Flower"
        className={`absolute transition-all duration-2000 ${lowExamStyles} w-[10%]`}
      />
      {gameVisible && (
        <img
          src={gameImage}
          alt="Game"
          className="absolute bottom-[30%] left-[50%] transition-all duration-2000 opacity-100 w-[15%]"
        />
      )}
      {studyVisible && (
        <img
          src={studyingBoyImage}
          alt="Studying"
          className="absolute bottom-[10%] left-[30%] transition-all duration-2000 opacity-100 w-[15%]"
        />
      )}
      <img
        src={HighExamImage}
        alt="Flower"
        className={`absolute transition-all duration-2000 ${highExamStyles} w-[10%]`}
      />
    </div>
  );
}
