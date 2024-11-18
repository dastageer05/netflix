import VP from "./Test2.tsx";
import { useEffect, useState } from "react";
import VideoPlayer from "./VIdeoPlayer.tsx";

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

  if (apiData != null) {
    cardd = apiData[0];
  }

  console.log(apiData);

  return (
    <div>
      <VideoPlayer
        title={cardd?.title}
        backdrop_path={cardd?.backdrop_path}
        overview={cardd?.overview}
      />
      <VP />
    </div>
  );
};

export default Test;
