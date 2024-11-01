import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Slider from "react-slick";
// import "../../../assets/css/style.css";
import "../../../../src/assets/css/style.css";
// import '../../../../'
import "../../../components/cards/homecard.css";

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="arrow-card-1-product" onClick={onClick}>
      {/* <img
        className="arrow-card-1-size"
        style={{ height: "3rem" }}
        src={arrow1}
        alt="Previous"
      /> */}
      <i
        class="fas fa-chevron-right"
        style={{ fontSize: "30px", color: "#00183C" }}
      ></i>
    </div>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="arrow-card-product" onClick={onClick}>
      {/* <img
        className="arrow-card-2-size"
        style={{ height: "3rem" }}
        src={arrow2}
        alt="Next"
      /> */}
      <i
        class="fas fa-chevron-left"
        style={{ fontSize: "30px", color: "#00183C" }}
      ></i>
    </div>
  );
};

const ResearchProducts = () => {
  const [shuffleProducts, setShuffleProducts] = useState([]);
  const [productLoading, setProductLoading] = useState(true);

  const getProductsData = async () => {
    setProductLoading(true);
    try {
      const response = await axios.get(
        `https://web.bluesurge.com.pk/product/random`
      );
      setShuffleProducts(response.data.products);
      setProductLoading(false);
    } catch (error) {
      console.log("Error fetching:", error);
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
            {shuffleProducts && shuffleProducts?.length > 0 && (<div className="first_heading">
                <h2 className="first_title heading-card fs-1">
                    Our R&D TECHNOLOGIES
                </h2>
            </div>)}
            <div className="margin-top">
                <div className="card-position-rd-products">
                    {shuffleProducts?.length > 1 ? (
                        <Slider {...settings}>
                            {shuffleProducts.map((product, index) => (
                                <Link to={`/products-details/${product._id}`} key={index} style={{ textDecoration: 'none' }}>
                                    <Card
                                        className="product-card-research business-card-research"
                                        style={{
                                            backgroundColor: '#092948',
                                            width: "90%",
                                            height: "450px",
                                            borderRadius: "0",
                                            border: 'none'
                                        }}
                                    >
                                        <Card.Img
                                            className="card-img-no-border card-title"
                                            src={`https://admin.bluesurge.com.pk/uploads/${product && product.thumbnailImage}`}
                                            style={{ height: '400px', objectFit: 'cover', }}
                                        />
                                        <Card.Body style={{ display: "flex", flexDirection: "column" }}>
                                            <Card.Title className="text-light fs-3">{product.name}</Card.Title>


                                        </Card.Body>
                                    </Card>
                                </Link>
                            ))}
                        </Slider>
                    ) : (
                        shuffleProducts.map((product, index) => (
                            <div key={index}>
                                <Link to={`/products-details/${product._id}`} >
                                    <Card
                                        className="product-card business-card"
                                        style={{
                                            backgroundColor: "#00193C",
                                            width: "30%",
                                            height: "600px",
                                            borderRadius: "0",
                                            border: 'none',
                                            margin: '0 auto'
                                        }}
                                    >
                                        <Card.Img
                                            className="card-img-no-border card-title"
                                            src={`https://admin.bluesurge.com.pk/uploads/${product && product.thumbnailImage}`}
                                            style={{ height: '200px' }}
                                        />
                                        <Card.Body style={{ display: "flex", flexDirection: "column" }}>
                                            <Card.Title className="business-title-1">{product.name}</Card.Title>

                                            {/* <Link to={`/products-details/${product._id}`} className="arrow-position">
                      <img src={arrowImage} alt="arrow" />
                    </Link> */}
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

export default ResearchProducts;
