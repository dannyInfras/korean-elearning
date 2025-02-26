import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const keyMap = {
  q: "ㅂ", w: "ㅈ", e: "ㄷ", r: "ㄱ", t: "ㅅ",
  y: "ㅛ", u: "ㅕ", i: "ㅑ", o: "ㅐ", p: "ㅔ",
  a: "ㅁ", s: "ㄴ", d: "ㅇ", f: "ㄹ", g: "ㅎ",
  h: "ㅗ", j: "ㅓ", k: "ㅏ", l: "ㅣ", z: "ㅋ",
  x: "ㅌ", c: "ㅊ", v: "ㅍ", b: "ㅠ", n: "ㅜ", m: "ㅡ"
};

// Generate shuffled pairs
const generatePairs = (numPairs) => {
  let pairs = [];
  const keys = Object.keys(keyMap).slice(0, numPairs);
  keys.forEach((eng) => {
    let han = keyMap[eng];
    pairs.push({ char: eng, type: "eng" });
    pairs.push({ char: han, type: "han" });
  });
  return pairs.sort(() => Math.random() - 0.5);
};

const FlipCardGame = () => {
  const [score, setScore] = useState(0);
  const [health, setHealth] = useState(3);
  const [selected, setSelected] = useState([]);
  const [matched, setMatched] = useState([]);
  const [round, setRound] = useState(1);
  const [cards, setCards] = useState(generatePairs(5));
  const [hintsLeft, setHintsLeft] = useState(6);
  const [showMenu, setShowMenu] = useState(false);
  const [isRevealing, setIsRevealing] = useState(true);
  const [countdown, setCountdown] = useState(10); // Starting countdown time
  const navigate = useNavigate();

  // Handle countdown and revealing logic
  useEffect(() => {
    let time = Math.max(3, 10 - round); // Reduce time per round, min 3s
    setCountdown(time);
    setIsRevealing(true);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          setIsRevealing(false);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [round, cards]);

  const handleCardClick = (char) => {
    if (isRevealing || selected.length === 2 || matched.includes(char.char)) return;

    const newSelection = [...selected, char];
    setSelected(newSelection);

    if (newSelection.length === 2) {
      const [first, second] = newSelection;
      if (keyMap[first.char] === second.char || keyMap[second.char] === first.char) {
        setScore(score + 1);
        setMatched([...matched, first.char, second.char]);
        setTimeout(() => {
          setSelected([]); // Clear selection but don’t remove cards
        }, 500);
      } else {
        setTimeout(() => {
          setHealth(health - 1);
          setSelected([]);
        }, 1000);
      }
    }
  };

  // Check for round completion (all pairs matched)
  useEffect(() => {
    if (matched.length === cards.length && cards.length > 0 && health > 0) {
      setTimeout(() => {
        setRound(round + 1);
        setMatched([]);
        setSelected([]);
        setCards(generatePairs(5 + round));
      }, 2000);
    }
  }, [matched, cards, health, round]);

  // Use a hint to reveal one pair
  const useHint = () => {
    if (hintsLeft === 0) return;

    const availablePairs = cards.filter(c => !matched.includes(c.char));
    if (availablePairs.length > 1) {
      const first = availablePairs[0];
      const second = availablePairs.find(c => keyMap[first.char] === c.char || keyMap[c.char] === first.char);

      if (second) {
        setSelected([first, second]);
        setTimeout(() => {
          setMatched([...matched, first.char, second.char]);
          setSelected([]);
        }, 1000);
      }

      setHintsLeft(hintsLeft - 1);
    }
  };

  // Reset game to initial state with revealing phase
  const resetGame = () => {
    setHealth(3);
    setScore(0);
    setRound(1);
    setMatched([]);
    setSelected([]);
    setHintsLeft(6);
    setCards(generatePairs(5));
    setIsRevealing(true); // Ensure cards are shown initially
    setCountdown(10); // Reset countdown to initial value
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">Flip Card Hangul Game</h2>

      {isRevealing ? (
        <p className="text-xl font-bold text-red-600 mb-4">Memorize Cards: {countdown}s</p>
      ) : (
        <p className="text-xl text-green-600 mb-4">Go!</p>
      )}

      <div className="flex gap-4 mb-4">
        <button
          className="bg-gray-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-700 transition"
          onClick={() => setShowMenu(true)}
        >
          Menu
        </button>
        {!isRevealing && (
          <button
            className={`px-4 py-2 rounded-lg shadow-md transition ${
              hintsLeft > 0 ? "bg-yellow-400 hover:bg-yellow-500" : "bg-gray-400 cursor-not-allowed"
            }`}
            onClick={useHint}
            disabled={hintsLeft === 0}
          >
            Hint ({hintsLeft} left)
          </button>
        )}
      </div>

      <p className="text-lg mb-2">Score: <span className="font-bold text-blue-500">{score}</span></p>
      <p className="text-lg mb-2">Round: <span className="font-bold text-green-500">{round}</span></p>
      <p className="text-lg mb-4">
        Health: <span className="text-red-500">{'❤️'.repeat(health)}</span>
      </p>

      {health === 0 ? (
        <button
          onClick={resetGame}
          className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
        >
          Restart Game
        </button>
      ) : (
        <div className="grid grid-cols-6 gap-4">
          {cards.map((item, index) => (
            <div
              key={index}
              className={`w-16 h-16 flex justify-center items-center text-2xl font-semibold 
                         cursor-pointer rounded-lg shadow-lg transition 
                         ${isRevealing ? "bg-green-300" : matched.includes(item.char) ? "bg-yellow-300" : "bg-blue-300 hover:bg-blue-400"} 
                         ${matched.includes(item.char) ? "cursor-not-allowed" : ""}`}
              onClick={() => handleCardClick(item)}
            >
              {isRevealing || selected.includes(item) || matched.includes(item.char) ? (
                <span className="text-gray-900">{item.char}</span>
              ) : (
                <span className="text-gray-700">?</span>
              )}
            </div>
          ))}
        </div>
      )}

      {showMenu && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Menu</h3>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition mr-4"
              onClick={() => navigate("/")}
            >
              Exit Game
            </button>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600 transition"
              onClick={() => setShowMenu(false)}
            >
              Close Menu
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlipCardGame;