import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import arrow from "../../../assets/bussiness/arrow.svg"
const ServiceDetailOurProducts = () => {
  let { id } = useParams()
  const [shuffleProducts, setShuffleProducts] = useState([]);

  const [productLoading, setProductLoading] = useState(true)
  const getProductsData = async (page) => {
    setProductLoading(true)
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/product/detail/${id}`);
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


  return (
    <>
      {shuffleProducts?.length > 0 && (
        <div className="first_heading" >
          <h2 className="first_title" style={{ lineHeight: '40px' }} >
            Our  <span className="underline-part" >  Prod</span>ucts
          </h2>
        </div>
      )}
      <div className="business_cards">
        {shuffleProducts.map((item, index) => {
          return (
            <>
              <div className="business_card">
                <img className="card_img"
                  src={`${process.env.REACT_APP_IMAGE_URL}/${item && item.detailImage
                    }`}

                />
                <div className="card_item">
                  <p className="card_heading">{item.name}</p>
                  <Link to={`/products-details/${item._id}`}>
                    <img className="card_arrow" src={arrow} />
                  </Link>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  )
}

export default ServiceDetailOurProducts
