import React, { useEffect, useRef } from "react";
import logo from "../../assets/logo.png";
import search_icon from "../../assets/search_icon.svg";
import bell_icon from "../../assets/bell_icon.svg";
import profile_img from "../../assets/profile_img.png";
import caret_icon from "../../assets/caret_icon.svg";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const navRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        if (window.scrollY >= 80) {
          navRef.current.classList.add("nav-dark");
        } else {
          navRef.current.classList.remove("nav-dark");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div ref={navRef} className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="" />
        <ul>
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browser by Languages</li>
        </ul>
      </div>
      <div className="navbar-right">
        <img src={search_icon} className="icons" alt="" />
        <p>Children</p>
        <img src={bell_icon} className="icons" alt="" />
        <div className="navbar-profile">
          <img src={profile_img} alt="" className="icons" />
          <img src={caret_icon} alt="" className="icons" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
