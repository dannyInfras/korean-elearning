import React, { useState } from "react";
import sadBoyImage from "../../assets/sadstory/sadboy.png";
import boyImage from "../../assets/sadstory/boy.png";
import studyingBoyImage from "../../assets/sadstory/girl.png";
import buddhaImage from "../../assets/sadstory/but.png";
import gameImage from "../../assets/sadstory/boy.png";
import HighExamImage from "../../assets/sadstory/highTest.png";
import LowExamImage from "../../assets/sadstory/lowTest.png";
import { useTheme } from "../../ThemeContext";

export default function Scene() {
  const [lowExamStyles, setLowExamStyles] = useState("opacity-0 right-[-20%]");
  const [highExamStyles, setHighExamStyles] = useState(
    "opacity-0 right-[-20%]"
  );
  const [boySrc, setBoySrc] = useState(boyImage);
  const [buddhaVisible, setBuddhaVisible] = useState(false);
  const [gameVisible, setGameVisible] = useState(false);
  const [studyVisible, setStudyVisible] = useState(false);
  const [examVisible, setExamVisible] = useState(false);
  const [storyText, setStoryText] = useState("Cậu bé A");
  const [boyStyle, setBoyStyle] = useState({ left: "10%", opacity: 1 });
  const [chatBoxMessage, setChatBoxMessage] = useState("");

  const [chatBoxOpacity, setChatBoxOpacity] = useState("opacity-0");
  const [chatBoxPosition, setChatBoxPosition] = useState({
    bottom: "auto",
    left: "auto",
  });
  const { season } = useTheme();
  const [step, setStep] = useState(0);
  const handleSkip = () => {
    window.location.href = "/wordgame";
  };

  const handleNext = () => {
    switch (step) {
      case 0:
        setLowExamStyles("right-[58%] bottom-[20%] opacity-100");
        break;
      case 1:
        setBoyStyle({ left: "30%", opacity: 1 });
        break;
      case 2:
        setLowExamStyles("right-[58%] bottom-[20%] opacity-0");
        setStoryText("Nhận được bài kiểm tra và khóc");
        setBoySrc(sadBoyImage);
        break;
      case 3:
        setStoryText("Ông Bụt hiện lên và nói:");
        setBuddhaVisible(true);
        break;
      case 4:
        setChatBoxMessage("Tại sao con khóc ?");
        setChatBoxPosition({ bottom: "50%", left: "55%" });
        setChatBoxOpacity("opacity-100");
        break;
      case 5:
        setChatBoxOpacity("opacity-0");
        break;
      case 6:
        setChatBoxMessage("Con bị điểm thấp");
        setChatBoxPosition({ bottom: "50%", left: "20%" });
        setChatBoxOpacity("opacity-100");
        break;
      case 7:
        setChatBoxOpacity("opacity-0");
        break;
      case 8:
        setChatBoxMessage("Vậy con hãy học tại Hangul & Happy");
        setChatBoxPosition({ bottom: "50%", left: "55%" });
        setChatBoxOpacity("opacity-100");
        break;
      case 9:
        setBoyStyle({ left: "30%", opacity: 0 });
        setBuddhaVisible(false);
        setChatBoxOpacity("opacity-0");
        break;
      case 10:
        setStoryText("Cậu bé chăm chỉ học tại ");
        setGameVisible(true);
        break;
      case 11:
        setStoryText("Một thời gian sau ... ");
        setGameVisible(false);
        setBoySrc(boyImage);
        setBoyStyle({ opacity: 1 });
        break;
      case 12:
        setHighExamStyles("right-[58%] bottom-[20%] opacity-100");
        break;
      case 13:
        setStoryText("Cậu có một cuộc thi và đạt được điểm cao");
        break;
      case 14:
        setBoyStyle({ left: "30%", opacity: 1 });
        break;
      case 15:
        window.location.href = "/wordgame";
        break;
      default:
        break;
    }
    setStep(step + 1);
  };

  return (
    <div
      className={` ${season}-gradient relative w-full h-full overflow-hidden  `}
    >
      <div className="fixed top-0 left-0 w-full p-4 bg-white/70 backdrop-blur-md flex justify-between items-center">
        <div>{storyText}</div>
        <div>
          <button
            onClick={handleNext}
            className="bg-blue-500 text-white p-2 rounded mr-2"
          >
            Next
          </button>
          <button
            onClick={handleSkip}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Skip
          </button>
        </div>
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
          className="absolute bottom-[10%] left-[45%] transition-all duration-2000 opacity-100 w-[30%]"
        />
      )}
      <div
        className={`absolute bg-white p-2.5 rounded-lg shadow-lg transition-all duration-2000 ${chatBoxOpacity}`}
        style={chatBoxPosition}
      >
        {chatBoxMessage}
      </div>
      <img
        src={LowExamImage}
        alt="Low Exam"
        className={`absolute transition-all duration-2000 ${lowExamStyles} w-[5%]`}
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
        alt="High Exam"
        className={`absolute transition-all duration-2000 ${highExamStyles} w-[5%]`}
      />
    </div>
  );
}
