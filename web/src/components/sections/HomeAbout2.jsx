import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { renderHTML } from "../utility/Helper";
const HomeAbout2 = () => {
  const [aboutData, setAboutData] = useState();
  const [aboutLoading, setAboutLoading] = useState(true);
  const getAboutData = async (page) => {
    try {
      const response = await axios.get(
        `https://web.bluesurge.com.pk/aboutus`
      );
      setAboutData(response.data.about);
      setAboutLoading(false);
    } catch (error) {
      console.log("Error fetching:", error);
      setAboutLoading(false);
    }
  };
  useEffect(() => {
    if (aboutLoading) {
      getAboutData();
    }
  }, [aboutLoading]);

  return (
    <>
      {aboutData && aboutData.whoWeAre && (
        <div className="home_about">
          <div className="home_about_item1" style={{ marginTop: "-4rem" }}>
            <div className="main-home-text">
              <div className="first_heading">
                <h2 className="first_title about-heading-title">
                  <span className="">Who</span>&nbsp;
                  <span
                    style={{ fontFamily: "inter" }}
                    className="business-title2"
                  >
                    we are
                  </span>
                </h2>
              </div>
              <p className="home-about-text">
                {aboutData && aboutData.whoWeAre && (
                  <>
                   {
                    <div
                      dangerouslySetInnerHTML={renderHTML(aboutData.whoWeAre.split(" ").slice(0, 150).join(" "))}
                    />
                  }
                    {/* {aboutData.whoWeAre.split(" ").slice(0, 150).join(" ")} */}
                    {aboutData?.whoWeAre?.split(" ").length > 40 && (
                      <>
                        <br />
                        <Link
                          to={`/about`}
                          style={{
                            color: "#137BF0",
                            fontWeight: "bold",
                            fontSize: "2rem",
                          }}
                          className="read-more-link"
                        >
                          {`Read more`}
                        </Link>
                      </>
                    )}
                  </>
                )}
              </p>
            </div>
          </div>
          <div className="home_about_item2">
            <div className="single-blog">
              <div className="image-box">
                <div className="home_about_img_size">
                  <img
                    className="img_heightwidth"
                    // src={img}
                    src={`https://admin.bluesurge.com.pk/uploads/${aboutData.whoWeAreImage}`}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HomeAbout2;
