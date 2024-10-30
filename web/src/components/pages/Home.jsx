import axios from "axios";
import React, { useEffect, useState } from "react";
import headerImg2 from "../../../src/assets/solar2/Rectangle.png";
import Navbar3 from "../Navbar/Navbar3";
import HomePartner from "../cards/HomePartner";
import HomeServicesCards from "../cards/HomeServicesCards";
import ProductCard from "../cards/ProductCard";
import Business from "../sections/Business";
import Header from "../sections/Header";
import HomeAbout2 from "../sections/HomeAbout2";
import HomeServices from "../sections/HomeServices";
import { renderHTML } from "../utility/Helper";

const Home = ({ headertData }) => {
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

  const [industryProducts, setIndustryProducts] = useState([]);

  const [industryLoading, setIndustryLoading] = useState(true);
  const getProductsData = async (page) => {
    setIndustryLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/industry/home`
      );
      // const response = await axios.get(
      //   `${process.env.REACT_APP_BASE_URL}/industry?page=${page}`
      // );
      setIndustryProducts(response.data.industrys);
      setIndustryLoading(false);
    } catch (error) {
      console.log("Error fetching:", error);
      setIndustryLoading(false);
    }
  };

  useEffect(() => {
    if (industryLoading) {
      getProductsData();
    }
  }, [industryLoading]);

  return (
    <>
      <Navbar3 isMobile={isMobile} />

      <Header
        title={
          headertData &&
          headertData.homeHeading && (
            <div
              dangerouslySetInnerHTML={renderHTML(headertData.homeHeading)}
            />
          )
        }
        description={
          headertData &&
          headertData.homeDescription && (
            <div
              dangerouslySetInnerHTML={renderHTML(headertData.homeDescription)}
            />
          )
        }
        backgroundImage={
          headertData && headertData.homeImage
            ? `${process.env.REACT_APP_IMAGE_URL}/${headertData.homeImage}`
            : headerImg2
        }
        showButton={true}
        height="75vh"
      />
      <ProductCard />

      <HomeServices
        industryProducts={industryProducts}
        industryLoading={industryLoading}
      />
      <HomeServicesCards />
      <HomePartner />
      <Business />
      <HomeAbout2 />
    </>
  );
};

export default Home;
