import React from "react";
import plus from "../../assets/imgs/plus.svg";
import USA from "../../assets/imgs/USA.svg";
import "react-toastify/dist/ReactToastify.css";

const Profile_Education = () => {
  return (
    <div
      className="block"
      style={{
        borderRadius: "12px",
        border: "0.97px solid var(--div_boarder, #D9DDE7)",
        backgroundColor: "#FFF",
        boxShadow: " 0px 20px 60px 0px rgba(241, 244, 248, 0.50)",
      }}
    >
      <div className="suggestion_title">
        <span
          style={{
            color: " var(--text-color, #181818)",
            fontSize: "18px",
            fontStyle: "normal",
            fontWeight: "700",
            lineHeight: "normal",
          }}
        >
          Education
        </span>
        <span
          style={{
            color: "var(--text-color, #181818)",
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: "600",
            lineHeight: "150%",
          }}
        >
          <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
            <button style={{ border: "0", backgroundColor: "white" }}>
              <img src={plus} alt="" />
            </button>
          </div>
        </span>
      </div>

      <div className="widget-simple">
        <a href="/">
          <img
            // src="img/placeholders/avatars/avatar2.jpg"
            src={USA}
            alt="avatar"
            className="widget-image img-circle pull-left img_circle_border"
            style={{ height: "60px", width: "60px", padding: "10px" }}
          />
        </a>
        <h4
          className="widget-content"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <strong>USA Linguistic University</strong>
          <p
            style={{
              color: " var(--text-color, #181818)",
              fontSize: "13px",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "150%",
            }}
          >
            Bachelor's degree Field Of Agriculture
            <p
              style={{
                color: "#747474",
                fontSize: "12px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "150%",
              }}
            >
              3 yrs 3 mos
            </p>
            <p
              style={{
                color: " var(--text-color, #181818)",
                fontSize: "13px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "150%",
              }}
            >
              Lorem ipsum dolor sit amet consectetur. Sed ridiculus vitae et eu
              vitae. Risus odio maecenas fringilla erat tellus adipiscing amet.
              Ultrices ipsum donec eget.
            </p>
          </p>
        </h4>
      </div>
    </div>
  );
};

export default Profile_Education;
