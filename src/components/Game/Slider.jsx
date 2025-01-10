import React, { useState } from "react";
import anh1 from "../../assets/GameImage/img1.jpg";
import anh2 from "../../assets/GameImage/img2.jpg";
import anh3 from "../../assets/GameImage/img3.jpg";
import anh4 from "../../assets/GameImage/img4.jpg";
import game1 from "../../assets/GameImage/img1.jpg";
import { useTheme } from "../../ThemeContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { gameImage } from "../../assets";

const Slider = () => {
  const { season } = useTheme();
  const [slides, setSlides] = useState([
    {
      img: game1,
      title: "Word Game",
      description:
        " Word game is a game that helps people improve their new words by guessing a new word.",
      link: "/trailer2",
    },
    {
      img: anh2,
      title: "Sad Story",
      description:
        "Weld letters will fall from above and the player must enter the correct letters on the screen.",
      link: "/sadstory",
    },
    {
      img: anh3,
      title: "Bubble Game",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti temporibus quis eum consequuntur .",
    },
  ]);

  const nextSlide = () => {
    setSlides((prevSlides) => {
      const newSlides = [...prevSlides];
      newSlides.push(newSlides.shift());
      return newSlides;
    });
  };

  const prevSlide = () => {
    setSlides((prevSlides) => {
      const newSlides = [...prevSlides];
      newSlides.unshift(newSlides.pop());
      return newSlides;
    });
  };

  return (
    <div className={`containers ${season}-gradient `}>
      <div className="slidered">
        {slides.map((slide, index) => (
          <div
            key={index}
            className="slides justify-center items-center"
            style={{ backgroundImage: `url(${slide.img})` }}
          >
            <div
              className={`${
                index === 0 ? "contented opacity-100" : "contented opacity-0"
              }`}
            >
              <h2 className="bg-slate-200 text-red-800 text-4xl">
                {slide.title}
              </h2>
              <p>{slide.description}</p>
            </div>
            <Link to={slide.link}>
              <div
                className=" py-1  grid-cols-2 bg-gray-200 rounded"
                style={{ marginBottom: "10px" }}
              >
                <button
                  className={`${
                    index === 0 ? "text-md" : "text-sm "
                  }  border-none text-md  mb-2 text-black font-poppins font-medium cursor-pointer transition duration-400 tracking-wider pl-2 flex justify-center items-center `}
                  style={{ gap: 20, padding: 10 }}
                >
                  <FontAwesomeIcon icon={faPlay} />
                  {index === 0 ? <p> SEE MORE</p> : <></>}
                </button>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="buttons">
        <span className="prev" onClick={prevSlide}></span>
        <span className="next" onClick={nextSlide}></span>
      </div>
    </div>
  );
};

export default Slider;
