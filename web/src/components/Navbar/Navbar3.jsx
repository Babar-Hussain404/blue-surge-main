import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import "../../../src/assets/css/style.css";
import logo from "../../assets/imgs/bluesurgelogo.png";
import BottomNavbar from "./BottomNavbar";
import { useDispatch } from "react-redux";
import { readMoreBtnState } from "../../redux/action";

const Navbar3 = ({ isMobile }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openNav, setOpenNav] = useState(false);
  const [bottomNavbarVisible, setBottomNavbarVisible] = useState(false);
  const [navbarClose, setNavbarClose] = useState(false);
  const [viewState, setViewState] = useState("");

  const navOpen = () => {
    setOpenNav(!openNav);
  };

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (bottomNavbarVisible) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [bottomNavbarVisible]);

  const dispatch = useDispatch();
  const toggleBottomNavbar = (state, state2) => {
    setBottomNavbarVisible(state2);
    setViewState(state);
    dispatch(readMoreBtnState(false));
  };

  const location = useLocation();
  const handleNavLinkClick = (path) => {
    if (location.pathname === path) {
      window.location.reload();
    }
  };

  return (
    <>
      {navbarClose ? (
        <></>
      ) : (
        <div className="mobile-nav">
          {isMobile && (
            <div className="logo">
              <Link to="/">
                <img className="logo_img_nav3" src={logo} alt="" />
              </Link>
            </div>
          )}
          {isMobile && (
            <div className={`navigation ${isScrolled ? "scrolled" : ""}`}>
              <input
                type="checkbox"
                className="navigation__checkbox"
                id="navi-toggle"
              />
              <label
                onClick={navOpen}
                htmlFor="navi-toggle"
                className="navigation__button"
              >
                <span className="navigation__icon">&nbsp;</span>
              </label>
              <div className={`${openNav ? "navigation__background" : ""}`}>
                &nbsp;
              </div>

              <div className="navigation__nav">
                <ul className="navigation__list">
                  <li className="navigation__item">
                    <Link
                      className="navigation__link"
                      to={"/"}
                      onClick={() => handleNavLinkClick("/")}
                    >
                      HOME
                    </Link>
                  </li>
                  <li className="navigation__item">
                    <Link
                      className="navigation__link"
                      to={"/about"}
                      onClick={() => handleNavLinkClick("/about")}
                    >
                      ABOUT US
                    </Link>
                  </li>
                  <li className="navigation__item">
                    <Link
                      className="navigation__link"
                      to={"/products"}
                      onClick={() => handleNavLinkClick("/products")}
                    >
                      PRODUCTS
                    </Link>
                  </li>
                  <li className="navigation__item">
                    <Link
                      className="navigation__link navigation__checkbox"
                      id="navi-toggle"
                      // className="navigation__checkbox"
                      onClick={() => {
                        toggleBottomNavbar("services", true);
                        setNavbarClose(true);
                      }}
                    >
                      SERVICES
                    </Link>
                  </li>
                  <li className="navigation__item">
                    <Link
                      className="navigation__link"
                      onClick={() => {
                        toggleBottomNavbar("bussiness", true);
                        setNavbarClose(true);
                      }}
                    >
                      Industries
                    </Link>
                  </li>
                  <li className="navigation__item">
                    <Link
                      to={"/r&d"}
                      className="navigation__link"
                      onClick={() => handleNavLinkClick("/r&d")}
                    >
                      R & D
                    </Link>
                  </li>
                  <li className="navigation__item">
                    <Link
                      className="navigation__link"
                      to={"/contact"}
                      onClick={() => handleNavLinkClick("/contact")}
                    >
                      CONTACT
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
      <CSSTransition
        in={bottomNavbarVisible}
        timeout={300}
        classNames="bottom-navbar"
        unmountOnExit
      >
        <BottomNavbar
          setNavbarClose={setNavbarClose}
          viewState={viewState}
          setViewState={setViewState}
          onClose={toggleBottomNavbar}
          isScrolled={isScrolled}
          navOpen={navOpen}
          openNav={openNav}
        />
      </CSSTransition>
    </>
  );
};

export default Navbar3;
