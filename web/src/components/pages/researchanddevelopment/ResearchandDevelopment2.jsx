import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import headerImg from "../../../assets/icons/homeImage/reasechdevimg.png";
import { technologyData } from "../../../redux/action";
import Navbar3 from "../../Navbar/Navbar3";
import Header from "../../sections/Header";
import { renderHTML } from "../../utility/Helper";
import ResearchProducts from "./ResearchProducts";
const ResearchandDevelopment2 = ({ headertData, metaTagsData }) => {
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

  const [RDData, setRDData] = useState({
    heading: "",
    test: "",
    technology: "",
  });
  const dispatch = useDispatch();
  const [RDLoading, setRDLoading] = useState(true);
  const getRDData = async () => {
    try {
      const response = await axios.get(`https://web.bluesurge.com.pk/rd`);//todo
      setRDData(response.data.rd || {}); // Set an empty object if data is undefined
      dispatch(technologyData(response.data.rd || {})); // Dispatch an action with empty object if data is undefined
      setRDLoading(false);
    } catch (error) {
      console.log("Error fetching:", error);
      setRDLoading(false);
    }
  };
  useEffect(() => {
    if (RDLoading) {
      getRDData();
    }
  }, [RDLoading]);

  return (
    <>
      <Helmet>
        <title>
          {metaTagsData && metaTagsData.researchTitle
            ? metaTagsData.researchTitle
            : "Blue Surge"}
        </title>
        <meta
          name="description"
          content={
            metaTagsData && metaTagsData.researchDescription
              ? metaTagsData.researchDescription
              : "Blue Surge Description"
          }
        />
        <meta
          name="keywords"
          content={
            metaTagsData && metaTagsData.researchKeywords
              ? metaTagsData.researchKeywords
              : "Blue, Surge, keywords"
          }
        />
      </Helmet>
      <Navbar3 isMobile={isMobile} />
      <Header
        title={
          headertData &&
          headertData.researchHeading !== "undefined" && (
            <div
              dangerouslySetInnerHTML={renderHTML(headertData.researchHeading)}
            />
          )
        }
        description={
          headertData &&
          headertData.researchDescription !== "undefined" && (
            <div
              dangerouslySetInnerHTML={renderHTML(
                headertData.researchDescription
              )}
            />
          )
        }
        backgroundImage={
          headertData && headertData.researchImage === "undefined"
            ? `https://admin.bluesurge.com.pk/uploads/${headertData.researchImage}`//todo
            : headerImg
        }
        showButton={false}
      />
      <div className="research2-products">
        {RDLoading ? (
          <div
            style={{
              paddingTop: "5rem",
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
            {RDData && RDData.technology && (
              <div>
                <div className="first_heading center_heading ">
                  <h2 className="first_title">
                    {RDData.heading && (
                      <>
                        <span>
                          {/* {RDData.heading.slice(0, 5)} */}
                          <div
                            className="custom-text-style"
                            style={{ color: "#137bf0", padding:"20px 0px" }}
                            dangerouslySetInnerHTML={renderHTML(RDData.heading)}
                          />
                          <div className="underline-part" style={{ width: "20%"}}></div>
                        </span>
                        {/* {RDData.heading.slice(5)} */}
                      </>
                    )}
                  </h2>
                </div>
                
                <p className="research-development-section additional-width-class">
                  <div
                    dangerouslySetInnerHTML={renderHTML(RDData.ourTeamDetail)}
                  />
                  {/* {RDData && formatText(RDData.technology)} */}
                </p>
                <p className="research-development-section additional-width-class">
                  <div
                    dangerouslySetInnerHTML={renderHTML(RDData.technology)}
                  />
                  {/* {RDData && formatText(RDData.technology)} */}
                </p>
              </div>
            )}
          </>
        )}

        <ResearchProducts />
      </div>
    </>
  );
};

export default ResearchandDevelopment2;
