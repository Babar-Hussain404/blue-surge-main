import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Helmet } from "react-helmet";
import headerImg from "../../../../src/assets/imgs/servicesimgs/HeaderImage.png";
import cross from "../../../assets/imgs/aboutimgs/pastcross.png";
import headerImg1 from "../../../assets/imgs/servicesimgs/image1.png";
import ProductCard2 from "../../../components/cards/ProductCard2.jsx";
import { pageNumberRefresh } from "../../../redux/action.jsx";
import Navbar3 from "../../Navbar/Navbar3";
import "../../pages/services/services.css";
import Header from "../../sections/Header";
import { renderHTML } from "../../utility/Helper.jsx";

const Services = ({ headertData, metaTagsData }) => {
  const limitToTwoWords = (text) => {
    const words = text.split(" ");
    return words.slice(0, 2).join(" ");
  };
  const dispatch = useDispatch();
  const [serviceLoading, setServiceLoading] = useState(true);
  const [service, setService] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const pageNumber = useSelector((state) => state.PageNumberReducer);
  const pageNumberRefreshReducer = useSelector(
    (state) => state.PageNumberRefreshReducer
  );
  const [selectedIds, setSelectedIds] = useState([]);
  const [industryProducts, setIndustryProducts] = useState([]);
  const [industryLoading, setIndustryLoading] = useState(true);
  const aboutDataReducer = useSelector((state) => state.aboutDataReducer);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [dropDown, setDropDown] = useState(false);
  const [industriesDropdown, setIndustriesDropdown] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [typesDropdown, setTypesDropdown] = useState(false);

  const getsearchedProductsData = async (page, selectedIds) => {
    setServiceLoading(true);
    try {
      const response =
        selectedIds?.length > 0
          ? await axios.get(
              `${process.env.REACT_APP_BASE_URL}/service/filter/${selectedIds}`
            )
          : await axios.get(
              `${process.env.REACT_APP_BASE_URL}/service?page=${page}`
            );
      setService(response.data.services);
      setTotalPages(response.data.meta.totalPages);
      dispatch(pageNumberRefresh(false));
      setServiceLoading(false);
    } catch (error) {
      console.log("Error fetching:", error);
      setServiceLoading(false);
      dispatch(pageNumberRefresh(false));
    }
  };

  useEffect(() => {
    if (serviceLoading || pageNumberRefreshReducer) {
      getsearchedProductsData(pageNumber, selectedIds);
    }
  }, [serviceLoading, pageNumber, pageNumberRefreshReducer, selectedIds]);

  const getProductsData = async () => {
    setIndustryLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/industry`
      );
      setIndustryProducts(response.data.industrys);
      setIndustryLoading(false);
    } catch (error) {
      console.log("Error fetching:", error);
      setIndustryLoading(false);
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleDropdown = (dropdown) => {
    if (dropdown === "industries") {
      setIndustriesDropdown(!industriesDropdown);
      setServicesDropdown(false);
      setTypesDropdown(false);
    } else if (dropdown === "services") {
      setIndustriesDropdown(false);
      setServicesDropdown(!servicesDropdown);
      setTypesDropdown(false);
    } else if (dropdown === "types") {
      setIndustriesDropdown(false);
      setServicesDropdown(false);
      setTypesDropdown(!typesDropdown);
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedIds((prevSelectedIds) => {
      const newSelectedIds = prevSelectedIds.includes(id)
        ? prevSelectedIds.filter((selectedId) => selectedId !== id)
        : [...prevSelectedIds, id];

      getsearchedProductsData(pageNumber, newSelectedIds);
      return newSelectedIds;
    });
  };

  return (
    <>
      <Helmet>
        <title>
          {metaTagsData && metaTagsData.serviceTitle
            ? metaTagsData.serviceTitle
            : "Blue Surge"}
        </title>
        <meta
          name="description"
          content={
            metaTagsData && metaTagsData.serviceDescription
              ? metaTagsData.serviceDescription
              : "Blue Surge Description"
          }
        />
        <meta
          name="keywords"
          content={
            metaTagsData && metaTagsData.serviceKeywords
              ? metaTagsData.serviceKeywords
              : "Blue, Surge, keywords"
          }
        />
      </Helmet>
      <Navbar3 isMobile={isMobile} />
      <Header
        title={
          headertData &&
          headertData.serviceHeading && (
            <div
              dangerouslySetInnerHTML={renderHTML(headertData.serviceHeading)}
            />
          )
        }
        description={
          headertData &&
          headertData.serviceDescription &&
          headertData.serviceDescription !== "undefined" && (
            <div
              dangerouslySetInnerHTML={renderHTML(
                headertData.serviceDescription
              )}
            />
          )
        }
        backgroundImage={
          headertData && headertData.serviceDetailImage
            ? `${process.env.REACT_APP_IMAGE_URL}/${headertData.serviceDetailImage}`
            : headerImg
        }
        showButton={false}
        height="61vh"
      />

      {/* 1st section */}
      {aboutDataReducer && aboutDataReducer.whoWeAre && (
        <div>
          <div className="first_heading">
            <h2 className="first_title heading-margin ">
              <span className="underline-part">Overv</span>iew of Blue Surge
            </h2>
          </div>

          <div className="service-top">
            <img className="image-size" src={headerImg1} />
            <div className="service-text">
              <p>
                {" "}
                <div
                  dangerouslySetInnerHTML={renderHTML(
                    aboutDataReducer.whoWeAre
                  )}
                />
                {/* {aboutDataReducer && formatText(aboutDataReducer.whoWeAre)}{" "}   */}
              </p>
            </div>
          </div>
        </div>
      )}
      {/* 2nd section */}
      <div className="service-section" style={{ overflow: "hidden" }}>
        <div>
          <div className="first_heading contactheading">
            <h2 className="first_title heading-margin ">
              <span className="underline-part">Our S</span>ervices
            </h2>

            {service?.length > 0 && (
              <div className="drop-down-button d-flex gap-5">
                <button onClick={() => toggleDropdown("industries")}>
                  <div className="btn1  rounded-0">
                    <h3 className="btn1-fontfamily">Industries</h3>
                  </div>
                </button>
              </div>
            )}
            {industriesDropdown && (
              <div
                className="dropDown dropdown-position1"
                style={{
                  overflowY: "scroll",
                  overflowX: "hidden",
                  height: "260px",
                  scrollbarWidth: "thin",
                }}
              >
                <div className="sfi22">
                  <div className="sfi">
                    <h3 className="mr-5">Industries</h3>
                    <span>
                      <img
                        className="mr-3"
                        onClick={() => toggleDropdown("industries")}
                        width={20}
                        src={cross}
                      />
                    </span>
                  </div>
                </div>
                <div className="checkbox2" style={{ width: "200px" }}>
                  {industryProducts.map((industry) => (
                    <div
                      className="il"
                      style={{ marginBottom: "10px" }}
                      key={industry._id}
                    >
                      <input
                        type="checkbox"
                        id={`industry-${industry._id}`}
                        onChange={() => handleCheckboxChange(industry._id)}
                      />
                      <label
                        for={industry._id}
                        htmlFor={`industry-${industry._id}`}
                      >
                        {limitToTwoWords(industry.name)}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <ProductCard2
          service={service}
          serviceLoading={serviceLoading}
          totalPages={totalPages}
        />
      </div>
    </>
  );
};

export default Services;
