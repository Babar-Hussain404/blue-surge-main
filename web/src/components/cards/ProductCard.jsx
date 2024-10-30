import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "../../../src/assets/css/style.css";
import "../../assets/css/style.css";
import arrowImage from "../../assets/icons/arrowImage.png";
import arrow1 from "../../assets/icons/sliderarrow.svg";
import arrow2 from "../../assets/icons/sliderarrow2.svg";
import "../../components/cards/homecard.css";
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

const ProductCard = () => {
  const [shuffleProducts, setShuffleProducts] = useState([]);
  const [productLoading, setProductLoading] = useState(true);

  const getProductsData = async () => {
    setProductLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/product/random`
      );
      setShuffleProducts(response.data.products);
      setProductLoading(false);
    } catch (error) {
      console.log("Error fetching products:", error);
      setProductLoading(false);
    }
  };

  useEffect(() => {
    if (productLoading) {
      getProductsData();
    }
  }, [productLoading]);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
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
      {shuffleProducts && shuffleProducts?.length > 0 && (
        <div className="first_heading">
          <h2 className="first_title heading-card1-margin">
            <span className="underline-part">Our P</span>roducts
          </h2>
        </div>
      )}
      <div className="margin-top">
        <div className="card-position">
          {shuffleProducts?.length > 1 ? (
            <Slider {...settings}>
              {shuffleProducts?.map((product, index) => (
                <Link
                  to={`/products-details/${product._id}`}
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
                      className="img_heightwidth card-img-no-border card-title"
                      src={`${process.env.REACT_APP_IMAGE_URL}/${
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
                        {/* {formatText(product.detail)} */}
                        {
                          <div
                            dangerouslySetInnerHTML={renderHTML(
                              product.detail.split(" ").slice(0, 30).join(" ")
                            )}
                          />
                        }
                        {
                          product.detail.split(" ")?.length > 30
                          // <Link to={`/products-details/${product._id}`} style={{ color: '#137BF0', fontWeight: 'bold', fontSize: '2rem' }} className="read-more-link">
                          //   Read more
                          // </Link>
                        }
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
            shuffleProducts.map((product, index) => (
              <div key={index}>
                <Link to={`/products-details/${product._id}`}>
                  <Card
                    className="product-card business-card"
                    style={{
                      backgroundColor: "#00193C",
                      width: "30%",
                      height: "600px",
                      borderRadius: "0",
                      border: "none",
                      margin: "0 auto",
                    }}
                  >
                    <Card.Img
                      className="card-img-no-border card-title"
                      src={`${process.env.REACT_APP_IMAGE_URL}/${
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
                        {/* {formatText(product.detail)} */}
                        {
                          <div
                            dangerouslySetInnerHTML={renderHTML(
                              product.detail.split(" ").slice(0, 30).join(" ")
                            )}
                          />
                        }
                        {
                          product.detail.split(" ")?.length > 45
                          // <Link to={`/products-details/${product._id}`} style={{ color: '#137BF0', fontWeight: 'bold', fontSize: '2rem' }} className="read-more-link">
                          //   Read more
                          // </Link>
                        }
                      </Card.Text>
                      <Link
                        to={`/products-details/${product._id}`}
                        className="arrow-position"
                      >
                        <img src={arrowImage} alt="arrow" />
                      </Link>
                    </Card.Body>
                  </Card>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
