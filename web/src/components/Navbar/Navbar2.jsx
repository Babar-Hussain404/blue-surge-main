import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./navbarCss.css";
import { CSSTransition } from "react-transition-group";
import BottomNavbar from "./BottomNavbar";
import { useDispatch } from "react-redux";
import { readMoreBtnState } from "../../redux/action";

const Navbar2 = () => {
  const [bottomNavbarVisible, setBottomNavbarVisible] = useState(false);
  const [viewState, setViewState] = useState("");
  const dispatch = useDispatch();
  // Function to toggle BottomNavbar visibility
  const toggleBottomNavbar = (state, state2) => {
    setBottomNavbarVisible(state2);
    setViewState(state); 
    dispatch(readMoreBtnState(false));
  };

  // Use useEffect to add/remove no-scroll class to body
  useEffect(() => {
    if (bottomNavbarVisible) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    // Cleanup function to remove class when component unmounts
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [bottomNavbarVisible]);

  return (
    <>
      <header className="header-2 header-two">
        <nav id="mega-menu-holder" className="clearfix">
          <ul className="clearfix">
            <li className="active">
              <Link className="header2-text" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="header2-text" to="/about">
                About Us
              </Link>
            </li>
          </ul>
        </nav>

        <nav id="mega-menu-holder" className="clearfix">
          <ul className="clearfix">
            <li>
              <Link
                className="header2-text"
                onClick={() => toggleBottomNavbar("bussiness", true)}
              >
                Industries
              </Link>
            </li>
            <li>
              <Link
                className="header2-text"
                onClick={() => toggleBottomNavbar("services", true)}
              >
                Services
              </Link>
            </li>
            <li>
              <Link className="header2-text" to="/products">
                Products
              </Link>
            </li>
          </ul>
        </nav>
        <nav id="mega-menu-holder" className="clearfix">
          <ul className="clearfix">
            <li>
              <Link className="header2-text" to="/r&d">
                R&D
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      {/* Use CSSTransition for animation */}
      <CSSTransition
        in={bottomNavbarVisible}
        timeout={300}
        classNames="bottom-navbar"
        unmountOnExit
      >
        <BottomNavbar
          viewState={viewState}
          setViewState={setViewState}
          onClose={toggleBottomNavbar}
        />
      </CSSTransition>
    </>
  );
};

export default Navbar2;
