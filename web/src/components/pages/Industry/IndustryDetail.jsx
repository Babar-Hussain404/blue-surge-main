import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import img1 from "../../../assets/industrydetail/banner.png";
import Navbar3 from "../../Navbar/Navbar3";
import Header from "../../sections/Header";
import { formatText, renderHTML } from "../../utility/Helper";
import "./industryDetail.css";
import IndustryDetailItem from "./IndustryDetailItem";
import IndustryProductItem from "./IndustryProductItem";
import IndustryServiceItem from "./IndustryServiceItem";
const IndustryDetail = () => {
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

  //   detail start

  const [activeIndex, setActiveIndex] = useState(0);

  const handleCardClick = (index) => {
    if (activeIndex === index) {
      setActiveIndex(0);
    } else {
      setActiveIndex(index);
    }
  };

  const [smallMobile, setSmallMobile] = useState(window.innerWidth <= 426);
  useEffect(() => {
    const handleResizeMobile = () => {
      setActiveIndex(null);
      setSmallMobile(window.innerWidth <= 426);
    };

    window.addEventListener("resize", handleResizeMobile);

    return () => {
      window.removeEventListener("resize", handleResizeMobile);
    };
  }, []);

  //get data
  const { id } = useParams();
  const [partnerData, setPartnerData] = useState();
  const [partnerLoading, setPartnerLoading] = useState(true);
  const getAboutTeamData = async () => {
    try {
      const response = await axios.get(
        `https://web.bluesurge.com.pk/industry/${id}`
      );
      setPartnerData(response.data.industry);
      setPartnerLoading(false);
    } catch (error) {
      console.log("Error fetching:", error);
      setPartnerLoading(false);
    }
  };
  useEffect(() => {
    if (partnerLoading) {
      getAboutTeamData();
    }
  }, [partnerLoading]);

  return (
    <>
      <Helmet>
        <title>
          {partnerData && partnerData.name ? partnerData.name : "Blue Surge"}
        </title>
        <meta
          name="description"
          content={
            partnerData && partnerData.description
              ? partnerData.description
              : "Blue Surge Description"
          }
        />
        <meta
          name="keywords"
          content={
            partnerData && partnerData.name
              ? partnerData.name
              : "Blue, Surge, keywords"
          }
        />
      </Helmet>
      <Navbar3 isMobile={isMobile} />
      <Header backgroundImage={img1} height="50vh" showButton={false} />

      <div className="industry_detail">
        <div>
          <div className="about_heading">
            <div className="first_heading">
              <h2 className="first_title">
                {partnerData && (
                  <>
                    <span className="underline-part">
                      {partnerData.name.slice(0, 5)}
                    </span>
                    {partnerData.name.slice(5)}
                  </>
                )}
              </h2>
              <br />
            </div>
          </div>

          <div className="industry_detail_left">
            {/* <p>{partnerData && formatText(partnerData.description)}</p> */}

            {
              <div
                dangerouslySetInnerHTML={renderHTML(
                  partnerData && partnerData.description
                )}
              />
            }
          </div>
        </div>
        <div className="who_we_are_right">
          <img
            className="industry_detail_right_img"
            src={
              partnerData &&
              `https://admin.bluesurge.com.pk/uploads/${partnerData.detailImage}`
            }
          />
        </div>
      </div>

      {/* industry detail start */}

      <div className="industry_detail_Cls">
        <div className="about_heading">
          <div className="first_heading">
            <h2 className="first_title">
              <span className="underline-part">Products & Services</span>
            </h2>
          </div>
        </div>
        <div className="industry_detail_container">
          <div
            className={`industry_detail_Card ${
              activeIndex === 0 ? "industry_detail_Card_active" : ""
            }`}
            onClick={() => handleCardClick(0)}
          >
            <p className="industry_detail_Card_text">Details</p>
          </div>
          <div
            className={`industry_detail_Card ${
              activeIndex === 1 ? "industry_detail_Card_active" : ""
            }`}
            onClick={() => handleCardClick(1)}
          >
            <p className="industry_detail_Card_text">Services</p>
          </div>
          <div
            className={`industry_detail_Card ${
              activeIndex === 2 ? "industry_detail_Card_active" : ""
            }`}
            onClick={() => handleCardClick(2)}
          >
            <p className="industry_detail_Card_text">Products</p>
          </div>
        </div>
        {activeIndex === 0 ? (
          <IndustryDetailItem partnerData={partnerData} />
        ) : (
          <>
            {activeIndex === 1 ? (
              <IndustryServiceItem id={id} />
            ) : (
              <>{activeIndex === 2 ? <IndustryProductItem id={id} /> : <></>}</>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default IndustryDetail;
