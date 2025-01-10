import React from "react";
import TextBanner from "../../components/TextBanner";
import Navbar from "../../components/Navbar";
import { StarsCanvas } from "../../components/canvas";
import HomeBanner from "../../components/HomeBanner";
import { useTheme } from "../../ThemeContext";
import Statistics from "../../components/Statistics";
import Choice from "../../components/Choice";

function Home() {
  const { season } = useTheme();

  return (
    <>
      <div
        className={`${season}-gradient  z-0 h-screen relative overflow-hidden  `}
      >
        <StarsCanvas />
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center max-md:mb-2">
          <Navbar active="home" />

          <div className=" flex justify-center">
            <div className="flex flex-row h-svh justify-around items-center text-center w-full  max-md:flex-col max-md:justify-start ">
              <TextBanner />

              <HomeBanner />
              <div className="hidden max-md:block">
                <span
                  className={`hidden mb-1 ${season}-button-gradient-left-note work-text opacity-100  justify-center  max-md:flex `}
                  style={{
                    fontSize: "12px",
                  }}
                >
                  Choose one to learn by Card or by Game
                </span>
                <Choice />
              </div>
            </div>
          </div>
          <div className=" font-mono i fixed bottom-0 left-1/2 transform -translate-x-1/2 flex  justify-center items-center max-md:hidden">
            <Statistics feedbackCount={26} visited={43} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
