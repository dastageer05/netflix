import { useEffect, useState } from "react";
import left_arrow from "../../assets/left_arrow.png";
import right_arrow from "../../assets/right_arrow.png";
import "./Test2.css";
import VideoPlayer from "./VideoPlayer.tsx";

interface Card {
  backdrop_path: string;
  title: string;
  overview: string;
  id: number;
  [key: string]: any;
}

const Slides = () => {
  const [apiData, setApiData] = useState<Card[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? apiData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % apiData.length);
  };

  return (
    <>
      <div className="slider-container">
        <button className="nav-button nav-left" onClick={handlePrev}>
          <img src={left_arrow} alt="Previous" />
        </button>
        <div
          className="slider"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {apiData.map((card, index) => (
            <div className="slide" key={index}>
              <VideoPlayer
                title={card.title}
                backdrop_path={`https://image.tmdb.org/t/p/original${card.backdrop_path}`}
                overview={card.overview.slice(0, 233)}
                id={card.id}
              />
            </div>
          ))}
        </div>
        <button className="nav-button nav-right" onClick={handleNext}>
          <img src={right_arrow} alt="Next" />
        </button>
      </div>
    </>
  );
};

export default Slides;
