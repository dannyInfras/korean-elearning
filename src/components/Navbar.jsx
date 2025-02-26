import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import navClick from "../assets/mp3/navClick.mp3";
import Sound from "./Sound";
import { useTheme } from "../ThemeContext";
import { logoFall, logoSp, logoWinter, logoSum } from "../assets";
import { styles } from "../styles";
import { useSound } from "../SoundCotext";

const Navbar = ({ active }) => {
  const { season } = useTheme();
  const [activeItem, setActiveItem] = useState(active);
  const navClickRef = useRef(new Audio(navClick));
  const { isSoundEnabled } = useSound();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const playHoverSound = (audioRef) => {
    if (audioRef.current && isSoundEnabled) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  const handleMenuItemClick = (item, path) => {
    setActiveItem(item);
    playHoverSound(navClickRef);
    setIsModalOpen(false);
    navigate(path);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = (e) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
    }
  };

  const [backgroundColor, setBackgroundColor] = useState("");
  const [borderColor, setBorderColor] = useState("");

  useEffect(() => {
    switch (season) {
      case "spring":
        setBackgroundColor("bg-pink-300");
        setBorderColor("border-pink-800");
        break;
      case "summer":
        setBackgroundColor("bg-green-300");
        setBorderColor("border-green-800");
        break;
      case "fall":
        setBackgroundColor("bg-orange-300");
        setBorderColor("border-orange-800");
        break;
      case "winter":
        setBackgroundColor("bg-blue-300");
        setBorderColor("border-blue-800");
        break;
      default:
        setBackgroundColor("bg-green-300");
        setBorderColor("border-green-800");
        break;
    }
  }, [season]);

  let logoImage;
  switch (season) {
    case "spring":
      logoImage = logoSp;
      break;
    case "summer":
      logoImage = logoSum;
      break;
    case "fall":
      logoImage = logoFall;
      break;
    case "winter":
      logoImage = logoWinter;
      break;
    default:
      logoImage = logoSum;
      break;
  }

  return (
    <>
      <nav
        className={`${styles.paddingX} w-full flex items-center fixed top-4 z-20 max-md:px-1 `}
      >
        <div className="w-full flex justify-between items-center max-w-7xl mx-auto animate-[slidedown_2s_cubic-bezier(.19,1,.22,1)_forwards]">
          <Link
            to="/home"
            className="flex justify-center self-center items-center"
          >
            <img
              src={logoImage}
              alt="logo"
              className="object-contain"
              style={{
                objectFit: "contain",
                objectPosition: "center",
                width: "30px",
                height: "30px",
              }}
            />
          </Link>

          <div className="flex h-min gap-2 items-center">
            <div className="flex h-min items-center">
              <Sound />
            </div>
            <div
              className={`w-full flex gap-2 items-center rounded-2xl font-light shadow-lg cursor-pointer text-sx `}
            >
              <span
                className={`${activeItem === "home"
                    ? `bg-${borderColor} cursor-pointer text-sx rounded-2xl pl-2 pr-2 border-solid ${borderColor} border-2 flex h-max`
                    : "pl-2 pr-2 cursor-pointer"
                  }`}
                onClick={() => handleMenuItemClick("home", "/home")}
              >
                Home
              </span>
              <span
                className={`${activeItem === "work"
                    ? `cursor-pointer rounded-2xl pl-2 pr-2 border-solid ${borderColor} border-2 flex h-max`
                    : "pr-2 pl-2 cursor-pointer"
                  }`}
                onClick={() => handleMenuItemClick("work", "/learn")}
              >
                Work hard
              </span>
              <span
                className={`${activeItem === "package"
                    ? `cursor-pointer rounded-2xl pl-2 pr-2 border-solid ${borderColor} border-2 flex h-max`
                    : "pr-2 pl-2 cursor-pointer"
                  }`}
                onClick={() => handleMenuItemClick("package", "/package")}
              >
                Package
              </span>
              <span
                className={`${activeItem === "play"
                    ? `bg-${borderColor} cursor-pointer text-sx rounded-2xl pl-2 pr-2 border-solid ${borderColor} border-2 flex h-max`
                    : "pr-2 pl-2 cursor-pointer"
                  }`}
                onClick={() => handleMenuItemClick("play", "/play")}
              >
                Play hard
              </span>
            </div>
          </div>
        </div>
      </nav>

      {isModalOpen && (
        <div
          className={`fixed inset-0 z-30 flex items-center justify-center ${backgroundColor} bg-opacity-50`}
          onClick={closeModal}
        >
          <div className={`rounded-lg p-4 ${backgroundColor}-200`}>
            <div className="flex justify-end">
              <FontAwesomeIcon
                icon={faTimes}
                className={`text-${borderColor}-800 cursor-pointer`}
                onClick={toggleModal}
              />
            </div>
            <div className="flex flex-col gap-4">
              <span
                className={`${activeItem === "home"
                    ? `bg-${borderColor} cursor-pointer text-sx rounded-2xl pl-2 pr-2 border-solid ${borderColor} border-2 flex h-max`
                    : "pl-2 pr-2 cursor-pointer"
                  }`}
                onClick={() => handleMenuItemClick("home", "/home")}
              >
                Home
              </span>
              <span
                className={`${activeItem === "work"
                    ? `cursor-pointer rounded-2xl pl-2 pr-2 border-solid ${borderColor} border-2 flex h-max`
                    : "pr-2 pl-2 cursor-pointer"
                  }`}
                onClick={() => handleMenuItemClick("work", "/learn")}
              >
                Work hard
              </span>

              <span
                className={`${activeItem === "play"
                    ? `cursor-pointer rounded-2xl pl-2 pr-2 border-solid ${borderColor} border-2 flex h-max`
                    : "pr-2 pl-2 cursor-pointer"
                  }`}
                onClick={() => handleMenuItemClick("play", "/play")}
              >
                Play hard
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
