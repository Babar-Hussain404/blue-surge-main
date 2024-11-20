import axios from "axios";
import React, { useEffect, useState } from "react";
const ProductDetailIndustry = ({ productData }) => {
  const [shuffleProducts, setShuffleProducts] = useState([]);

  const [productLoading, setProductLoading] = useState(true);
  const getProductsData = async (page) => {
    setProductLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/service/${productData}`
      );
      setShuffleProducts(response.data.service);
      setProductLoading(false);
    } catch (error) {
      console.log("Error fetching:", error);
      setProductLoading(false);
    }
  };

  useEffect(() => {
    if (productData) {
    getProductsData();
    }
  }, [productData]);
  return (
    <>
      {productLoading ? (
        <div
          style={{
            textAlign: "center",
            height: "30vh",
            width: "100%",
          }}
          className="visible-lg"
        >
          <i className="fa fa-spinner fa-4x fa-spin"></i>
        </div>
      ) : (
        <>
          <div>
            <h2 className="detail-com-heading">
              {shuffleProducts && (
                <>
                  <span className="underline-part">
                    {shuffleProducts.name.slice(0, 5)}
                  </span>
                  {shuffleProducts.name.slice(5)}
                </>
              )}
              {/* {shuffleProducts.name} */}
            </h2>

            <p className="comunication-text">{shuffleProducts.detail}</p>
          </div>

          <div>
            <img
              className="communcation-img2"
              src={`${process.env.REACT_APP_IMAGE_URL}/${
                shuffleProducts && shuffleProducts.detailImage
              }`}
              alt="No Image Found"
            />
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetailIndustry;
