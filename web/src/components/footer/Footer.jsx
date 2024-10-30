import axios from 'axios';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import contactIcon from "../../assets/icons/contact.png";
import logo from "../../assets/imgs/bluesurgelogo.png";
import SocialIcons from "./SocialIcons";
const Footer = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 800);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 800);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  

 

  return (
    <>
      <footer
        className="footer_cls_simen theme-footer-one"
        style={{
          background:
            "var(--footerbg_1, linear-gradient(270deg, #000028 0.35%, #000028 38.34%, #00193C 54.34%, #052343 67.3%, #0A4775 82.77%, #0B5286 99.65%))",
        }}
      >
        <div className="responsive_icon">
          <Link to={"/contact"} className="btn footer_contact">
          <div className="d-flex">
                  <img
                    style={{ width: "3.5rem", height: "3.5rem" }}
                    src={contactIcon}
                  />
                  <span> Contact Us</span>
                </div>
          </Link>

          <div className="footer_icsons_upper">
            <SocialIcons />
          </div>
        </div>
        {!isMobile ? (
          <div className="logo  footer_logo">
            <Link to="/">
              <img
                style={{ height: "8rem" }}
                className="logo-size"
                src={logo}
                alt=""
              />
            </Link>
          </div>
        ) : (
          <></>
        )}

        <div>
          <div className="footer_link_cls">
            <div className=" footer_links_cls">
              <Link className="footer_links" to="">
                BLUE SURGE
              </Link>
              <Link className="footer_links" to="/about">
                About
              </Link>
              <Link className="footer_links" to="/services">
                Services
              </Link>

              <Link className="footer_links" to="/products">
                Products
              </Link>
              <Link className="footer_links" to="/r&d">
                Research And Development
              </Link>
              <Link className="footer_links" to="/contact">
                Location
              </Link>
            </div>
            <div className="footer_btn_hide">
              <Link to={"/contact"} className="btn footer_contact">
                <div className="d-flex">
                  <img
                    style={{ width: "3.5rem", height: "3.5rem" }}
                    src={contactIcon}
                  />
                  <span> Contact Us</span>
                </div>
              </Link>
            </div>
          </div>
          <hr className="footer-line" />
          <div className="fs-3 footer_icsons_bottom">
            <div className="globe ">bluesurge.com Global Website</div>
            <div className="globe ">© Blue Surge 1996 – 2024</div>
            <div className="d-flex footer_icsons">
              <SocialIcons />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
