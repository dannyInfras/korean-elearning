import React, { useState } from "react";
import boyImage from "../../assets/sadstory/boy.png";
import girlImage from "../../assets/sadstory/girl.png";
import sadBoyImage from "../../assets/sadstory/sadboy.png";
import flowerImage from "../../assets/sadstory/flower.png";
import gameImage from "../../assets/sadstory/gameImage.png";
import { useTheme } from "../../ThemeContext";

export default function Scene() {
  const [boySrc, setBoySrc] = useState(boyImage);
  const [flowerStyles, setFlowerStyles] = useState("opacity-0 left-[-20%]");
  const [chatBoxOpacity, setChatBoxOpacity] = useState("opacity-0");
  const [chatBox2Opacity, setChatBox2Opacity] = useState("opacity-0");
  const [chatBox3Opacity, setChatBox3Opacity] = useState("opacity-0");
  const [girlRight, setGirlRight] = useState("right-[-100%]");
  const [boyLeft, setBoyLeft] = useState("left-[10%]");
  const [boyOpacity, setBoyOpacity] = useState("opacity-100");
  const [storyText, setStoryText] = useState(
    "Phương là sinh viên chuyên ngành Nodejs..."
  );
  const [gameImageOpacity, setGameImageOpacity] = useState("opacity-0");
  const [step, setStep] = useState(0);

  const handleSkip = () => {
    window.location.href = "/trailer";
  };

  const handleNext = () => {
    switch (step) {
      case 0:
        setStoryText(
          "Một ngày nọ Phương gặp một bạn nữ sinh đẹp và tài năng..."
        );
        break;
      case 1:
        setGirlRight("right-[30%]");
        break;
      case 2:
        setBoyLeft("left-[30%]");
        setStoryText(
          "Sau một thời gian, Phương sử dụng khả năng tìm kiếm của một developer..."
        );
        break;
      case 3:
        setStoryText(
          "Phương đã tìm được thông tin của bạn nữ và biết bạn đang học chuyên ngành Brse Hàn Quốc..."
        );
        break;
      case 4:
        setStoryText("Phương đã lấy hết can đảm để tỏ tình...");
        setChatBoxOpacity("opacity-100");
        setFlowerStyles("left-[55%] bottom-[20%] opacity-100");
        break;
      case 5:
        setChatBoxOpacity("opacity-0");
        setChatBox2Opacity("opacity-100");
        setStoryText("Cô gái nói...");
        break;
      case 6:
        setChatBox2Opacity("opacity-0");
        setChatBox3Opacity("opacity-100");
        break;
      case 7:
        setGirlRight("right-[-100%]");
        setChatBox3Opacity("opacity-0");
        setFlowerStyles("left-[55%] bottom-[10%] opacity-0");
        setStoryText(
          "Phương nghe xong buồn và quyết tâm sẽ master tiếng Hàn..."
        );
        setBoySrc(sadBoyImage);
        break;
      case 8:
        setStoryText(
          "Phương quyết tâm sẽ master tiếng Hàn và hiểu văn hóa của Hàn Quốc thông qua game của Phương tự dev..."
        );
        setBoyLeft("left-[100%]");
        setBoyOpacity("opacity-0");
        setGameImageOpacity("opacity-100"); // Show the game image
        break;
      case 9:
        window.location.href = "/trailer";
        break;
      default:
        break;
    }
    setStep(step + 1);
  };
  const { season } = useTheme();
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
        className={`absolute bottom-[10%] transition-all duration-2000 ${boyLeft} ${boyOpacity} w-[15%]`}
      />
      <img
        src={girlImage}
        alt="Girl"
        className={`absolute bottom-[10%] transition-all duration-2000 ${girlRight} w-[15%]`}
      />
      <img
        src={flowerImage}
        alt="Flower"
        className={`absolute transition-all duration-2000 ${flowerStyles} w-[10%]`}
      />
      <div
        className={`absolute bottom-[50%] left-[45%] bg-white p-2.5 rounded-lg shadow-lg transition-all duration-2000 ${chatBoxOpacity}`}
      >
        Cậu đồng ý làm ny tớ nhé?
      </div>
      <div
        className={`absolute bottom-[50%] left-[45%] bg-white p-2.5 rounded-lg shadow-lg transition-all duration-2000 ${chatBox2Opacity}`}
      >
        Cậu rất tốt nhưng tiếng Hàn cậu kém...
      </div>
      <div
        className={`absolute bottom-[50%] left-[45%] bg-white p-2.5 rounded-lg shadow-lg transition-all duration-2000 ${chatBox3Opacity}`}
      >
        Khi nào cậu master tiếng Hàn thì hãy nghĩ đến chuyện này...
      </div>
      <img
        src={gameImage}
        alt="Game"
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-2000 ${gameImageOpacity} w-[80%]`}
      />
    </div>
  );
}

// import React, { useState } from 'react';
// import sadBoyImage from '../../assets/sadstory/sadboy.png';
// import boyImage from '../../assets/sadstory/boy.png';
// import studyingBoyImage from '../../assets/sadstory/girl.png';
// import buddhaImage from '../../assets/sadstory/but.png';
// import gameImage from '../../assets/sadstory/boy.png';
// import HighExamImage from '../../assets/sadstory/highTest.png';
// import LowExamImage from '../../assets/sadstory/lowTest.png';

// export default function Scene() {
//   const [lowExamStyles, setLowExamStyles] = useState('opacity-0 right-[-20%]');
//   const [highExamStyles, setHighExamStyles] = useState('opacity-0 right-[-20%]');
//   const [boySrc, setBoySrc] = useState(boyImage);
//   const [buddhaVisible, setBuddhaVisible] = useState(false);
//   const [gameVisible, setGameVisible] = useState(false);
//   const [studyVisible, setStudyVisible] = useState(false);
//   const [examVisible, setExamVisible] = useState(false);
//   const [storyText, setStoryText] = useState('Cậu bé A');
//   const [boyStyle, setBoyStyle] = useState({ left: '10%', opacity: 1 });
//   const [chatBoxMessage, setChatBoxMessage] = useState('');
//   const [chatBoxOpacity, setChatBoxOpacity] = useState('opacity-0');
//   const [chatBoxPosition, setChatBoxPosition] = useState({ bottom: 'auto', left: 'auto' });
//   const [step, setStep] = useState(0);

//   const handleNext = () => {
//     switch (step) {
//       case 0:
//         setLowExamStyles('right-[58%] bottom-[20%] opacity-100');
//         break;
//       case 1:
//         setBoyStyle({ left: '30%', opacity: 1 });
//         break;
//       case 2:
//         setLowExamStyles('right-[58%] bottom-[20%] opacity-0');
//         setStoryText('Nhận được bài kiểm tra và khóc');
//         setBoySrc(sadBoyImage);
//         break;
//       case 3:
//         setStoryText('Ông Bụt hiện lên và nói:');
//         setBuddhaVisible(true);
//         break;
//       case 4:
//         setChatBoxMessage('Tại sao con khóc?');
//         setChatBoxPosition({ bottom: '50%', left: '55%' });
//         setChatBoxOpacity('opacity-100');
//         break;
//       case 5:
//         setChatBoxOpacity('opacity-0');
//         break;
//       case 6:
//         setChatBoxMessage('Con bị điểm thấp');
//         setChatBoxPosition({ bottom: '50%', left: '20%' });
//         setChatBoxOpacity('opacity-100');
//         break;
//       case 7:
//         setChatBoxOpacity('opacity-0');
//         break;
//       case 8:
//         setChatBoxMessage('Vậy con hãy học tại ...');
//         setChatBoxPosition({ bottom: '50%', left: '55%' });
//         setChatBoxOpacity('opacity-100');
//         break;
//       case 9:
//         setBoyStyle({ left: '30%', opacity: 0 });
//         setBuddhaVisible(false);
//         setChatBoxOpacity('opacity-0');
//         break;
//       case 10:
//         setStoryText('Cậu bé chăm chỉ học tại...');
//         setGameVisible(true);
//         break;
//       case 11:
//         setStoryText('Một thời gian sau ... ');
//         setGameVisible(false);
//         setBoySrc(boyImage);
//         setBoyStyle({ opacity: 1 });
//         break;
//       case 12:
//         setHighExamStyles('right-[58%] bottom-[20%] opacity-100');
//         break;
//       case 13:
//         setStoryText('Cậu có một cuộc thi và đạt được điểm cao');
//         break;
//       case 14:
//         setBoyStyle({ left: '30%', opacity: 1 });
//         break;
//         case 15:
//         window.location.href = "/trailer";
//         break;
//       default:
//         break;
//     }
//     setStep(step + 1);
//   };

//   return (
//     <div className="relative w-[1500px] h-[800px] overflow-hidden bg-black">
//       <div className="fixed top-0 left-0 w-full p-4 bg-white/70 backdrop-blur-md flex justify-between items-center">
//         <div>{storyText}</div>
//         <button onClick={handleNext} className="bg-blue-500 text-white p-2 rounded">Next</button>
//       </div>
//       <img src={boySrc} alt='Boy' className="absolute bottom-[10%] transition-all duration-2000 w-[15%]" style={boyStyle} />
//       {buddhaVisible && <img src={buddhaImage} alt='Buddha' className="absolute bottom-[10%] left-[45%] transition-all duration-2000 opacity-100 w-[30%]" />}
//       <div className={`absolute bg-white p-2.5 rounded-lg shadow-lg transition-all duration-2000 ${chatBoxOpacity}`} style={chatBoxPosition}>{chatBoxMessage}</div>
//       <img src={LowExamImage} alt='Low Exam' className={`absolute transition-all duration-2000 ${lowExamStyles} w-[5%]`} />
//       {gameVisible && <img src={gameImage} alt='Game' className="absolute bottom-[30%] left-[50%] transition-all duration-2000 opacity-100 w-[15%]" />}
//       {studyVisible && <img src={studyingBoyImage} alt='Studying' className="absolute bottom-[10%] left-[30%] transition-all duration-2000 opacity-100 w-[15%]" />}
//       <img src={HighExamImage} alt='High Exam' className={`absolute transition-all duration-2000 ${highExamStyles} w-[5%]`} />
//     </div>
//   );
// }
