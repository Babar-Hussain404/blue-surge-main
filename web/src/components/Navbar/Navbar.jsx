import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/imgs/bluesurgelogo.png";
import contactIcon from "../../assets/icons/contact.png";
const Navbar = () => {
  const location = useLocation();
  return (
    <>
      <header className="header-one" style={{ width: "85%", margin: "0 auto" }}>
        <div className="top-header">
          <div className=" clearfix">
            <div className="logo float-left">
              <Link to="/">
                <img style={{ height: "6rem" }} src={logo} alt="" />
              </Link>
            </div>
            <div className="address-wrapper float-right text-light">
               <div className="nav-contact">                
               <img className="nav-contact-img" src={contactIcon}/>
                <Link to="/contact" className="contact-text">Contact Us</Link>
                </div>
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </header>
    </>
  );
};

export default Navbar;
