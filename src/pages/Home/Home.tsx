import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Home.css";
import TitleCards from "../../components/TitleCards/TitleCards";
import Footer from "../../components/Footer/Footer";
import Slides from "../VideoPlayer/Slides";
const Home = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false); // Hide splash screen after video ends
    }, 4000); // Adjust time to match your video length

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);
  return (
    <>
      {showSplash ? (
        <div className="splash-screen">
          <video
            src={`/intro.mp4`}
            autoPlay
            muted
            onEnded={() => setShowSplash(false)} // Transition on video end
            style={{ width: "100vw", height: "100vh", objectFit: "cover" }}
          />
        </div>
      ) : (
        <div className="home">
          <Navbar />
          <Slides />
          <div className="more-cards">
            <TitleCards title="Popular" category="popular" />
            <TitleCards title="Top Rated" category="top_rated" />
            <TitleCards title="Upcoming" category="upcoming" />
            <TitleCards title="Now" category="now_playing" />
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default Home;
