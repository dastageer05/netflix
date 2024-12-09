import React, { useRef, useState, useEffect } from "react";
import "./VideoPlayer.css"; // Add your styles here
import play_icon from "../../assets/play_icon.png";
import info_icon from "../../assets/info_icon.png";

interface Card {
  backdrop_path?: string;
  title?: string;
  overview?: string;
  [key: string]: any;
}

const VideoPlayer: React.FC<Card> = ({
  backdrop_path,
  title,
  overview,
  id,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // const [videoDetail, setVDetail] = useState({
  //   name: "",
  //   key: "",
  //   published_at: "",
  //   type: "",
  // });

  const videoSrc = "https://www.w3schools.com/html/mov_bbb.mp4";
  // const options = {
  //   method: "GET",
  //   headers: {
  //     accept: "application/json",
  //     Authorization: `Bearer YOUR_API_KEY`,
  //   },
  // };
  // useEffect(() => {
  //   fetch(
  //     `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
  //     options
  //   )
  //     .then((res) => res.json())
  //     .then((res) => setVDetail(res.results[0]))
  //     .catch((err) => console.error(err));
  // }, [id]);
  // const videoSrc = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;

  const handleMouseEnter = () => {
    setIsHovered(true);
    videoRef.current?.play();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0; // Reset video to the start
    }
  };

  return (
    <div
      className="preview-container w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {!isHovered && (
        <>
          <div
            className="slide"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w1280${backdrop_path})`,
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="slide-content">
              <h1>{title}</h1>
              <p>{overview}</p>
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
        </>
      )}
      <div className="slide">
        <video
          className="preview-video"
          ref={videoRef}
          muted
          preload="none"
          src={videoSrc}
        />
        <div className="slide-content">
          <h1>{title}</h1>
          <p>{overview}</p>
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
    </div>
  );
};

export default VideoPlayer;
