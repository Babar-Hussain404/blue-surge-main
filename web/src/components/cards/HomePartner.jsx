import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import arrow2 from "../../assets/icons/sliderarrow.svg";
import arrow1 from "../../assets/icons/sliderarrow2.svg";
import "./homecard.css";
const NextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div className="arrow-partner-1" onClick={onClick}>
      <img
        style={{
          height: "3rem",
        }}
        src={arrow2}
        alt="Previous"
      />
    </div>
  );
};

const PrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div className="arrow-partner-2" onClick={onClick}>
      <img
        style={{
          height: "3rem",
        }}
        src={arrow1}
        alt="Next"
      />
    </div>
  );
};
const HomePartner = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },

      {
        breakpoint: 426,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const [isHovered, setIsHovered] = useState(false);

  const [partnerData, setPartnerData] = useState([]);

  const [partnerLoading, setPartnerLoading] = useState(true);
  const getPartnerData = async (page) => {
    setPartnerLoading(true);
    try {
      const response = await axios.get(
        `https://web.bluesurge.com.pk/partners`
      );
      setPartnerData(response.data.partner);
      setPartnerLoading(false);
    } catch (error) {
      console.log("Error fetching:", error);
      setPartnerLoading(false);
    }
  };
  useEffect(() => {
    if (partnerData && partnerLoading) {
      getPartnerData();
    }
  }, [partnerData, partnerLoading]);
  return (
    <>
      {partnerData && partnerData?.length > 0 && (
        <div className="first_heading">
          <h2 className="first_title heading-card1-margin">
            <span className="underline-part">Our P</span>artners
          </h2>
        </div>
      )}
      <div className=" section-spacing margin-top">
        <div className="card-position">
          {partnerData?.length > 1 ? (
            <Slider {...settings}>
              {partnerData &&
                partnerData?.map((product, index) => (
                  <div key={index} className="img-container">
                    <a
                      href={product?.title}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        className="img-margin"
                        style={{ marginLeft: "6rem" }}
                        src={`https://admin.bluesurge.com.pk/uploads/${product?.image}`}
                      />
                    </a>
                  </div>
                ))}
            </Slider>
          ) : (
            partnerData &&
            partnerData?.map((product, index) => (
              <div key={index} className="img-container">
                <a
                  href={product?.title}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className="img-hover img-margin"
                    style={{ marginLeft: "6rem", width: "150px" }}
                    src={`https://admin.bluesurge.com.pk/uploads/${product?.image}`}
                  />
                </a>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default HomePartner;
