import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import cross from "../../assets/imgs/aboutimgs/pastcross.png";
import Navbar from "./Navbar";
import { useDispatch } from "react-redux";
import { readMoreBtnState } from "../../redux/action";
const BottomNavbar = ({ viewState, setViewState, onClose, setNavbarClose }) => {
  const [partnerData, setPartnerData] = useState();
  const [partnerLoading, setPartnerLoading] = useState(true);
  const [showBackButton, setShowBackButton] = useState(false);
  const [prevViewState, setPrevViewState] = useState("");

  const getIndustryData = async () => {
    setPartnerLoading(true);
    try {
      const response = await axios.get(
        `https://web.bluesurge.com.pk/industry/list`
      );
      setPartnerData(response.data.industries);
      setPartnerLoading(false);
    } catch (error) {
      console.log("Error fetching:", error);
      setPartnerLoading(false);
    }
  };

  const [industryIdData, setIndustryIdData] = useState();
  const [nameIdData, setnameIdData] = useState();

  const functionSet = (id, state, name) => {
    setPrevViewState(viewState);
    setIndustryIdData(id);
    setViewState(state);
    setnameIdData(name);
    if (state !== "bussiness" && state !== "services") {
      setShowBackButton(true);
    }
  };

  const handleBackButtonClick = () => {
    setViewState(prevViewState);
    setShowBackButton(false);
  };

  const getServiceData = async () => {
    setPartnerLoading(true);
    try {
      const response = await axios.get(
        `https://web.bluesurge.com.pk/service/list`
      );
      setPartnerData(response.data.service);
      setPartnerLoading(false);
    } catch (error) {
      console.log("Error fetching:", error);
      setPartnerLoading(false);
    }
  };

  const getServiceByIndustryIdData = async () => {
    setPartnerLoading(true);
    try {
      const response = await axios.get(
        `https://web.bluesurge.com.pk/service/industry/${industryIdData}`
      );
      setPartnerData(response.data.services);
      setPartnerLoading(false);
      setIndustryIdData(false);
    } catch (error) {
      console.log("Error fetching:", error);
      setPartnerLoading(false);
    }
  };

  const getProductsByServiceIdData = async () => {
    setPartnerLoading(true);
    try {
      const response = await axios.get(
        `https://web.bluesurge.com.pk/product/detail/${industryIdData}`
      );
      setPartnerData(response.data.products);
      setPartnerLoading(false);
      setIndustryIdData(false);
    } catch (error) {
      console.log("Error fetching:", error);
      setPartnerLoading(false);
    }
  };

  useEffect(() => {
    if (viewState === "bussiness") {
      getIndustryData();
      setShowBackButton(false);
    }
    if (viewState === "services") {
      getServiceData();
    }
  }, [viewState]);

  useEffect(() => {
    if (viewState === "services_industryid" && industryIdData) {
      getServiceByIndustryIdData();
    }
  }, [viewState, industryIdData]);

  useEffect(() => {
    if (viewState === "products") {
      getProductsByServiceIdData();
    }
  }, [viewState]);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handleNavLinkClick = (path) => {
    if (location.pathname === path) {
      window.location.reload();
    } else if (location.pathname.startsWith("/products-details")) {
      navigate(path)
      window.location.reload();
    }
  };
  
  return (
    <div className="BottomNavbar">
      {isMobile ? (
        <></>
      ) : (
        <>
          <Navbar />
          <header className="header-2 header-two">
            <nav id="mega-menu-holder" className="clearfix">
              <ul className="clearfix">
                <li className="active">
                  <Link
                    className="header2-text"
                    onClick={() => handleNavLinkClick("/")}
                    to="/"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    className="header2-text"
                    onClick={() => handleNavLinkClick("/about")}
                    to="/about"
                  >
                    About Us
                  </Link>
                </li>
              </ul>
            </nav>

            <nav id="mega-menu-holder" className="clearfix">
              <ul className="clearfix">
                <li>
                  <Link
                    onClick={() => setViewState("bussiness")}
                    className="header2-text"
                  >
                    Industries
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setViewState("services")}
                    className="header2-text"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    className="header2-text"
                    onClick={() => handleNavLinkClick("/products")}
                    to="/products"
                  >
                    Products
                  </Link>
                </li>
              </ul>
            </nav>
            <nav id="mega-menu-holder" className="clearfix">
              <ul className="clearfix">
                <li>
                  <Link
                    className="header2-text"
                    onClick={() => handleNavLinkClick("/r&d")}
                    to="/r&d"
                  >
                    R&D
                  </Link>
                </li>
              </ul>
            </nav>
          </header>
        </>
      )}

      <div
        className="crossbtnnav"
        onClick={() => {
          onClose("", false);
          window.location.reload();
          setNavbarClose(false);
          dispatch(readMoreBtnState(true));
        }}
      >
        <img src={cross} />
      </div>
      {partnerLoading ? (
        <div
          style={{
            textAlign: "center",
            paddingTop: "15rem",
            color: "white",
            height: "80vh",
            width: "100%",
          }}
          className="visible-lg"
        >
          <i
            style={{
              fontSize: "6rem",
            }}
            className="fa fa-spinner fa-5x fa-spin"
          ></i>
        </div>
      ) : (
        <>
          <div className="side__button">
            {showBackButton ? (
              <div style={{ cursor: "pointer" }}>
                <p className="fs-1 mx-5" onClick={handleBackButtonClick}>
                  <i className="fa fa-arrow-left mx-4"></i>
                  {nameIdData}
                </p>
              </div>
            ) : viewState === "bussiness" ? (
              <Link
                onClick={() => handleNavLinkClick("/businesses")}
                to="/businesses"
                className="fs-1 mx-5 text-light"
              >
                Industries
              </Link>
            ) : viewState === "services" ? (
              <Link
                onClick={() => handleNavLinkClick("/services")}
                to="/services"
                className="fs-1 mx-5 text-light"
              >
                Services
              </Link>
            ) : null}
          </div>
          <div className="navmaindiv">
            <div className="navscrollbar">
              {partnerData && partnerData?.length > 0 ? (
                <>
                  {partnerData.map((item, index) => (
                    <>
                      {viewState === "products" ? (
                        <div key={index}>
                          <Link
                            onClick={() =>
                              handleNavLinkClick(
                                `/products-details/${item._id}`
                              )
                            }
                            to={`/products-details/${item._id}`}
                          >
                            <p className="navbottompara">{item.name}</p>
                          </Link>
                        </div>
                      ) : (
                        <div
                          className="image_text"
                          key={index}
                          onClick={() =>
                            functionSet(
                              item._id,
                              viewState === "bussiness"
                                ? "services_industryid"
                                : viewState === "services" ||
                                  viewState === "services_industryid"
                                  ? "products"
                                  : "",
                              item.name
                            )
                          }
                        >
                          <p className="navbottompara">{item.name} </p>
                          {/* <img className="text_image" src={arrow} /> */}
                          <div
                            className="text_image fs-1 "
                            style={{ marginTop: "-15px" }}
                          >
                            <i class="bi bi-arrow-right"></i>
                          </div>
                        </div>
                      )}
                    </>
                  ))}
                </>
              ) : (
                <div>
                  <p className="fs-1">Oops! There is no Data</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BottomNavbar;
