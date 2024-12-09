import VP from "../VideoPlayer/Slides.tsx";
import { useEffect, useState } from "react";
import VideoPlayer from "../VideoPlayer/VideoPlayer.tsx";

interface Card {
  backdrop_path: string;
  title: string;
  overview: string;
  [key: string]: any;
}

const Test = () => {
  const imgUrl = "https://via.placeholder.com/300x170";
  const [apiData, setApiData] = useState<Card[]>([]);
  let cardd;
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

  // if (apiData != null) {
  //   cardd = apiData[0];
  // }

  // console.log(apiData);

  return (
    // <div>
    //   <VideoPlayer
    //     title={cardd?.title}
    //     backdrop_path={cardd?.backdrop_path}
    //     overview={cardd?.overview}
    //   />
    //   <VP />
    // </div>
    <div className="slider-container">
      <div className="slider">
        {apiData.map((card, index) => (
          <div className="slide" key={index}>
            <VideoPlayer
              title={card.title}
              backdrop_path={`https://image.tmdb.org/t/p/original${card.backdrop_path}`}
              overview={card.overview}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Test;
