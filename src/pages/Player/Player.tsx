import React, { useEffect, useState } from "react";
import back_arrow from "../../assets/back_arrow_icon.png";
import "./Player.css";
import { useNavigate, useParams } from "react-router-dom";

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [apiData, setApitData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: "",
  });

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
      .then((res) => setApitData(res.results[0]))
      .catch((err) => console.error(err));
  }, []);

  return (
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
        src={`https://www.youtube.com/embed/${apiData.key}`}
        width="90%"
        height="90%"
        title="bookshelf"
        allowFullScreen
      ></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0, 10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
};

export default Player;
