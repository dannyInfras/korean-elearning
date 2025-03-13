import React from "react";
import { Route, Routes, useLocation } from "react-router";
import NotFound from "./NotFound";
import Home from "./Home";
import LearnHome from "./LearnHome";
import Scene from "./SadStory";
import SadStory from "./SadStory/trailer";
import Alphabetic from "../components/Alphabetic";
import WordGame from "./WordGame";
import PlayHard from "./PlayHard";
import Trailer from "./WordGame/trailer";
import KoreanCoursesPage from "./Course";
import KoreanCourseDetailPage from "./Course/KoreanCourseDetailPage";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import FinishPayment from "../components/FinishPayment";
import Success from "../components/Success";
import Cancel from "../components/Cancel";
import Package from "./Package";
import { Blog } from "./Blog/Blog";
import { BlogDetailPage } from "./BlogDetail/BlogDetail";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/*" element={<Home></Home>} />
      <Route path="/alphabet" element={<Alphabetic></Alphabetic>} />
      <Route path="/home" element={<Home></Home>} />
      <Route path="/learn" element={<LearnHome></LearnHome>} />
      <Route path="/trailer" element={<Scene></Scene>} />
      <Route path="/wordgame" element={<WordGame></WordGame>} />
      <Route path="/play" element={<PlayHard></PlayHard>} />
      <Route path="/trailer2" element={<Trailer></Trailer>} />
      <Route path="/sadstory" element={<SadStory></SadStory>} />
      <Route path="/flipCard" element={<FlipCardGame></FlipCardGame>} />
      <Route path="/login" element={<Login />} />  
      <Route path="/register" element={<Register />} />
      <Route path="/package" element={<Package></Package>} />
      <Route path="/blog" element={<Blog></Blog>} />
      <Route path="/blog/:id" element={<BlogDetailPage></BlogDetailPage>} />
      <Route path="/finish" element={<FinishPayment />} />
      <Route path="/success" element={<Success />} />
      <Route path="/cancel" element={<Cancel />} />
      <Route path="404" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
