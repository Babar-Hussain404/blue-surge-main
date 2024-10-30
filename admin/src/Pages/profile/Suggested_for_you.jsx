import React from "react";
import { Link } from "react-router-dom";
import leftarrow from "../../assets/imgs/suggestioncarousel/leftarrow.svg";
import rightarrow from "../../assets/imgs/suggestioncarousel/rightarrow.svg";
import eye from "../../assets/imgs/eye.svg";
import removepost from "../../assets/imgs/post/removepost.svg";
import "react-toastify/dist/ReactToastify.css";

const Suggested_for_you = () => {
  const suggestions = [
    {
      imgSrc:
        "https://s3-alpha-sig.figma.com/img/b212/a004/cd7ac30fdf9725b3be0025a28e4dfd71?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=JLOUtQWs5hhyn8qMgmMaTGx2i7-s-re6pCRtxtK3dHUAs~G~WHhNevenkC6nlqyDUbIx4th7zL53E-OTbQ43XPxUTRNuyGV7hYn3PxM8ULCuIqiRpb6NV1AiYxEUn5bJZFvKzAXRApYmeud8lBfKeDy~LXIfDhLcOWaFT7Pde4JM9gyvNwmBE9y3Nu3NejCHkp964d2Bldv~pZ9OOLQ31i8BI4As2w~MA1pTj4hkQOKORoIKoWZR2vjzkWE0OhiJUSxattT~tS6g6bXFWWC7ZJouPauUTokeIpNcpSxR5kRb1Q2Ldr4QRvXLrvREibhTH6NtUPZuZwadiVm3W0JFBg__",
      title: "Farmer",
    },
    {
      imgSrc: "img/placeholders/avatars/avatar15.jpg",
      title: "Hammad",
    },
    {
      imgSrc: "img/placeholders/avatars/avatar15.jpg",
      title: "patric",
    },
    {
      imgSrc: "img/placeholders/avatars/avatar15.jpg",
      title: "stuart broad",
    },
    {
      imgSrc: "img/placeholders/avatars/avatar15.jpg",
      title: "stuart broad",
    },
    {
      imgSrc: "img/placeholders/avatars/avatar15.jpg",
      title: "stuart broad",
    },
    {
      imgSrc: "img/placeholders/avatars/avatar15.jpg",
      title: "stuart broad",
    },
    {
      imgSrc: "img/placeholders/avatars/avatar15.jpg",
      title: "stuart broad",
    },
    {
      imgSrc: "img/placeholders/avatars/avatar15.jpg",
      title: "stuart broad",
    },
  ];
  const renderSuggestions = () => {
    const rows = [];
    for (let i = 0; i < suggestions.length; i += 3) {
      const row = suggestions.slice(i, i + 3).map((suggestion, index) => (
        <div className="col-sm-4" key={index}>
          <div className="follow_widget_right_modal  center_top_profile">
            <div
              style={{
                display: "flex",
                justifyContent: "end",
                marginRight: "10px",
                marginTop: "10px",
              }}
            >
              <button style={{ border: "0", backgroundColor: "white" }}>
                <img src={removepost} alt="" />
              </button>
            </div>
            <div className="follow_widget_right_full">
              <a href="/">
                <img
                  src="img/placeholders/avatars/avatar2.jpg"
                  alt="avatar"
                  className="follow_widget_right    img_circle_border"
                />
                <strong>{suggestion.title}</strong>
              </a>
              <div style={{ marginTop: "-4rem" }} className="text-right">
                <button className="follow_btn_right theme_color2_background">
                  <small>Follow</small>
                </button>
              </div>
            </div>
          </div>
        </div>
      ));
      rows.push(
        <div className={i === 0 ? "active item gallery" : "item gallery"}>
          <div className="row" key={i}>
            {row}
          </div>
        </div>
      );
    }
    return rows;
  };
  return (
    <div className="block Profile_Suggested_Container">
      <div className="suggestion_title">
        <span className="Profile_Suggested_Name">Suggested for you</span>
      </div>
      <span className="Profile_Suggested_Private"
        style={{
          color: "var(--text-color, #181818)",
          fontSize: "14px",
          fontStyle: "normal",
          fontWeight: "600",
          lineHeight: "150%",
        }}
      >
        <span>
          <img src={eye} alt="" /> Private to you
        </span>
      </span>
      <div id="example-carousel4" className="carousel slide">
        <div className="carousel-inner">{renderSuggestions()}</div>
        <a
          className="left carousel-control no-hover"
          href="#example-carousel4"
          data-slide="prev"
        >
          <span>
            <img src={leftarrow} />
          </span>
        </a>
        <a
          className="right carousel-control no-hover"
          href="#example-carousel4"
          data-slide="next"
        >
          <span>
            <img src={rightarrow} />
          </span>
        </a>
      </div>
      <div className="suggestion_footer1">
        <div className="suggestion_footer">
          <Link to={`/discover-people`}>See All</Link>
        </div>
      </div>
    </div>
  );
};

export default Suggested_for_you;
