import React from "react";
import "./Footer.css";
import yt_icon from "../../assets/youtube_icon.png";
import tw_icon from "../../assets/twitter_icon.png";
import ig_icon from "../../assets/instagram_icon.png";
import fb_icon from "../../assets/facebook_icon.png";

const Footer: React.FC = () => {
  return (
    <div className="footer">
      <div className="footer-icons">
        <img src={yt_icon} alt="" />
        <img src={tw_icon} alt="" />
        <img src={ig_icon} alt="" />
        <img src={fb_icon} alt="" />
      </div>
      <ul>
        <li>Audio Description</li>
        <li>Help Center</li>
        <li>Investor Relations</li>
        <li>Jobs</li>
        <li>Privacy</li>
        <li>Terms of Use</li>
        <li>Cookie Preferences</li>
        <li>Corporate Information</li>
        <li>Contact Us</li>
      </ul>
      <p className="copyright-text">© 2024 Netflix, Inc.</p>
    </div>
  );
};

export default Footer;
