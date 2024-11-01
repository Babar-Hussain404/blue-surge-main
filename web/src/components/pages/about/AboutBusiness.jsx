import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import cross from "../../../assets/imgs/aboutimgs/pastcross.png";
import about_business from "../../../assets/imgs/Blue surge_About Us_Icons_Images/icons/about_business.png";
import { formatText } from "../../utility/Helper";

const AboutBusiness = () => {
  const [businessNameHead, setBusinessNameHead] = useState("EW");
  const [businessDetailHead, setBusinessDetailHead] = useState("");
  const [businessId, setBusinessId] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const handleItemClick = (index, name, detai, id) => {
    setActiveIndex(index);
    setBusinessNameHead(name);
    setBusinessDetailHead(detai);
    setBusinessId(id);
  };

  const [smallMobile, setSmallMobile] = useState(window.innerWidth <= 426);
  useEffect(() => {
    const handleResizeMobile = () => {
      setActiveIndex(null);
      setSmallMobile(window.innerWidth <= 426);
    };

    window.addEventListener("resize", handleResizeMobile);

    return () => {
      window.removeEventListener("resize", handleResizeMobile);
    };
  }, []);

  // get industry

  const [partnerData, setPartnerData] = useState();
  const [partnerLoading, setPartnerLoading] = useState(true);
  const getAboutTeamData = async () => {
    try {
      const response = await axios.get(
        `https://web.bluesurge.com.pk/industry/list`
      );
      setPartnerData(response.data.industries);
      setPartnerLoading(false);

      // Set the initial active tab to the first item
      if (response.data.industries?.length > 0) {
        const firstItem = response.data.industries[0];
        setBusinessNameHead(firstItem.name);
        setBusinessDetailHead(firstItem.detail);
        setBusinessId(firstItem._id);
        setActiveIndex(0);
      }
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
    <>
      <div className="about_business_cls">
        {partnerData && (
          <div className="about_heading">
            <div className="first_heading">
              <h2 className="first_title">
                <span className="underline-part">Our B</span>usinesses
              </h2>
            </div>
          </div>
        )}

        <div className="about_business">
          <div
            className={`about_business_left ${
              smallMobile && activeIndex !== null ? "d-none" : ""
            }`}
          >
            <div className="about_business_left_box">
              {partnerData &&
                partnerData.map((business, index) => {
                  return (
                    <>
                      <div
                        key={index}
                        onClick={() =>
                          handleItemClick(
                            index,
                            business.name,
                            business.detail,
                            business._id
                          )
                        }
                        className={`about_business_left_box_item ${
                          index === activeIndex
                            ? "about_business_left_box_item_active"
                            : ""
                        }`}
                      >
                        <img
                          src={about_business}
                        />
                        <span className="box_heading_business_about">
                          {business.name}
                        </span>
                      </div>
                    </>
                  );
                })}
            </div>
          </div>
          <div
            className={`about_business_right ${
              smallMobile && activeIndex === null ? "d-none" : ""
            }`}
          >
            <div className="d-flex">
              <img
                className={`rotated-element ${!smallMobile ? "d-none" : ""}`}
                onClick={() => handleItemClick(null, null)}
                src={cross}
                alt="Cross Icon"
              />
              <p className="about_business_right_heading">{businessNameHead}</p>
            </div>
            <br />
            <br />
            <p className="about_business_right_paragraph">
              {formatText(businessDetailHead)}
            </p>

            <Link
              to={`/industry-detail/${businessId}`}
              className="mission_btn  "
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutBusiness;
