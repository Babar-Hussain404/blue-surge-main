import React from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logoutAction, sidebarAction } from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";
const Header = () => {
  const sidebarState = useSelector((state) => state.sidebarReducer);
  const loginUser = useSelector((state) => state.loginUserReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
  return (
    <div>
      <header
        className={`navbar navbar-default upper_navbar ${
          !sidebarState ? "widthset" : "widthset2"
        }`}
      >
        {/* Navbar Header */}
        <div className="navbar-header">
          <ul className="nav navbar-nav-custom">
            <li>
              <a
                onClick={() =>
                  dispatch(sidebarAction(sidebarState ? false : true))
                }
              >
                <i className="fa fa-bars fa-fw" />
              </a>
            </li>
          </ul>
        </div>
        {/* END Navbar Header */}
        <ul className="nav navbar-nav-custom pull-right hidden-xs">
          <li className="dropdown">
            <a href="" className="dropdown-toggle" data-toggle="dropdown">
              <img
                className="nav_avatar"
                src={`${
                  loginUser.profilePicture
                    ? `https://admin.bluesurge.com.pk/uploads/${loginUser.profilePicture}`
                    : `img/placeholders/avatars/avatar.jpg`
                }`}
                alt="avatar"
              />{" "}
              <i className="fa fa-angle-down" />
            </a>
            <ul className="dropdown-menu dropdown-custom dropdown-menu-right">
              <li className="dropdown-header text-center">{loginUser.name}</li>
              <li>
                <Link to={"/admin-industries"}>Industries</Link>
                <Link to={"/admin-products"}>Products</Link>
                <Link to={"/admin-messages"}>Messages</Link>
                <Link to="/admin-services">Services</Link>
                <Link to="/admin-add-update-about">About</Link>
                <Link to="/admin-add-update-research-and-development">R & D</Link>
                 
              </li>
              <li className="divider" />
              <li>
                <Link to={'/admin-users'}>
                  <i className="fa fa-user fa-fw pull-right" />
                  Users
                </Link>
                <a onClick={logout}>
                  <i className="fa fa-user fa-fw pull-right" />
                  Log Out
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </header>
    </div>
  );
};

export default Header;
