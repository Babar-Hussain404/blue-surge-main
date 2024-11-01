import axios from 'axios';
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "../../../../src/assets/css/style.css";
import "../../../assets/css/style.css";
import arrowImage from "../../../assets/icons/arrowImage.png";
import arrow1 from "../../../assets/icons/sliderarrow.svg";
import arrow2 from "../../../assets/icons/sliderarrow2.svg";
import '../../../components/cards/homecard.css';
import { renderHTML } from '../../utility/Helper';
const NextArrow = (props) => {
    const { className, onClick } = props;
    return (
        <div className="arrow-card-1" onClick={onClick}>
            <img
                className="arrow-card-1-size"
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
        <div className="arrow-card-2" onClick={onClick}>
            <img
                className="arrow-card-2-size"
                style={{
                    height: "3rem",
                }}
                src={arrow2}
                alt="Next"
            />
        </div>
    );
};

const ProductDetailcard = () => {

    const [shuffleProducts, setShuffleProducts] = useState([]);

    const [productLoading, setProductLoading] = useState(true)
    const getProductsData = async (page) => {
        setProductLoading(true)
        try {
            const response = await axios.get(`https://web.bluesurge.com.pk/product/random`);
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
        <>

            <div className="first_heading">
                <h2 className="first_title">
                    More Related <span className="underline-part">
                        Produ</span>cts
                </h2>
            </div>
            <div className="margin-top" style={{ marginBottom: '4rem' }}>
                <div className="">
                    <Slider {...settings}>
                        {shuffleProducts.map((product, index) => (
                            <div key={index}>
                                <Link to={`/products-details/${product._id}`}>
                                    <Card
                                        className="product-card business-card"
                                        style={{
                                            backgroundColor: "#00193C",
                                            width: "90%",
                                            height: "600px",
                                            borderRadius: "0",
                                            border: 'none'
                                        }}
                                    >
                                        <Card.Img
                                            className="card-img-no-border card-title"
                                            src={`https://admin.bluesurge.com.pk/uploads/${product && product.detailImage}`}
                                            style={{ height: '200px' }}

                                        />
                                        <Card.Body
                                            style={{ display: "flex", flexDirection: "column" }}
                                        >
                                            <Card.Title className="business-title-1">
                                                {product.name}
                                            </Card.Title>
                                            <Card.Text className="cardtext" style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
                                            {<div dangerouslySetInnerHTML={renderHTML(product.detail.split(' ').slice(0, 30).join(' '))} />}
                                                {/* {product.detail.split(' ').slice(0, 30).join(' ')} */}
                                                {product?.detail?.split(' ').length > 30
                                                    
                                                }
                                            </Card.Text>
                                            <div className="arrow-position">
                                                <img src={arrowImage} />
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </>
    );
};

export default ProductDetailcard;
