import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/style.css";
import Navbar from "../Navbar/Navbar";
import Navbar2 from "../Navbar/Navbar2";
import { useSelector } from "react-redux";

const Header = ({ backgroundImage, title, description, height, showButton, scrollToSection }) => {

  const readMorebtn = useSelector((state) => state.readMoreBtnReducer);
  const [isNotMobile, setIsNotMobile] = useState(window.innerWidth > 768);
  useEffect(() => {
    const handleResize = () => {
      setIsNotMobile(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <div
        className="theme-inner-banner"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          paddingBottom:'3rem',
          height: height,
          objectFit: "cover",
        }}
      >
        {isNotMobile && <Navbar />}
        {isNotMobile && <Navbar2/>}

        <div className="header_text"  >
          <h1 className="text-styling"> {title} </h1>

          <p className="header_b_text"> {description}</p>
          
          {showButton && readMorebtn &&  <Link onClick={scrollToSection} to={"/about"} className={` btn main_btn`}>
            Learn More
          </Link>}
        </div>
      </div>
    </>
  );
};

export default Header;
