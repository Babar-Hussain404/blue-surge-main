import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import img1 from "../../../../src/assets/imgs/productImgs/banner.png";
import Navbar3 from "../../Navbar/Navbar3.jsx";
import "../../pages/product/ProductDetailcard.jsx";
import ProductDetailcard from "../../pages/product/ProductDetailcard.jsx";
import "../../pages/product/productDetail.css";
import Header from "../../sections/Header";
import { renderHTML } from "../../utility/Helper.jsx";
import Modal from "../../utility/Modal.jsx";
const ProductDetail = () => {
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
  const [productLoading, setProductLoading] = useState(true);
  const [productData, setProductData] = useState(true);
  const getSingleProductsData = async (page) => {
    setProductLoading(true);
    try {
      const response = await axios.get(
        `https://web.bluesurge.com.pk/product/${id}`
      );
      const formData = response.data.product;
      const featuresArray = formData.features.map((item) => JSON.parse(item));
      setProductData({
        features: featuresArray.length > 0 ? featuresArray[0] : [],
        detail: formData.detail,
        industryId: formData.industryId,
        serviceId: formData.serviceId,
        name: formData.name,
        thumbnailImage: formData.thumbnailImage,
        video: formData.video,
        detailImage: formData.detailImage,
        video_description: formData.video_description,
      });
      // setProductData(response.data.product);
      setProductLoading(false);
    } catch (error) {
      console.log("Error fetching:", error);
      setProductLoading(false);
    }
  };
  useEffect(() => {
    if (id) {
      getSingleProductsData();
    }
  }, [id]);
  return (
    <>
      <Helmet>
        <title>
          {productData && productData.name ? productData.name : "Blue Surge"}
        </title>
        <meta
          name="description"
          content={
            productData && productData.detail
              ? productData.detail
              : "Blue Surge Description"
          }
        />
        <meta
          name="keywords"
          content={
            productData && productData.name
              ? productData.name
              : "Blue, Surge, keywords"
          }
        />
      </Helmet>

      <Navbar3 isMobile={isMobile} />

      <Header backgroundImage={img1} height="50vh" showButton={false} />
      <div className="product-detail-container">
        {/* section 1 */}
        <div className="research-our-team">
          <div className="search-text-section" style={{ width: "40%" }}>
            <div className="first_heading">
              <h2 className="first_title" style={{ lineHeight: "40px" }}>
                {productData && productData.name && (
                  <>
                    <span className="underline-part">
                      {productData.name.slice(0, 5)}
                    </span>
                    {productData.name.slice(5)}
                  </>
                )}
              </h2>
            </div>

            <div className="research-development-section">
              {<div dangerouslySetInnerHTML={renderHTML(productData.detail)} />}
            </div>
          </div>

          <div className="mt-5">
            <img
              className="research_left_Img1"
              src={`https://admin.bluesurge.com.pk/uploads/${
                productData && productData.detailImage
              }`}
            />
          </div>
        </div>

        {/* sectin 2 */}
        <div className="first_heading">
          <h2 className="first_title" style={{ lineHeight: "40px" }}>
            Features
          </h2>
        </div>

        {/* section 3 */}

        <ul className="research-development-section feature-margin mt-5">
          <ul>
            {productData.features &&
              productData.features.map((feature, index) => (
                <li key={index}>{feature.name}</li>
              ))}
          </ul>
        </ul>

        {/* section 3 */}

        <div>
          {productData && productData.video && (
            <video
              className="video"
              width="860"
              height="515"
              controls
              style={{ maxWidth: "100%" }}
            >
              <source
                src={`https://admin.bluesurge.com.pk/uploads/${productData.video}`}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          )}
        </div>

        {/* section 4 */}

        <div className="reseach-section-2 prod-detail-sectio4">
          <p className="research-development-section">
            {
              <div
                dangerouslySetInnerHTML={renderHTML(
                  productData.video_description
                )}
              />
            }
          </p>
        </div>

        {/* section 4 */}

        <div>
          {/* <ProductDetailIndustry productData={productData.serviceId} />

          <ServiceIndustryDetail serviceData={productData.industryId} /> */}
        </div>

        <ProductDetailcard />
      </div>

      <Modal
        selectedServiceId={selectedServiceId}
        show={showModal}
        handleClose={handleCloseModal}
      />
    </>
  );
};

export default ProductDetail;
