import Navbar from "../../components/Navbar/Navbar";
import "./Home.css";
import hero_banner from "../../assets/hero_banner.jpg";
import hero_title from "../../assets/hero_title.png";
import play_icon from "../../assets/play_icon.png";
import info_icon from "../../assets/info_icon.png";
import TitleCards from "../../components/TitleCards/TitleCards";
import Footer from "../../components/Footer/Footer";
import VideoPlayer from "../VideoPlayer/VIdeoPlayer";
import VP from "../VideoPlayer/Test2";
const Home = () => {
  const imgUrl = "https://via.placeholder.com/1920x1080";

  return (
    <div className="home">
      <Navbar />
      <VP />
      <div className="more-cards">
        <TitleCards title="Popular" category="popular" />
        <TitleCards title="Top Rated" category="top_rated" />
        <TitleCards title="Upcoming" category="upcoming" />
        <TitleCards title="Now" category="now_playing" />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
