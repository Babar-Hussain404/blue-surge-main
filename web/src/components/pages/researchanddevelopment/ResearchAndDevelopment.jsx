import axios from "axios";
import React, { useEffect, useState } from "react";

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import headerImg from "../../../assets/icons/homeImage/reasechdevimg.png";

import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { technologyData } from "../../../redux/action";
import Navbar3 from "../../Navbar/Navbar3";
import "../../pages/researchanddevelopment/researchdev.css";
import Header from "../../sections/Header";
import { formatText } from "../../utility/Helper";
import Modal from "../../utility/Modal";
import RdProducts from "./RdProducts";

const ResearchAndDevelopment = ({ headertData, metaTagsData }) => {
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

  const dispatch = useDispatch() 
  const [RDData, setRDData] = useState({
    heading: '',
    headingParagraph: '',
    ourTeamImage: '',
    ourTeam: '',
    ourTeamDetail: '',
    researchImage: '',
    research: '',
    technology: '',
    technologyImage: ''
  });

  const [RDLoading, setRDLoading] = useState(true);
  const getRDData = async (page) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/rd`);
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

  const [showModal, setShowModal] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const handleShowModal = (data) => {
    setShowModal(true);
    setSelectedServiceId(data);
  };

  const handleCloseModal = (card) => {
    setShowModal(false);
  };


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
      <Navbar3  isMobile={isMobile} />
      <Header 
        title={headertData && headertData.researchHeading !== 'undefined' ? (headertData.researchHeading) : (
          `The Driving Force...
          Blue Surge`)}
        description={(headertData && headertData.researchDescription !== 'undefined') ? (headertData.researchDescription) : (`Blue Surge group comprises of various other companies and setups giving it a shape of a dynamic and versatile group having expertise in various fields.`)}
        backgroundImage={
          headertData && headertData.researchImage === 'undefined'
            ? `${process.env.REACT_APP_IMAGE_URL}/${headertData.researchImage}`
            : headerImg
        }
        showButton={true}
      />
      {/* <Header
        title="Research and development"
        description="The future is invented today. oent ut sem non mauris feugiat finibus a in nibolestie leo lacus ut mauris. Praesent ut sem non mauris feugiat finibus a inh.feugiat finibus a in nib ent ut sem  "
        backgroundImage={headerImg}
        showButton={true}
      /> */}

      <div className="research-development-page">
        {/* section 1 */}

        <div>
          <div className="first_heading">
            <h2 className="first_title">
              {RDData ? (
                <>
                  <span className="underline-part">
                    {RDData.heading?.slice(0, 5)}
                  </span>
                  {RDData.heading?.slice(5)}
                </>
              ) : null}
            </h2>

          </div>

          <p className="research-development-section">
            {RDData && formatText(RDData.headingParagraph)}
          </p>
        </div>

        {/* products */}
        {/* <ResearchProducts/> */}

        {/* section 2 */}
        {/* {RDData && RDData.length > 0 && (<> */}
        <div className="research-our-team">
          <div className="">
            <img
              className="research_left_img"
              src={
                RDData &&
                `${process.env.REACT_APP_IMAGE_URL}/${RDData.ourTeamImage}`
              }
            />
          </div>

          <div className="search-text-section" style={{ width: "50%" }}>
            <div className="first_heading">
              <h2 className="first_title">
                <span className="underline-part">Our T</span>eam
              </h2>
            </div>

            <div className="research-development-section">
              {/* {RDData && RDData.technology && (
                <>
                  {formatText(RDData.ourTeam.split(' ').slice(0, 60).join(' '))}
                  {RDData.ourTeam.split(' ').length > 60 && (
                    <>
                      <span onClick={() => handleShowModal(RDData.ourTeam)} style={{ color: '#137BF0', fontWeight: 'bold', fontSize: '2rem', cursor: 'pointer' }} className="read-more-link">
                        Read more
                      </span>
                    </>
                  )}
                </>
              )} */}
              <p>{RDData && formatText(RDData.ourTeam)}</p>
              <br />
            </div>
          </div>
        </div>
        <div className="reseach-section-2">
          <p className="research-development-section">
            {RDData && formatText(RDData.ourTeamDetail)}
          </p>
        </div>
        {/* </>)} */}


        {/* section 5 */}
        {RDData && (
          <div className="research-our-team">
            <div className="">
              <img
                className="research_left_img"
                src={
                  RDData &&
                  `${process.env.REACT_APP_IMAGE_URL}/${RDData.researchImage}`
                }
              />
            </div>

            <div className="search-text-section" style={{ width: "40%" }}>
              <div className="first_heading">
                <h2 className="first_title" style={{ lineHeight: "40px" }}>
                  Research and Development at{" "}
                  <span className="underline-part">Blue S</span>urge
                </h2>
              </div>

              <div className="research-development-section">
                <p>{RDData && formatText(RDData.research)}</p>
                {/* {formatText(RDData.research.split(' ').slice(0, 30).join(' '))} */}
                {/* {RDData.research.split(' ').length > 30 && (
                <>
                  <span onClick={() => handleShowModal(RDData.research)} style={{ color: '#137BF0', fontWeight: 'bold', fontSize: '2rem', cursor: 'pointer' }} className="read-more-link">
                    Read more
                  </span>
                </>
              )} */}
                <br />
              </div>
            </div>
          </div>)}

        {/* section 6 */}
        {RDData && (
          <div className="research-our-team">
            <div className="search-text-section" style={{ width: "40%" }}>
              <div className="first_heading">
                <h2 className="first_title" style={{ lineHeight: "40px" }}>
                  Blue Surge <span className="underline-part"> Techn</span>ology
                </h2>
              </div>

              <div className="research-development-section">
                <p>{RDData && formatText(RDData.technology)}</p>
                {/* {formatText(RDData.technology.split(' ').slice(0, 50).join(' '))}
              {RDData.technology.split(' ').length > 50 && (
                <>
                  <span onClick={() => handleShowModal(RDData.technology)} style={{ color: '#137BF0', fontWeight: 'bold', fontSize: '2rem', cursor: 'pointer' }} className="read-more-link">
                    Read more
                  </span>
                </>
              )} */}
                <br />
              </div>
            </div>

            <div className="">
              <img
                className="research_left_Img-bulb"
                src={
                  RDData &&
                  `${process.env.REACT_APP_IMAGE_URL}/${RDData.technologyImage}`
                }
              />
            </div>
          </div>)}

        {/* section 6 */}
        <RdProducts />
        <Modal selectedServiceId={selectedServiceId} show={showModal} handleClose={handleCloseModal} />

      </div>
    </>
  );
};

export default ResearchAndDevelopment;
