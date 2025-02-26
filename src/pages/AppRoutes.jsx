import React from "react";
import { Route, Routes, useLocation } from "react-router";
import NotFound from "./NotFound";
import Home from "./Home";
import LearnHome from "./LearnHome";
import Scene from "./SadStory";
import SadStory from "./SadStory/trailer";
import Alphabetic from "../components/Alphabetic";
import WordGame from "./WordGame";
import Package from "./Package";
import PlayHard from "./PlayHard";
import FinishPayment from "../components/FinishPayment";
import Trailer from "./WordGame/trailer";
import Success from "../components/Success";
import Cancel from "../components/Cancel";
function AppRoutes() {
  return (
    <Routes>
      <Route path="/*" element={<Home></Home>} />
      <Route path="/alphabet" element={<Alphabetic></Alphabetic>} />
      <Route path="/package" element={<Package></Package>} />
      <Route path="/home" element={<Home></Home>} />
      <Route path="/learn" element={<LearnHome></LearnHome>} />
      <Route path="/trailer" element={<Scene></Scene>} />
      <Route path="/wordgame" element={<WordGame></WordGame>} />
      <Route path="/play" element={<PlayHard></PlayHard>} />
      <Route path="/trailer2" element={<Trailer></Trailer>} />
      <Route path="/sadstory" element={<SadStory></SadStory>} />
      <Route path="/finish" element={<FinishPayment />} />
      <Route path="/success" element={<Success />} />
      <Route path="/cancel" element={<Cancel />} />
      <Route path="404" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
