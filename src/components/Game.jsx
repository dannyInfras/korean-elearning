import React, { useState, useEffect, useRef } from "react";
import useInterval from "../hooks/useInterval";

import springBg from "../assets/Spring/Spring.jpg";
import summerBg from "../assets/Summer/Summer.jpg";
import fallBg from "../assets/Fall/Fall.jpg";
import winterBg from "../assets/winter/Winter.jpg";

import cherryBlossom from "../assets/Spring/cherry-blossom.png";
import kimbap from "../assets/Spring/kimbap.png";
import bikimbap from "../assets/Spring/bibimbap.png";

import fireworks from "../assets/Summer/fireworks.png";
import music from "../assets/Summer/music.png";
import patbingsu from "../assets/Summer/patbingsu.png";

import hanok from "../assets/Fall/hanok.png";
import mapLeaf from "../assets/Fall/maple-leaf.png";
import skyLantern from "../assets/Fall/sky-lantern.png";

import skiing from "../assets/winter/skiing.png";
import soju from "../assets/winter/soju.png";
import tteokbokki from "../assets/winter/tteokbokki.png";

import menu from "../assets/menu.png";

import soundCorrectEffect from "../assets/mp3/correctAnswer.mp3";
import soundWrongEffect from "../assets/mp3/wrongAnswer.mp3";
import soundBackgroundEffect from "../assets/mp3/gameBackground.mp3";
import soundNextLevelEffect from "../assets/mp3/nextLevel.mp3";
import soundFailureEffect from "../assets/mp3/failure.mp3";

import { Howl } from "howler";
import { StarsCanvas } from "../components/canvas";
import { useTheme } from "../ThemeContext";

const Game = () => {
  const canvasRef = useRef(null);
  const containLetterRef = useRef(null);
  const [score, setScore] = useState(0);
  const [health, setHealth] = useState(100);
  const [isPaused, setIsPaused] = useState(false);
  const [balls, setBalls] = useState([]);
  const [isEnd, setIsEnd] = useState(false);
  const [isOnSupport, setIsOnSupport] = useState(false);
  const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);
  const [backgroundMusic, setBackgroundMusic] = useState(null);
  const { season, setSeason } = useTheme();

  const backgrounds = [springBg, summerBg, fallBg, winterBg];
  const outsidebackgrounds = ["spring", "summer", "fall", "winter"];
  const ballImages = {
    [springBg]: [cherryBlossom, kimbap, bikimbap],
    [summerBg]: [fireworks, music, patbingsu],
    [fallBg]: [hanok, mapLeaf, skyLantern],
    [winterBg]: [skiing, soju, tteokbokki],
  };

  const koreanKeyMap = {
    ㅂ: "Q",
    ㅈ: "W",
    ㄷ: "E",
    ㄱ: "R",
    ㅅ: "T",
    ㅛ: "Y",
    ㅕ: "U",
    ㅑ: "I",
    ㅐ: "O",
    ㅔ: "P",
    ㅁ: "A",
    ㄴ: "S",
    ㅇ: "D",
    ㄹ: "F",
    ㅎ: "G",
    ㅗ: "H",
    ㅓ: "J",
    ㅏ: "K",
    ㅣ: "L",
    ㅋ: "Z",
    ㅌ: "X",
    ㅊ: "C",
    ㅍ: "V",
    ㅠ: "B",
    ㅜ: "N",
    ㅡ: "M",
  };

  const playCorrectSound = () => {
    const correctSound = new Howl({
      src: [soundCorrectEffect],
      volume: 0.2,
      onend: function () {
        console.log("Finished playing the correct sound");
      },
    });
    correctSound.play();
  };

  const playWrongSound = () => {
    const wrongSound = new Howl({
      src: [soundWrongEffect],
      volume: 0.2,
      onend: function () {
        console.log("Finished playing the wrong sound");
      },
    });
    wrongSound.play();
  };

  const playNextLevelSound = () => {
    const NextLevelSound = new Howl({
      src: [soundNextLevelEffect],
      volume: 0.4,
      onend: function () {
        console.log("Finished playing the wrong sound");
      },
    });
    NextLevelSound.play();
  };

  const playFailureSound = () => {
    const FailureSound = new Howl({
      src: [soundFailureEffect],
      volume: 0.4,
      onend: function () {
        console.log("Finished playing the wrong sound");
      },
    });
    FailureSound.play();
  };

  useEffect(() => {
    const backgroundMusic = new Howl({
      src: [soundBackgroundEffect],
      loop: true,
      volume: 0.1, // Set initial volume
    });
    backgroundMusic.play();
    setBackgroundMusic(backgroundMusic);

    return () => {
      // Stop the music when the component unmounts
      backgroundMusic.stop();
    };
  }, []);

  useEffect(() => {
    if (backgroundMusic) {
      if (isPaused) {
        backgroundMusic.pause();
      } else {
        backgroundMusic.play();
      }
    }
  }, [isPaused, backgroundMusic]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const drawBackground = () => {
      const bg = new Image();
      bg.src = backgrounds[currentBackgroundIndex];
      setSeason(outsidebackgrounds[currentBackgroundIndex]);
      ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
    };

    const drawBalls = () => {
      balls.forEach((ball) => {
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.closePath();
        const img = new Image();
        img.src = ball.img;
        ctx.drawImage(
          img,
          ball.x - ball.radius,
          ball.y - ball.radius,
          ball.radius * 2,
          ball.radius * 2
        );
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 5;
        ctx.fillStyle = "#6EFAFF";
        ctx.font = "bold 40px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.strokeText(ball.letter, ball.x, ball.y);
        ctx.fillText(ball.letter, ball.x, ball.y);
      });
    };

    const updateGame = () => {
      if (!isPaused) {
        updateBalls();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBackground();
        drawBalls();
      }
    };

    const animationId = requestAnimationFrame(updateGame);
    return () => cancelAnimationFrame(animationId);
  });

  const updateBalls = () => {
    setBalls((prevBalls) => {
      const updatedBalls = prevBalls.map((ball) => ({
        ...ball,
        y: ball.y + ball.speed,
      }));

      updatedBalls.forEach((ball) => {
        if (ball.y + ball.radius >= canvasRef.current.height) {
          setHealth((prevHealth) => prevHealth - 10);
          playWrongSound();
          if (health <= 0) {
            setIsPaused(true);
            setIsEnd(true);
            playFailureSound();
          }
          removeLetterFromList(ball.letter);
        }
      });

      return updatedBalls.filter(
        (ball) => ball.y < canvasRef.current.height - ball.radius
      );
    });
  };

  const handleKeydown = (e) => {
    const key = e.key.toUpperCase();
    setBalls((prevBalls) =>
      prevBalls.filter((ball) => {
        if (koreanKeyMap[ball.letter] === key || ball.letter === key) {
          setScore((prevScore) => {
            const newScore = prevScore + 10;
            playCorrectSound();
            if (newScore % 40 === 0) {
              playNextLevelSound();
              changeBackground();
            }
            return newScore;
          });
          removeLetterFromList(ball.letter);
          return false;
        } else {
          return true;
        }
      })
    );
  };

  const changeBackground = () => {
    setCurrentBackgroundIndex(
      (prevIndex) => (prevIndex + 1) % backgrounds.length
    );
  };

  useInterval(() => {
    if (!isPaused) {
      spawnBall();
    }
  }, 2000);

  const checkOverlap = (newBall, balls) => {
    return balls.some((ball) => {
      const dx = newBall.x - ball.x;
      const dy = newBall.y - ball.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance < newBall.radius + ball.radius;
    });
  };

  const spawnBall = () => {
    const letters =
      "ㅏㅁㅂㅅㅇㄹㅎㅗㅓㅑㅐㅣㅔㄱㄴㄷㅂㅅㅇㅈㅊㅋㅌㅍㅎㅏㅑㅓㅕㅗㅛㅜㅠㅡㅣㅐㅔ";
    const letter = letters[Math.floor(Math.random() * letters.length)];
    const currentBackground = backgrounds[currentBackgroundIndex];
    const imgList = ballImages[currentBackground];
    const img = imgList[Math.floor(Math.random() * imgList.length)];

    let newBall;
    do {
      const x = Math.random() * (canvasRef.current.width - 80) + 40;
      newBall = { x, y: 10, radius: 35, letter, img, speed: 1 + score / 100 };
    } while (checkOverlap(newBall, balls));

    setBalls((prevBalls) => [...prevBalls, newBall]);
    addLetterToList(letter);
  };

  function addLetterToList(letter) {
    const englishLetter = koreanKeyMap[letter] || letter;
    const letterElement = document.createElement("div");
    letterElement.textContent = englishLetter;
    letterElement.id = `letter-${letter}`;
    containLetterRef.current.appendChild(letterElement);
  }

  function removeLetterFromList(letter) {
    const letterElement = document.getElementById(`letter-${letter}`);
    if (letterElement) {
      letterElement.remove();
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  });

  return (
    <div
      className={`${season}-gradient relative w-full h-full flex justify-center `}
    >
      <StarsCanvas />
      <canvas
        id="gameCanvas"
        ref={canvasRef}
        width="600"
        height="600"
        className="relative bg-white rounded-lg shadow-card mt-12 mb-10"
      ></canvas>
      <div className="absolute top-2 left-0 right-0 mx-auto flex justify-between w-full px-4">
        <div className="bg-gray-800 text-white p-2 rounded-md">
          Score: {score}
        </div>
        <div className="bg-gray-800 text-white p-2 rounded-md">
          Health: {health}
        </div>
      </div>

      <div className="absolute bottom-2 left-2">
        <button
          id="menuButton"
          className="w-10 h-10 bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: "url(" + menu + ")" }}
          onClick={() => setIsPaused(true)}
        ></button>
      </div>

      <div
        className={
          isOnSupport
            ? "bg-black text-white absolute bottom-2 right-2 flex p-2 rounded-md "
            : "hidden"
        }
        ref={containLetterRef}
      ></div>

      {isPaused && (
        <div
          id="MenuScreen"
          className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-75 p-8 rounded-lg"
        >
          {isEnd ? (
            <div className="text-white bg-black">Your Score:{score} </div>
          ) : null}

          <button
            className="mb-4 w-36 h-8 bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: "url(buttonOwn.jpg)" }}
            onClick={() => document.location.reload()}
          >
            New Game
          </button>

          {isEnd ? null : (
            <button
              className="mb-4 w-36 h-8 bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: "url(buttonOwn.jpg)" }}
              onClick={() => setIsPaused(false)}
            >
              Resume
            </button>
          )}

          {isOnSupport ? (
            <button
              className="mb-4 w-36 h-8 bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: "url(buttonOwn.jpg)" }}
              onClick={() => setIsOnSupport(true)}
            >
              Off Support
            </button>
          ) : (
            <button
              className="mb-4 w-36 h-8 bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: "url(buttonOwn.jpg)" }}
              onClick={() => setIsOnSupport(true)}
            >
              On Support{" "}
            </button>
          )}

          <button
            className="mb-4 w-36 h-8 bg-contain bg-center bg-no-repeat"
            onClick={() => (window.location.href = "./sadstory")}
          >
            Trailer
          </button>
          <button
            className="mb-4 w-36 h-8 bg-contain bg-center bg-no-repeat"
            onClick={() => (window.location.href = "./home")}
          >
            Home
          </button>
        </div>
      )}
    </div>
  );
};

export default Game;
