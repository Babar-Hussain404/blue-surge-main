import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import img from "../../../assets/imgs/productImgs/banner.png";
import Navbar3 from "../../Navbar/Navbar3";
import "../../pages/services/servicedetail.css";
import Header from "../../sections/Header";
import { formatText, renderHTML } from "../../utility/Helper";
import Modal from "../../utility/Modal";
import ProductDetailcard from "../product/ProductDetailcard";
import ServiceDetailOurProducts from "./ServiceDetailOurProducts";
import ServiceIndustryDetail from "./ServiceIndustryDetail";
const ServiceDetail = () => {
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

  const [showModal, setShowModal] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const handleShowModal = (card) => {
    setShowModal(true);
    setSelectedServiceId(card.detail);
  };

  const handleCloseModal = (card) => {
    setShowModal(false);
  };

  let { id } = useParams();
  const [serviceLoading, setServiceLoading] = useState(true);
  const [serviceData, setServiceData] = useState(true);
  const getSingleServiceData = async (page) => {
    setServiceLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/service/${id}`
      );
      const formData = response.data.service;
      const advantagesArray = formData.advantages.map((item) =>
        JSON.parse(item)
      );
      setServiceData({
        advantages: advantagesArray?.length > 0 ? advantagesArray[0] : [],
        detail: formData.detail,
        industryId: formData.industryId,
        name: formData.name,
        thumbnailImage: formData.thumbnailImage,
        video: formData.video,
        detailImage: formData.detailImage,
      });
      // setProductData(response.data.product);
      setServiceLoading(false);
    } catch (error) {
      console.log("Error fetching:", error);
      setServiceLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getSingleServiceData();
    }
  }, [id]);
  return (
    <>
      <Helmet>
        <title>
          {serviceData && serviceData.name ? serviceData.name : "Blue Surge"}
        </title>
        <meta
          name="description"
          content={
            serviceData && serviceData.detail
              ? serviceData.detail
              : "Blue Surge Description"
          }
        />
        <meta
          name="keywords"
          content={
            serviceData && serviceData.name
              ? serviceData.name
              : "Blue, Surge, keywords"
          }
        />
      </Helmet>
      <Navbar3  isMobile={isMobile} />
      <Header 
        backgroundImage={img}
        height="50vh"
        showButton={false}
      />

      {/* section 1 */}
      <div className="research-our-team">
        <div className="search-text-section" style={{ width: "40%" }}>
          <div className="first_heading">
            <h2
              className="first_title service-detai-heading-margin"
              style={{ lineHeight: "40px" }}
            >
              {serviceData && serviceData.name && (
                <>
                  <span className="underline-part">
                    {serviceData.name.slice(0, 5)}
                  </span>
                  {serviceData.name.slice(5)}
                </>
              )}
            </h2>
          </div>

          <div className="research-development-section service-section1-margin">
            {/* {serviceData && formatText(serviceData.detail)} */}
            {<div dangerouslySetInnerHTML={renderHTML(serviceData && (serviceData.detail))} />}

            
          </div>
        </div>

        <div className="">
          <img
            className="service-detail-img1"
            src={`${process.env.REACT_APP_IMAGE_URL}/${
              serviceData && serviceData.detailImage
            }`}
          />
        </div>
      </div>

      {/* section 2 */}
      <div className="service-detail-container1 product-detail-container">
        <div className="first_heading">
          <h2 className="first_title" style={{ lineHeight: "40px" }}>
            Advantages
          </h2>
        </div>

        <ul className="research-development-section feature-margin mt-5">
          <ul>
            {serviceData.advantages &&
              serviceData.advantages.map((feature, index) => (
                <li key={index}>{feature.name}</li>
              ))}
          </ul>
        </ul>

        {/* section3 */}
        <div>
          <ServiceDetailOurProducts />
        </div>

       
        <ServiceIndustryDetail serviceData={serviceData.industryId} />

        {/* section 5 */}
        <ProductDetailcard />
        <Modal
          selectedServiceId={selectedServiceId}
          show={showModal}
          handleClose={handleCloseModal}
        />
      </div>
    </>
  );
};

export default ServiceDetail;
