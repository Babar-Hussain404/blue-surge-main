import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import arrowImage from "../../assets/icons/arrowImage.png";
import arrow1 from "../../assets/icons/sliderarrow.svg";
import arrow2 from "../../assets/icons/sliderarrow2.svg";
import { renderHTML } from "../utility/Helper";

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="arrow-card-1" onClick={onClick}>
      <img
        className="arrow-card-1-size"
        style={{ height: "3rem" }}
        src={arrow1}
        alt="Previous"
      />
    </div>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="arrow-card-2" onClick={onClick}>
      <img
        className="arrow-card-2-size"
        style={{ height: "3rem" }}
        src={arrow2}
        alt="Next"
      />
    </div>
  );
};

const HomeServicesCards = () => { 
  const industryid = useSelector((state) => state.homeServicesReducer);
  const [industryProducts, setIndustryProducts] = useState([]);
  const [industryLoading, setIndustryLoading] = useState(true);

  const getProductsData = async (page) => {
    setIndustryLoading(true);
    try {
      let response = [];
      response = await axios.get(
        `https://web.bluesurge.com.pk/service/home/industry?industryId=${industryid}`
      );
      if (response.data?.services?.length === 0) {
        response = await axios.get(
          `https://web.bluesurge.com.pk/service/home/industry`
        );
      }
      setIndustryProducts(response.data?.services);
      setIndustryLoading(false);
    } catch (error) {
      console.log("Error fetching:", error);
      setIndustryLoading(false);
    }
  };

  useEffect(() => {
    if (industryid) getProductsData();
  }, [industryid]);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="margin-top">
        <div className="card-position">
          {industryLoading ? (
            <div
              style={{
                textAlign: "center",
                height: "30vh",
                width: "100%",
                color: "white",
              }}
              className="visible-lg"
            >
              <i className="fa fa-spinner fa-4x fa-spin"></i>
            </div>
          ) : (
            <>
              {industryProducts?.length > 1 ? (
                <Slider {...settings}>
                  {industryProducts.map((product, index) => (
                    <Link
                      to={`/service-details/${product._id}`}
                      key={index}
                      style={{ textDecoration: "none" }}
                    >
                      <Card
                        className="product-card business-card"
                        style={{
                          backgroundColor: "#00193C",
                          width: "90%",
                          height: "600px",
                          borderRadius: "0",
                          border: "none",
                        }}
                      >
                        <Card.Img
                          className="card-img-no-border card-title"
                          src={`https://admin.bluesurge.com.pk/uploads/${
                            product && product.thumbnailImage
                          }`}
                          style={{ height: "200px" }}
                        />
                        <Card.Body
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <Card.Title className="business-title-1">
                            {product.name}
                          </Card.Title>
                          <Card.Text
                            className="cardtext"
                            style={{ fontSize: "1.5rem", marginBottom: "1rem" }}
                          >
                            <div
                              dangerouslySetInnerHTML={renderHTML(
                                product?.detail
                                  ?.split(" ")
                                  .slice(0, 45)
                                  .join(" ")
                              )}
                            />
                            <div
                              dangerouslySetInnerHTML={renderHTML(
                                product?.detail?.split(" ")?.length > 45 &&
                                  "..."
                              )}
                            /> 
                          </Card.Text>
                          <div className="arrow-position">
                            <img src={arrowImage} alt="arrow" />
                          </div>
                        </Card.Body>
                      </Card>
                    </Link>
                  ))}
                </Slider>
              ) : (
                industryProducts?.map((product, index) => (
                  <Link
                    to={`/service-details/${product._id}`}
                    key={index}
                    style={{ textDecoration: "none" }}
                  >
                    <Card
                      className="product-card business-card"
                      style={{
                        backgroundColor: "#00193C",
                        width: "50%",
                        height: "600px",
                        borderRadius: "0",
                        border: "none",
                      }}
                    >
                      <Card.Img
                        className="card-img-no-border card-title"
                        src={`https://admin.bluesurge.com.pk/uploads/${
                          product && product.thumbnailImage
                        }`}
                        style={{ height: "200px" }}
                      />
                      <Card.Body
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        <Card.Title className="business-title-1">
                          {product.name}
                        </Card.Title>
                        <Card.Text
                          className="cardtext"
                          style={{ fontSize: "1.5rem", marginBottom: "1rem" }}
                        >
                           <div
                              dangerouslySetInnerHTML={renderHTML(
                                product?.detail
                                  ?.split(" ")
                                  .slice(0, 45)
                                  .join(" ")
                              )}
                            />
                            <div
                              dangerouslySetInnerHTML={renderHTML(
                                product?.detail?.split(" ")?.length > 45 &&
                                  "..."
                              )}
                            /> 
                        </Card.Text>
                        <div className="arrow-position">
                          <img src={arrowImage} alt="arrow" />
                        </div>
                      </Card.Body>
                    </Card>
                  </Link>

                  // <div key={index}>
                  //   <Link to={`/products-details/${product?._id}`}>
                  //     <Card
                  //       className="product-card business-card"
                  //       style={{
                  //         backgroundColor: "#00193C",
                  //         width: "100%",
                  //         height: "600px",
                  //         borderRadius: "0",
                  //         border: "none",
                  //         margin: "0 auto",
                  //       }}
                  //     >
                  //       <Card.Img
                  //         className="card-img-no-border card-title"
                  //         src={`https://admin.bluesurge.com.pk/uploads/${
                  //           product && product?.thumbnailImage
                  //         }`}
                  //         style={{ height: "200px" }}
                  //       />
                  //       <Card.Body
                  //         style={{ display: "flex", flexDirection: "column" }}
                  //       >
                  //         <Card.Title className="business-title-1">
                  //           {product?.name}
                  //         </Card.Title>
                  //         <Card.Text
                  //           className="cardtext"
                  //           style={{ fontSize: "1.5rem", marginBottom: "1rem" }}
                  //         >
                  //           {product?.detail?.split(" ").slice(0, 45).join(" ")}
                  //           {product?.detail?.split(" ")?.length > 45 && "..."}
                  //         </Card.Text>
                  //         <Link
                  //           to={`/products-details/${product?._id}`}
                  //           className="arrow-position"
                  //         >
                  //           <img src={arrowImage} alt="arrow" />
                  //         </Link>
                  //       </Card.Body>
                  //     </Card>
                  //   </Link>
                  // </div>
                ))
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default HomeServicesCards;
