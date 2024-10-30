import React, { useState, useEffect } from "react";
import Header from "./main-container/Header";
import PageContent from "./main-container/PageContent";
import Footer from "./main-container/Footer";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MainContainer = () => {
  const [showUpperBar, setShowUpperBar] = useState(false);
  const loginUser = useSelector((state) => state.loginUserReducer);
  useEffect(() => {
    const handleScroll = () => {
      // 76 if the page has been scrolled beyond a certain threshold
      const scrollY = window.scrollY || window.pageYOffset;
      const threshold = 100; // Adjust this value as needed
      setShowUpperBar(scrollY > threshold);
    };

    // Add scroll event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Remove scroll event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* <PageContent /> */}

      <br />
      <div style={{ paddingBottom: "20rem" }} id="page-content">
        <div className="  content-header-media">
          <div className="header-section">
            <div className="row">
              {/* Main Title (hidden on small devices for the statistics to fit) */}
              <div className="col-md-4 col-lg-6 hidden-xs hidden-sm">
                <h1>
                  Welcome <strong>{loginUser.name}</strong>
                  <br />
                  <small>You Look Awesome!</small>
                </h1>
              </div>
            </div>
          </div>
          <img
            src="img/placeholders/headers/dashboard_header.jpg"
            alt="header image"
            className="animation-pulseSlow"
          />
        </div>
        {/* END Dashboard Header */}
        {/* Mini Top Stats Row */}
        <div style={{ margin: "2rem 0" }} className="row">
          <div className="col-sm-6 col-lg-3">
            {/* Widget */}
            <Link
              to={"/admin-industries"}
              className="widget widget-hover-effect1"
            >
              <div className="widget-simple">
                <div className="widget-icon pull-left themed-background-autumn animation-fadeIn">
                  <i className="fa fa-file-text" />
                </div>
                <h3 className="widget-content text-right animation-pullDown">
                  <strong>Industries </strong>
                  <br />
                  <small>23</small>
                </h3>
              </div>
            </Link>
            {/* END Widget */}
          </div>
          <div className="col-sm-6 col-lg-3">
            {/* Widget */}
            <Link
              to={"/admin-products"}
              className="widget widget-hover-effect1"
            >
              <div className="widget-simple">
                <div className="widget-icon pull-left themed-background-spring animation-fadeIn">
                  <i className="gi gi-usd" />
                </div>
                <h3 className="widget-content text-right animation-pullDown">
                  <strong>Products</strong>
                  <br />
                  <small>45</small>
                </h3>
              </div>
            </Link>
            {/* END Widget */}
          </div>
          <div className="col-sm-6 col-lg-3">
            {/* Widget */}
            <Link
              to={"/admin-messages"}
              className="widget widget-hover-effect1"
            >
              <div className="widget-simple">
                <div className="widget-icon pull-left themed-background-fire animation-fadeIn">
                  <i className="gi gi-envelope" />
                </div>
                <h3 className="widget-content text-right animation-pullDown">
                  <strong>Messages</strong>
                  <small>5</small>
                </h3>
              </div>
            </Link>
            {/* END Widget */}
          </div>
          <div className="col-sm-6 col-lg-3">
            {/* Widget */}
            <Link
              to={"/admin-services"}
              className="widget widget-hover-effect1"
            >
              <div className="widget-simple">
                <div className="widget-icon pull-left themed-background-amethyst animation-fadeIn">
                  <i className="gi gi-picture" />
                </div>
                <h3 className="widget-content text-right animation-pullDown">
                  <strong>Services</strong>
                  <small>300</small>
                </h3>
              </div>
            </Link>
            {/* END Widget */}
          </div>
          <div className="col-sm-6">
            {/* Widget */}
            <Link
              to={"/admin-add-update-about"}
              className="widget widget-hover-effect1"
            >
              <div className="widget-simple">
                <div className="widget-icon pull-left themed-background animation-fadeIn">
                  <i className="gi gi-wallet" />
                </div>
                <div className="pull-right">
                  {/* Jquery Sparkline (initialized in js/pages/index.js), for more examples you can 76 out http://omnipotent.net/jquery.sparkline/#s-about */}
                  <span id="mini-chart-sales" />
                </div>
                <h3 className="widget-content animation-pullDown visible-lg">
                  <strong>About</strong>
                  <small>About Us</small>
                </h3>
              </div>
            </Link>
            {/* END Widget */}
          </div>
          <div className="col-sm-6">
            {/* Widget */}
            <Link
              to={"/admin-add-update-research-and-development"}
              href="page_widgets_stats.html"
              className="widget widget-hover-effect1"
            >
              <div className="widget-simple">
                <div className="widget-icon pull-left themed-background animation-fadeIn">
                  <i className="gi gi-crown" />
                </div>
                <div className="pull-right">
                  {/* Jquery Sparkline (initialized in js/pages/index.js), for more examples you can 76 out http://omnipotent.net/jquery.sparkline/#s-about */}
                  <span id="mini-chart-brand" />
                </div>
                <h3 className="widget-content animation-pullDown visible-lg">
                  <strong>Research</strong> And <strong>Development</strong>
                  <small>R & D</small>
                </h3>
              </div>
            </Link>
            {/* END Widget */}
          </div>
        </div>
      </div>

     
    </>
  );
};

export default MainContainer;
