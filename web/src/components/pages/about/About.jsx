import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import img1 from "../../../../src/assets/imgs/Blue surge_About Us_Icons_Images/icons/Banner.png";
import { aboutDataDispatcher } from "../../../redux/action";
import Navbar3 from "../../Navbar/Navbar3";
import Header from "../../sections/Header";
import { renderHTML } from "../../utility/Helper";
import AboutBusiness from "./AboutBusiness";
import AboutMission from "./AboutMission";
import AboutTeam from "./AboutTeam";
import AboutVision from "./AboutVision";
import AboutWhoWeAre from "./AboutWhoWeAre";
import PastandBusiness from "./PastandBusiness";
import "./about.css";
const About = ({ headertData, metaTagsData }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const whoWeAreRef = useRef(null);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const dispatch = useDispatch();
  // get about data
  const [aboutData, setAboutData] = useState();
  const [aboutLoading, setAboutLoading] = useState(true);
  const getAboutData = async (page) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/aboutus`
      );
      setAboutData(response.data.about);
      dispatch(aboutDataDispatcher(response.data.about));
      setAboutLoading(false);
    } catch (error) {
      console.log("Error fetching:", error);
      setAboutLoading(false);
    }
  };

  const scrollToSection = () => {
    whoWeAreRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (aboutLoading) {
      getAboutData();
    }
  }, [aboutLoading]);

  return (
    <>
      <Helmet>
        <title>
          {metaTagsData && metaTagsData.aboutTitle
            ? metaTagsData.aboutTitle
            : "Blue Surge"}
        </title>
        <meta
          name="description"
          content={
            metaTagsData && metaTagsData.aboutDescription
              ? metaTagsData.aboutDescription
              : "Blue Surge Description"
          }
        />
        <meta
          name="keywords"
          content={
            metaTagsData && metaTagsData.aboutKeywords
              ? metaTagsData.aboutKeywords
              : "Blue, Surge, keywords"
          }
        />
      </Helmet>

      <Navbar3 isMobile={isMobile} />
      <Header
        title={
          headertData &&
          headertData.aboutHeading !== "undefined" && (
            <div
              dangerouslySetInnerHTML={renderHTML(headertData.aboutHeading)}
            />
          )
        }
        description={
          headertData &&
          headertData.aboutDescription !== "undefined" && (
            <div
              dangerouslySetInnerHTML={renderHTML(headertData.aboutDescription)}
            />
          )
        }
        backgroundImage={
          headertData && headertData.aboutImage === "undefined"
            ? `${process.env.REACT_APP_IMAGE_URL}/${headertData.aboutImage}`
            : img1
        }
        showButton={false}
        scrollToSection={scrollToSection}
        height="62vh"
      />

      <div className="about_page">
        <div ref={whoWeAreRef}>
          <AboutWhoWeAre aboutData={aboutData} />
        </div>
        <AboutMission aboutData={aboutData} />
        <AboutVision aboutData={aboutData} />
        <AboutTeam aboutData={aboutData} />
        <PastandBusiness aboutData={aboutData} />
        <AboutBusiness aboutData={aboutData} />
      </div>
    </>
  );
};

export default About;
