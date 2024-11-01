import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeBackgroundColor, logoutAction } from "../redux/action";
import logo from "../assets/imgs/logolight.svg";
import categories from "../assets/imgs/navicons/Categories.svg";
import market from "../assets/imgs/navicons/market.svg";
import chat from "../assets/imgs/navicons/chat.svg";
import following from "../assets/imgs/navicons/following.svg";
import pages from "../assets/imgs/navicons/pages.svg";
import meetpeople from "../assets/imgs/navicons/meetpeople2.svg";
import help from "../assets/imgs/navicons/help.svg";
import setting from "../assets/imgs/navicons/setting.svg";
import logouticon from "../assets/imgs/navicons/logout.svg";
import saved from "../assets/imgs/navicons/meetpeople2.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const SideBar = () => {
  const dispatch = useDispatch();
  const loginUser = useSelector((state) => state.loginUserReducer);
  const background_color = useSelector(
    (state) => state.changeBackgroundColorReducer
  );
  const navigate = useNavigate();
  const logout = async () => {
    try {
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
      dispatch(logoutAction(false));
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  const [isActive, setIsActive] = useState(false);
  const [categoriesActive, setCategoriesActive] = useState(false);
  const toggleActive = () => {
    setIsActive(!isActive);
  };
  const toggleCategories = () => {
    setCategoriesActive(!categoriesActive);
  };

  return (
    <div>
      <div
        className={`${background_color}`}
        style={{
          position: "fixed",
          height: "100vh",
          overflowY: "auto",
          zIndex: "9",
        }}
      >
        <div id="sidebar-scroll">
          <div className="sidebar-content">
            <Link to="/admin" className=" sidebar-logo">
              <img
                style={{ height: "6rem", margin: "0 0 0 2rem" }}
                className=""
                src="bluesurgelogo.png"
              />
            </Link>
            <div
              style={{ height: "50px" }}
              className="sidebar-section sidebar-user clearfix  "
            >
              <div className="sidebar-user-avatar">
                <a href="/">
                  <img
                    src={`${
                      loginUser.profilePicture
                        ? `https://admin.bluesurge.com.pk/uploads/${loginUser.profilePicture}`
                        : `img/placeholders/avatars/avatar.jpg`
                    }`}
                    alt="avatar"
                  />
                </a>
              </div>
              <div className="sidebar-user-name">{loginUser.name}</div>
            </div>

            <ul className="sidebar-nav ">
              <li>
                <Link to="/admin-industries" className="theme_color">
                  <img className="sidebar-nav-icon" src={market} />
                  <span className="sidebar-nav-mini-hide">Industries</span>
                </Link>
              </li>
              <li>
                <Link to="/admin-products" className="theme_color">
                  <img className="sidebar-nav-icon" src={chat} />
                  <span className="sidebar-nav-mini-hide">Products</span>
                </Link>
              </li>
              <li>
                <Link to="/admin-services" className="theme_color">
                  <img className="sidebar-nav-icon" src={following} />
                  <span className="sidebar-nav-mini-hide">Services</span>
                </Link>
              </li>
              <li>
                <Link to="/admin-messages" className="theme_color">
                  <img className="sidebar-nav-icon" src={pages} />
                  <span className="sidebar-nav-mini-hide">Messages</span>
                </Link>
              </li>
              <li>
                <Link to="/admin-add-update-research-and-development" className="theme_color">
                  <img className="sidebar-nav-icon" src={categories} />
                  <span className="sidebar-nav-mini-hide ">R&D</span>
                </Link>
              </li>
              <li>
                <Link to="/admin-add-update-about" className="theme_color">
                  <img className="sidebar-nav-icon" src={help} />
                  <span className="sidebar-nav-mini-hide">About</span>
                </Link>
              </li>
              <li>
                <Link to="/admin-add-update-header" className="theme_color">
                  <img className="sidebar-nav-icon" src={help} />
                  <span className="sidebar-nav-mini-hide">Header</span>
                </Link>
              </li>
              <li>
                <Link to="/admin-partners" className="theme_color">
                  <img className="sidebar-nav-icon" src={following} />
                  <span className="sidebar-nav-mini-hide">Partners</span>
                </Link>
              </li>
              <li>
                <Link to="/admin-add-update-meta-tags" className="theme_color">
                  <img className="sidebar-nav-icon" src={following} />
                  <span className="sidebar-nav-mini-hide">Meta Tags</span>
                </Link>
              </li>
              <li>
                <Link to="/admin-add-update-social-icons" className="theme_color">
                  <img className="sidebar-nav-icon" src={market} />
                  <span className="sidebar-nav-mini-hide">Social Icons</span>
                </Link>
              </li>
              <li style={{ margin: "2rem" }}>
                {/* <Link to="/" className="theme_color">
                </Link> */}
                  <i className="sidebar-nav-icon">____________________________</i>
              </li>
              <li>
                <Link to="/admin-users" className="theme_color">
                  <img className="sidebar-nav-icon" src={meetpeople} />
                  <span className="sidebar-nav-mini-hide">Users</span>
                </Link>
              </li>
              <li onClick={logout}>
                <Link to="/" className="theme_color2 logoutbtn">
                  <img className="sidebar-nav-icon" src={logouticon} />
                  <span className="sidebar-nav-mini-hide">Logout Account</span>
                </Link>
              </li>
              <li style={{ textAlign: "center" }} className="sidebar-footer ">
                <p>Blue Surge © 2024. All rights reserved.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
