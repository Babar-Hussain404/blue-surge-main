import React, { useEffect, useState } from "react";
import polygon from "../../../assets/imgs/Blue surge_About Us_Icons_Images/icons/polygon.svg";
import aboutVector from "../../../assets/imgs/aboutimgs/aboutVector.png";
import card3 from "../../../assets/imgs/aboutimgs/aboutcard3.png";
import cross from "../../../assets/imgs/aboutimgs/pastcross.png";
import { formatText, renderHTML } from "../../utility/Helper";
import "./about2.css";

const PastandBusiness = ({ aboutData }) => {
  const [activeIndex, setActiveIndex] = useState(3);

  const handleCardClick = (index) => {
    if (activeIndex === index) {
      setActiveIndex(3);
    } else {
      setActiveIndex(index);
    }
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

  return (
    <>
      <div className="first_heading center_heading">
        <h2 className="first_title about_team_size ">
          <span className="underline-part">Past </span> & Present
        </h2>
      </div>

      <div className="past_and_presentCls">
        <div className="past_and_present">
          <div>
            <div
              className={`past_and_presentCard ${
                activeIndex === 0 ? "past_and_presentCard_active" : ""
              }`}
              onClick={() => handleCardClick(0)}
            >
              <p className="past_and_presentCard_text">History</p>
              <img
                src={activeIndex === 0 ? aboutVector : card3}
                alt="Card 3"
                className="past_and_presentCard_img"
              />
            </div>
            {activeIndex === 0 ? (
              <>
                <div className="triangle_radius">
                  <img src={polygon} />
                </div>
                <div
                  className={`container-about-past ${
                    smallMobile ? "" : "d-none"
                  }`}
                >
                  <div onClick={() => handleCardClick(3)} className="container">
                    <img className="cross-about" src={cross} alt="Cross" />
                  </div>

                  <p className="about-past-text">
                    {aboutData && (
                      <div
                        dangerouslySetInnerHTML={renderHTML(aboutData.history)}
                      />
                    )}
                  </p>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          <div>
            <div
              className={`past_and_presentCard ${
                activeIndex === 1 ? "past_and_presentCard_active" : ""
              }`}
              onClick={() => handleCardClick(1)}
            >
              <p className="past_and_presentCard_text">Leadership</p>
              <img
                src={activeIndex === 1 ? aboutVector : card3}
                alt="Card 3"
                className="past_and_presentCard_img"
              />
            </div>
            {activeIndex === 1 ? (
              <>
                <div className="triangle_radius">
                  <img src={polygon} />
                </div>
                <div
                  className={`container-about-past ${
                    smallMobile ? "" : "d-none"
                  }`}
                >
                  <div onClick={() => handleCardClick(3)} className="container">
                    <img className="cross-about" src={cross} alt="Cross Icon" />
                  </div>

                  <p className="about-past-text">
                    {aboutData && (
                      <div
                        dangerouslySetInnerHTML={renderHTML(
                          aboutData.leaderShip
                        )}
                      />
                    )}
                  </p>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          <div>
            <div
              className={`past_and_presentCard ${
                activeIndex === 2 ? "past_and_presentCard_active" : ""
              }`}
              onClick={() => handleCardClick(2)}
            >
              <p className="past_and_presentCard_text">Governance</p>
              <img
                src={activeIndex === 2 ? aboutVector : card3}
                alt="Card 3"
                className="past_and_presentCard_img"
              />
            </div>
            {activeIndex === 2 ? (
              <>
                <div className="triangle_radius">
                  <img src={polygon} />
                </div>
                <div
                  className={`container-about-past ${
                    smallMobile ? "" : "d-none"
                  }`}
                >
                  <div onClick={() => handleCardClick(3)} className="container">
                    <img className="cross-about" src={cross} alt="Cross Icon" />
                  </div>

                  <p className="about-past-text">
                    {aboutData && (
                      <div
                        dangerouslySetInnerHTML={renderHTML(
                          aboutData.governance
                        )}
                      />
                    )}
                  </p>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
        {activeIndex === 0 ? (
          <div
            className={`container-about-past ${!smallMobile ? "" : "d-none"}`}
          >
            <div onClick={() => handleCardClick(3)} className="container">
              <img className="cross-about" src={cross} alt="Cross Icon" />
            </div>

            <p className="about-past-text">
              {aboutData && formatText(aboutData.history)}
            </p>
          </div>
        ) : (
          <>
            {activeIndex === 1 ? (
              <div
                className={`container-about-past ${
                  !smallMobile ? "" : "d-none"
                }`}
              >
                <div onClick={() => handleCardClick(3)} className="container">
                  <img className="cross-about" src={cross} alt="Cross Icon" />
                </div>

                <p className="about-past-text">
                  {aboutData && formatText(aboutData.leaderShip)}
                </p>
              </div>
            ) : (
              <>
                {activeIndex === 2 ? (
                  <div
                    className={`container-about-past ${
                      !smallMobile ? "" : "d-none"
                    }`}
                  >
                    <div
                      onClick={() => handleCardClick(3)}
                      className="container"
                    >
                      <img
                        className="cross-about"
                        src={cross}
                        alt="Cross Icon"
                      />
                    </div>

                    <p className="about-past-text">
                      {aboutData && (
                        <div
                          dangerouslySetInnerHTML={renderHTML(
                            aboutData.governance
                          )}
                        />
                      )}
                    </p>
                  </div>
                ) : (
                  <></>
                )}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default PastandBusiness;
