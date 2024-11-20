import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import arrow from "../../../assets/industrydetail/arrow.svg";
const IndustryServiceItem = ({ id }) => {
  //get data 
  const [partnerData, setPartnerData] = useState();
  const [partnerLoading, setPartnerLoading] = useState(true);
  const getAboutTeamData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/service/industry/${id}`
      );
      setPartnerData(response.data.services);
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
    <div className="industry_detail_service">
      {partnerData && partnerData?.length > 0?
        partnerData.map((item, index) => {
          return (
            <>
              <Link to={`/service-details/${item._id}`}>
                <div key={index} className={`industry_detail_service_card`}>
                  <p className="industry_detail_service_text">{item.name}</p>
                  <img
                    src={arrow}
                    alt="Card 3"
                    className="industry_detail_service_img"
                  />
                </div>
              </Link>
            </>
          );
        }
      )
      :
      <div className="nodata_msg ">
      <p className="">Opps! There is no Services</p>
      </div>
    }
    </div>
  );
};

export default IndustryServiceItem;
