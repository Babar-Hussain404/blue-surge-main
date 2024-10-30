import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import arrow from "../../../assets/industrydetail/arrow.svg";
import image1 from "../../../assets/industrydetail/image1.png";
import image2 from "../../../assets/industrydetail/image2.png";
import image3 from "../../../assets/industrydetail/image3.png";
import image4 from "../../../assets/industrydetail/image4.png";
import image5 from "../../../assets/industrydetail/image5.png";
import image6 from "../../../assets/industrydetail/image6.png";
import image7 from "../../../assets/industrydetail/image7.png";



const IndustryProductItem = ({id}) => {
  


//get data 
const [partnerData, setPartnerData] = useState();
const [partnerLoading, setPartnerLoading] = useState(true);
const getAboutTeamData = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/product/industry/${id}`
    ); 
    setPartnerData(response.data.products);
    setPartnerLoading(false);
  } catch (error) {
    console.log("Error fetching:", error);
    setPartnerLoading(false);
  }
}; 
useEffect(() => {
  if (partnerLoading) {
    getAboutTeamData();
  }
}, [partnerLoading]);

  return (
    <div className="industry_detail_product">
      {partnerData && partnerData?.length>0? partnerData?.map((item, index) => {
        return (
          <>
          <Link to={`/products-details/${item._id}`}>
          
            <div key={index} className="industry_detail_product_card">
              <img
                src={`${process.env.REACT_APP_IMAGE_URL}/${item.thumbnailImage}`}
                alt="Card 3"
                className="industry_detail_product_img"
              />
              <div 
                className={`industry_detail_product_card_bottom`}
              >
                <p className="industry_detail_service_text">{item.name}</p>
                <img
                  src={arrow}
                  alt="Card 3"
                  className="industry_detail_service_img"
                />
              </div>
            </div>
            </Link>
          </>
        );
      })
    :
    <div className="nodata_msg ">
      <p className="">Opps! There is no Products</p>
      </div>
    }
    </div>
  );
};

export default IndustryProductItem;
