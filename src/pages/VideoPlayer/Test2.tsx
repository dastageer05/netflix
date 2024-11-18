import React, { useEffect, useState, useRef } from "react";
import play_icon from "../../assets/play_icon.png";
import info_icon from "../../assets/info_icon.png";
import left_arrow from "../../assets/left_arrow.png";
import right_arrow from "../../assets/right_arrow.png";
import "./Test2.css";

interface Card {
  backdrop_path: string;
  title: string;
  overview: string;
  [key: string]: any;
}

const VP = () => {
  const [apiData, setApiData] = useState<Card[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const videoSrc = "https://www.w3schools.com/html/mov_bbb.mp4";

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer YOUR_API_KEY`,
    },
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1`,
      options
    )
      .then((res) => res.json())
      .then((res) => setApiData(res.results || []))
      .catch((err) => console.error(err));
  }, []);

  const handlePrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? apiData.length - 1 : prevIndex - 1
    );
  };

  const handleNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === apiData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    videoRef.current?.play();
    // setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0; // Reset video to the start
    }
    setHoveredIndex(null);
  };

  return (
    <div className="slider-container">
      <button className="nav-button nav-left" onClick={handlePrevSlide}>
        <img src={left_arrow} alt="Previous" />
      </button>
      <div
        className="slider"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {apiData.map((card: Card, index) => (
          <div
            key={index}
            className="slide"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w1280${card.backdrop_path})`,
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <video
              className="preview-video"
              muted
              preload="auto"
              ref={videoRef}
              src={videoSrc}
              autoPlay
              loop
            />

            <div className="slide-content">
              <h1>{card.title}</h1>
              <p>{card.overview.slice(0, 233)}</p>
              <div className="hero-btns">
                <button className="btn">
                  <img src={play_icon} alt="Play" />
                  Play
                </button>
                <button className="btn dark-btn">
                  <img src={info_icon} alt="More Info" />
                  More Info
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="nav-button nav-right" onClick={handleNextSlide}>
        <img src={right_arrow} alt="Next" />
      </button>
    </div>
  );
};

export default VP;
