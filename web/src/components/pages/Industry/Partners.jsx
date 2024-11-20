import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import arrow from "../../../assets/bussiness/arrow.svg";
import banner from "../../../assets/bussiness/banner.png";
import Navbar3 from "../../Navbar/Navbar3";
import Header from "../../sections/Header";
import RdProducts from "../researchanddevelopment/RdProducts";
import "./partner.css";
import { renderHTML } from "../../utility/Helper";
const Partners = ({ headertData, metaTagsData }) => {
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

  // get industry

  const [partnerData, setPartnerData] = useState();
  const [partnerLoading, setPartnerLoading] = useState(true);
  const getAboutTeamData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/industry/list`
      );
      setPartnerData(response.data.industries);
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
          {metaTagsData && metaTagsData.industryTitle
            ? metaTagsData.industryTitle
            : "Blue Surge"}
        </title>
        <meta
          name="description"
          content={
            metaTagsData && metaTagsData.industryDescription
              ? metaTagsData.industryDescription
              : "Blue Surge Description"
          }
        />
        <meta
          name="keywords"
          content={
            metaTagsData && metaTagsData.industryKeywords
              ? metaTagsData.industryKeywords
              : "Blue, Surge, keywords"
          }
        />
      </Helmet>

      <Navbar3 isMobile={isMobile} />
      <Header
        title={
          headertData &&
          headertData.businessHeading !== "undefined" && (
            <div
              dangerouslySetInnerHTML={renderHTML(headertData?.businessHeading)}
            />
          )
        }
        description={
          headertData &&
          headertData.businessDescription &&
          headertData.businessDescription !== "undefined" && (
            <div
              dangerouslySetInnerHTML={renderHTML(
                headertData?.businessDescription
              )}
            />
          )
        }
        backgroundImage={
          headertData && headertData.businessImage
            ? `${process.env.REACT_APP_IMAGE_URL}/${headertData.businessImage}`
            : banner
        }
        showButton={false}
        height="61vh"
      />
      <div className="business_container">
        {partnerData && partnerData?.length > 0 && (
          <div className="first_heading">
            <h2 className="first_title">
              <span className="underline-part">Our I</span>ndustries
            </h2>
          </div>
        )}
        <div className="business_cards">
          {partnerLoading ? (
            <div
              style={{
                textAlign: "center",
                color: "white",
                height: "30vh",
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
              {partnerData &&
                partnerData?.length > 0 &&
                partnerData?.map((industry, index) => {
                  return (
                    <>
                      <div key={index} className="business_card">
                        <img
                          className="card_img"
                          src={`${process.env.REACT_APP_IMAGE_URL}/${industry.image}`}
                        />
                        <div className="card_item">
                          <p className="card_heading">{industry.name}</p>
                          <Link to={`/industry-detail/${industry._id}`}>
                            <img className="card_arrow" src={arrow} />
                          </Link>
                        </div>
                      </div>
                    </>
                  );
                })}
            </>
          )}
        </div>
        <RdProducts />
      </div>
    </>
  );
};

export default Partners;
