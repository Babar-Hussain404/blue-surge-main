import axios from 'axios';
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import arrow1 from "../../../assets/icons/sliderarrow.svg";
import arrow2 from "../../../assets/icons/sliderarrow2.svg";
import arrowImage from "../../../assets/imgs/servicesimgs/arrow.png";
const NextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div className="arrow-1" onClick={onClick}>
      <img
        style={{
          height: "3rem",
        }}
        src={arrow1}
        alt="Previous"
      />
    </div>
  );
};

const PrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div className="arrow-2" onClick={onClick}>
      <img
        style={{
          height: "3rem",
        }}
        src={arrow2}
        alt="Next"
      />
    </div>
  );
};

const   RdProducts = () => {

  const [shuffleProducts, setShuffleProducts] = useState([]);

  const [productLoading, setProductLoading] = useState(true)
  const getProductsData = async (page) => {
    setProductLoading(true)
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/product/random`);
      setShuffleProducts(response.data.products);
      setProductLoading(false)
    } catch (error) {
      console.log("Error fetching:", error);
      setProductLoading(false)
    }
  };

  useEffect(() => {
    if (productLoading) {
      getProductsData();
    }
  }, [productLoading]);



  const settings = {
    // dots: true,
    infinite: true,
    // centerMode: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow className={"bg-dark"} />,
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
    <div>
      {shuffleProducts && shuffleProducts?.length > 0 && (<div className="first_heading">
        <h2 className="first_title">
          Our <span className="underline-part">Prod</span>ucts
        </h2>
      </div>
)}
      <div className="margin-top">
        <div className="">
          {shuffleProducts?.length > 1 ? (
          <Slider {...settings}>
            {shuffleProducts.map((product, index) => (
              <div key={index}>
                <Card
                  className="card-slier-size"
                  style={{
                    backgroundColor: "#092948",
                    width: "90%",
                    height: "310px",
                    borderRadius: "0",
                    border: "none",
                    marginBottom: "4rem",
                  }}
                >
                  <Card.Img
                    className="card-img-no-border card-title"
                    src={`${process.env.REACT_APP_IMAGE_URL}/${product && product.detailImage}`}
                    style={{ height: '210px' }}
                  />
                  <Card.Body>
                    <Link to={`/products-details/${product._id}`} className="product_heading">
                      {product.name}
                      <img style={{ width: "22px" }} src={arrowImage} />
                    </Link>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </Slider>) : (
              shuffleProducts.map((product, index) => (
                <div key={index}>
                  <Card
                    className="card-slier-size"
                    style={{
                      backgroundColor: "#092948",
                      width: "30%",
                      height: "310px",
                        
                      borderRadius: "0",
                      border: "none",
                      marginBottom: "4rem",
                    }}
                  >
                    <Card.Img
                      className="card-img-no-border card-title"
                      src={`${process.env.REACT_APP_IMAGE_URL}/${product && product.detailImage}`}
                      style={{ height: '210px' }}
                    />
                    <Card.Body>
                      <Link to={`/products-details/${product._id}`} className="product_heading">
                        {product.name}
                        <img style={{ width: "22px" }} src={arrowImage} />
                      </Link>
                    </Card.Body>
                  </Card>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RdProducts;
