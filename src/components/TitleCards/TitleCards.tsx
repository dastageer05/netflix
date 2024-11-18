import React, { useEffect, useRef, useState } from "react";
// import cards_data from "../../assets/cards/Cards_data.js";
import "./TitleCards.css";
import { Link } from "react-router-dom";

interface Card {
  image: string;
  name: string;
  [key: string]: any;
}

interface TitleCardType {
  title?: string;
  category?: string;
}

const TitleCards: React.FC<TitleCardType> = ({
  title = "Popular on Netflix",
  category = "now_playing",
}) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef<HTMLDivElement>(null);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNzliNTBmZTJiNDhkMDRlNmVlYzhkZDhhZDg4NWI1ZCIsIm5iZiI6MTczMTc2NTQ1Mi42ODUzMzU2LCJzdWIiOiI2NzM4YTJmNTk2YmUzYTA2ZmFkOTIwMzgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.yybxWlIw2v_6LGRx6zsMwrrC9TXKEc-Slkt9b3Pfpyg",
    },
  };

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    if (cardsRef.current) {
      cardsRef.current.scrollLeft += e.deltaY;
    }
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`,
      options
    )
      .then((res) => res.json())
      .then((res) => setApiData(res.results))
      .catch((err) => console.error(err));

    const cardsElement = cardsRef.current;

    if (cardsElement) {
      cardsElement.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      // Cleanup event listener
      if (cardsElement) {
        cardsElement.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  return (
    <div className="titlecards">
      <h2>{title}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card: Card, index: number) => {
          return (
            <Link className="card" key={index} to={`/player/${card.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path}
                alt=""
              />
              <p>{card.original_title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TitleCards;
