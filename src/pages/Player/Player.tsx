import React, { useEffect, useState } from "react";
import back_arrow from "../../assets/back_arrow_icon.png";
import "./Player.css";
import { useNavigate, useParams } from "react-router-dom";
import left_arrow from "../../assets/left_arrow.png";
import right_arrow from "../../assets/right_arrow.png";
import TitleCards from "../../components/TitleCards/TitleCards";
type Movie = {
  id: number;
  title: string;
  poster_path: string;
};

interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

interface CurrentMovie {
  title: string;
  vote_average: string;
  budget: string;
  overview: string;
  release_date: string;
  revenue: string;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  tagline: string;
}
const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const [videoDetail, setVideoDetail] = useState({
    name: "",
    key: "",
    published_at: "",
    type: "",
  });

  const [moreDetail, setMoreDetail] = useState<CurrentMovie>({
    title: "",
    vote_average: "",
    budget: "",
    overview: "",
    release_date: "",
    revenue: "",
    runtime: 0,
    spoken_languages: [],
    tagline: "",
  });

  const [similarData, setSimilarData] = useState<Movie[]>([]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNzliNTBmZTJiNDhkMDRlNmVlYzhkZDhhZDg4NWI1ZCIsIm5iZiI6MTczMTc2NTQ1Mi42ODUzMzU2LCJzdWIiOiI2NzM4YTJmNTk2YmUzYTA2ZmFkOTIwMzgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.yybxWlIw2v_6LGRx6zsMwrrC9TXKEc-Slkt9b3Pfpyg",
    },
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      options
    )
      .then((res) => res.json())
      .then((res) => setVideoDetail(res.results[0]))
      .catch((err) => console.error(err));
  }, [id]);
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
      .then((res) => res.json())
      .then((res) => setMoreDetail(res))
      .catch((err) => console.error(err));
  }, [id]);
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`,
      options
    )
      .then((res) => res.json())
      .then((res) => setSimilarData(res.results))
      .catch((err) => console.error(err));
  }, [id]);

  const handleNext = () => {
    if (currentIndex < similarData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <>
      <div className="player">
        <img
          src={back_arrow}
          alt=""
          onClick={() => {
            navigate("/");
          }}
        />
        <iframe
          //https://www.youtube.com/embed/RvbqnCaX6js
          src={`https://www.youtube.com/embed/${videoDetail.key}?autoplay=1`}
          width="90%"
          height="90%"
          title="bookshelf"
          allowFullScreen
          allow="autoplay; encrypted-media"
        ></iframe>
        <div className="player-info">
          <p>{videoDetail.published_at.slice(0, 10)}</p>
          <p>{videoDetail.name}</p>
          <p>{videoDetail.type}</p>
          <br />
        </div>
        <div className="movie-info">
          <h4>Movie Information</h4>
          <div className="data">
            <p>Title : {moreDetail.title}</p>
            <p>Rating : {moreDetail.vote_average}</p>
            <p>
              {" "}
              Budget: $
              {moreDetail.budget
                ? (parseFloat(moreDetail.budget) / 1_000_000).toFixed(2)
                : "N/A"}{" "}
              million
            </p>
            <p>Release Date: {moreDetail.release_date}</p>
            <p>
              Revenue: $
              {moreDetail.revenue
                ? (parseFloat(moreDetail.revenue) / 1_000_000).toFixed(2)
                : "N/A"}{" "}
              million
            </p>
            <p>
              Runtime:{" "}
              {moreDetail.runtime
                ? `${Math.floor(moreDetail.runtime / 60)}h ${
                    moreDetail.runtime % 60
                  }min`
                : "N/A"}
            </p>
            <p>
              Original language:{" "}
              {moreDetail.spoken_languages.length > 0
                ? moreDetail.spoken_languages[0].english_name
                : "No languages available"}
            </p>
          </div>
          <div className="overview">Overview : {moreDetail.overview}</div>
        </div>
      </div>
      <div className="s-container">
        <button className="nav-button nav-left" onClick={handlePrev}>
          <img src={left_arrow} alt="Previous" />
        </button>
        <div
          className="slider pg"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          <TitleCards title="Similar" category={`${id}/similar`} />
        </div>
        <button className="nav-button nav-right" onClick={handleNext}>
          <img src={right_arrow} alt="Next" />
        </button>
      </div>
    </>
  );
};

export default Player;
