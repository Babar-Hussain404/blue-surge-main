import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import img from "../../assets/icons/homeImage/bussinessunimg.png";
import { renderHTML } from "../utility/Helper";
const Business = () => {
  const [RDData, setRDData] = useState({});
  const [RDLoading, setRDLoading] = useState(true);
  const getRDData = async (page) => {
    try {
      setRDLoading(true);
      const response = await axios.get(
        `https://web.bluesurge.com.pk/aboutus`
      );
      setRDData(response.data.about);
      setRDLoading(false);
    } catch (error) {
      console.log("Error fetching:", error);
      setRDLoading(false);
    }
  };
  useEffect(() => {
    if (RDLoading) {
      getRDData();
    }
  }, [RDLoading]);

  return (
    <>
      {RDData && RDData.vision && (
        <div style={{ marginTop: "60px" }}>
          <div
            className="text-container mt-2"
            style={{
              backgroundImage: `linear-gradient(to left, rgba(0,0,0,0.1), rgba(0,0,0,1)), url(${img})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              height: "100vh",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              objectFit: "cover",
            }}
          >
            <div className="first_heading">
              <h2 className="first_title margin-heading">
                {RDData && (
                  <>
                    <span className="underline-part">Our B</span>ussiness
                  </>
                )}
              </h2>
            </div>
            <p className="textCss">
              {RDData && RDData.vision && (
                <>
                  {
                    <div
                      dangerouslySetInnerHTML={renderHTML(
                        RDData &&
                          RDData.vision.split(" ").slice(0, 50).join(" ")
                      )}
                    />
                  }
                  {/* {formatText(RDData && RDData.vision.split(' ').slice(0, 50).join(' '))} */}
                  {RDData && RDData.vision.split(" ").length > 50}
                </>
              )}
            </p>
            <div className="bussiness-btn-pos">
              <Link to={"/about"} className="btn main_btn">
                More
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Business;
