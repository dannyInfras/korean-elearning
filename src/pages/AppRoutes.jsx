import React from "react";
import { Route, Routes } from "react-router";
import NotFound from "./NotFound";
import Home from "./Home";
import LearnHome from "./LearnHome";
import Scene from "./SadStory";
import SadStory from "./SadStory/trailer";
import Alphabetic from "../components/Alphabetic";
import WordGame from "./WordGame";
import PlayHard from "./PlayHard";
import Trailer from "./WordGame/trailer";
import Login from "./Auth/Login"; 
import Register from "./Auth/Register";  

function AppRoutes() {
  return (
    <Routes>
      <Route path="/*" element={<Home />} />
      <Route path="/alphabet" element={<Alphabetic />} />
      <Route path="/home" element={<Home />} />
      <Route path="/learn" element={<LearnHome />} />
      <Route path="/trailer" element={<Scene />} />
      <Route path="/wordgame" element={<WordGame />} />
      <Route path="/play" element={<PlayHard />} />
      <Route path="/trailer2" element={<Trailer />} />
      <Route path="/sadstory" element={<SadStory />} />
      <Route path="/login" element={<Login />} />  
      <Route path="/register" element={<Register />} /> 
      <Route path="404" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
