import React from "react";
import { Link } from "react-router-dom";
import editsuggestions from "../../assets/imgs/suggestioncarousel/editsuggestions.svg";

const CompanyFollowing = () => {
  const suggestions = [
    {
      imgSrc: "img/placeholders/avatars/avatar15.jpg",
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
      title: "Aqib",
    },
  ];
  return (
    <>
      <div className="Conpany_Search_Followers_Container">
        <p className="Company_Followers">Following</p>
        <p>You are following 7 people</p>
        <form
          action="page_ready_search_results.html"
          className="navbar-form navbar-left"
          style={{ width: "100%" }}
        >
          <div className="form-group" style={{ width: "100%" }}>
            <input
              type="text"
              className="navbar-form-input Company_searchbar"
              placeholder="Search for your keywords.."
            />
          </div>
        </form>
      </div>

      <div
        style={{ background: "white", borderRadius: "15px", padding: "1rem", marginTop:"20px" }}
      >
        <div className="suggestion_title">
          <p>Meet New People</p>
          <p>
            <img src={editsuggestions} />
          </p>
        </div>
        {suggestions.map((suggestion, index) => {
          return (
            <>
              <div className="follow_widget_right_modal  center_top_profile">
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
                    <button className="follow_btn_right Company_Following_BTN">
                      <small>Following</small>
                    </button>
                  </div>
                </div>
              </div>
            </>
          );
        })}

        <div className="suggestion_footer1">
          <div className="suggestion_footer">
            <Link to={`/discover-people`}>See All</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyFollowing;
