import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import "./assets/publiccss/style.css";
import "./assets/publiccss/responsive.css";
import "./components/Navbar/navbarCss.css";
import contactIcon from "./assets/icons/contact.png";
import PrivateRoutes from "./components/PrivateRoute/PrivateRoute";
import ContactUs from "./components/contact/ContactUs";
import Footer from "./components/footer/Footer";
import Home from "./components/pages/Home";
import IndustryDetail from "./components/pages/Industry/IndustryDetail";
import Partners from "./components/pages/Industry/Partners";
import About from "./components/pages/about/About";
import ProductDetail from "./components/pages/product/ProductDetail";
import Products from "./components/pages/product/Products";
import ResearchAndDevelopment from "./components/pages/researchanddevelopment/ResearchAndDevelopment";
import ServiceDetail from "./components/pages/services/ServiceDetail";
import Services from "./components/pages/services/Services";
import { Helmet } from "react-helmet";
import ResearchandDevelopment2 from "./components/pages/researchanddevelopment/ResearchandDevelopment2";
import preloader from "./assets/BlueSurge_preloader.gif";
import Modal from "./components/utility/Modal";
import Error404 from "./components/pages/Error404";
import { useDispatch } from "react-redux";
import { readMoreBtnState } from "./redux/action";
function App() {
  const [headertData, setHeaderData] = useState([]);
  const [headertLoading, setLoadingData] = useState([]);
  const getContactsData = async () => {
    try {
      setLoadingData(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/header`
      );
      setHeaderData(response.data.header);
      setLoadingData(false);
    } catch (error) {
      console.log("Error fetching: ", error);
      setLoadingData(false);
    }
  };
  const [metaTagsData, setMetaTagsData] = useState([]);
  const [metaTagsLoading, setMetaTagsLoadingData] = useState(true);
  const getMetaTagsData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/metatags`
      );
      setMetaTagsData(response.data.metaTags);
      setMetaTagsLoadingData(false);
    } catch (error) {
      console.log("Error fetching: ", error);
      setMetaTagsLoadingData(false);
    }
  };

  useEffect(() => {
    if (metaTagsLoading) {
      getMetaTagsData();
    }
  }, [metaTagsLoading]);
  useEffect(() => {
    if (headertLoading) {
      getContactsData();
    }
  }, [headertLoading]);

  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const [showContactBtn, setShowContactBtn] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      let thresholdFromBottom = 100; // Default value

      if (window.innerWidth >= 1024) {
        thresholdFromBottom = 150;
      } else if (window.innerWidth <= 768) {
        thresholdFromBottom = 325;
      } else if (window.innerWidth <= 425) {
        thresholdFromBottom = 500;
      }

      const windowHeight = window.innerHeight;
      const scrollHeight = document.body.scrollHeight;
      const scrollTop =
        window.scrollY ||
        window.pageYOffset ||
        document.body.scrollTop ||
        document.documentElement.scrollTop;

      const distanceFromBottom = scrollHeight - (scrollTop + windowHeight);

      if (distanceFromBottom <= thresholdFromBottom) {
        setShowContactBtn(false);
      } else {
        setShowContactBtn(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollTopFunc = () => {
    window.scrollTo(0, 0);
  };
  const dispatch = useDispatch();
  const [readmoreBtn, setreadMoreBtn] = useState(true);
  useEffect(() => {
    scrollTopFunc();
    getMetaTagsData();
  }, [location]);
  useEffect(() => {
    if (readmoreBtn) {
      dispatch(readMoreBtnState(true));
      setreadMoreBtn(false);
    }
  }, [readmoreBtn]);

  useEffect(() => {
    const cookieConsentP = localStorage.getItem("cookieConsent");
    if (!cookieConsentP) {
      setCookieConsent(false);
    }
  }, []);
  const [cookieConsent, setCookieConsent] = useState(true);

  const handleAcceptCookies = () => {
    localStorage.setItem("cookieConsent", true);
    setCookieConsent(true);
  };
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer); 
  }, []);
  return (
    <>
      {isLoading ? (
        <div className="preloader">
          <img src={preloader} alt="Loading..." />
        </div>
      ) : (
        <>
          <Helmet>
            <title>
              {metaTagsData && metaTagsData.homeTitle
                ? metaTagsData.homeTitle
                : "Blue Surge"}
            </title>
            <meta
              name="description"
              content={
                metaTagsData && metaTagsData.homeDescription
                  ? metaTagsData.homeDescription
                  : "Blue Surge Description"
              }
            />
            <meta
              name="keywords"
              content={
                metaTagsData && metaTagsData.homeKeywords
                  ? metaTagsData.homeKeywords
                  : "Blue, Surge, keywords"
              }
            />
          </Helmet>

          <Routes>
            <Route path="/" element={<Home headertData={headertData} />} />
            <Route
              path="/about"
              element={
                <About metaTagsData={metaTagsData} headertData={headertData} />
              }
            />
            <Route
              path="/products"
              element={
                <Products
                  metaTagsData={metaTagsData}
                  headertData={headertData}
                />
              }
            />
            <Route
              path="/services"
              element={
                <Services
                  metaTagsData={metaTagsData}
                  headertData={headertData}
                />
              }
            />
            <Route
              path="/businesses"
              element={
                <Partners
                  metaTagsData={metaTagsData}
                  headertData={headertData}
                />
              }
            />
            <Route
              path="/contact"
              element={
                <ContactUs
                  metaTagsData={metaTagsData}
                  headertData={headertData}
                />
              }
            />
            <Route
              path="/r&d"
              element={
                <ResearchandDevelopment2
                  metaTagsData={metaTagsData}
                  headertData={headertData}
                />
              }
            />
            <Route
              path="/r&d2"
              element={
                <ResearchAndDevelopment
                  metaTagsData={metaTagsData}
                  headertData={headertData}
                />
              }
            />
            <Route path="/products-details/:id" element={<ProductDetail />} />
            <Route path="/service-details/:id" element={<ServiceDetail />} />
            <Route path="/industry-detail/:id" element={<IndustryDetail />} />  
            <Route path="*" element={<Error404 />} />

            <Route element={<PrivateRoutes />} />
          </Routes>
          {/* <Modal show={showModal} handleClose={handleCloseModal} /> */}
          <ToastContainer theme="dark" />
          <Footer />
          <button onClick={scrollTopFunc} className="scroll-top tran3s">
            <i className="fa fa-angle-up" aria-hidden="true" />
          </button>
          {showContactBtn && (
            <div className="contact_btn_fixed">
              <Link to="/contact" className="contact_home_btn">
                <img
                  style={{ width: "7rem", height: "7rem" }}
                  src={contactIcon}
                />
              </Link>
            </div>
          )}

          {!cookieConsent && (
            <div className="cookie_policy">
              <p>
                Blue Surge uses cookies to improve its activities and provide
                quality service.
              </p>
              <button
                type="button"
                className="btn accept_cookie_btn"
                onClick={handleAcceptCookies}
              >
                Accept
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default App;
