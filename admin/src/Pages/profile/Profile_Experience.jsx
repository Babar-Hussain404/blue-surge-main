import React from 'react'
import edit from "../../assets/imgs/post/edit.svg";
import plus from "../../assets/imgs/plus.svg";
import thrive from "../../assets/imgs/thrive.svg";
import Agrium from "../../assets/imgs/Agrium.svg";

const Profile_Experience = () => {
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
            Experience
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
                <img src={edit} alt="" />
              </button>
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
              src={Agrium}
              alt="avatar"
              className="widget-image img-circle pull-left "
              style={{ height: "60px", width: "60px" }}
            />
          </a>
          <h4
            className="widget-content"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <strong>Agrium</strong>
            <p
              style={{
                color: " var(--text-color, #181818)",
                fontSize: "13px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "150%",
              }}
            >
              Self Employed
              <p
                style={{
                  color: " var(--text-color, #181818)",
                  fontSize: "13px",
                  fontStyle: "normal",
                  fontWeight: "400",
                  lineHeight: "150%",
                  display: "flex",
                  alignItems: "center",
                  gap: "30px",
                }}
              >
                Jun 2016 — Present{" "}
                <span
                  style={{
                    color: "#747474",
                    fontSize: "12px",
                    fontStyle: "normal",
                    fontWeight: "400",
                    lineHeight: "150%",
                  }}
                >
                  3 yrs 3 mos
                </span>
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
                Work with clients and web studios as freelancer. Work in next
                areas: eCommerce web projects; creative landing pages; iOs and
                Android apps; corporate web sites and corporate identity
                sometimes.
              </p>
            </p>
          </h4>
        </div>

        <div className="widget-simple">
          <a href="/">
            <img
              // src="img/placeholders/avatars/avatar2.jpg"
              src={thrive}
              alt="avatar"
              className="widget-image img-circle pull-left img_circle_border"
              style={{ height: "60px", width: "60px" }}
            />
          </a>
          <h4
            className="widget-content"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <strong>United agricultural system</strong>
            <p
              style={{
                color: " var(--text-color, #181818)",
                fontSize: "13px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "150%",
              }}
            >
              Self Employed
              <p
                style={{
                  color: " var(--text-color, #181818)",
                  fontSize: "13px",
                  fontStyle: "normal",
                  fontWeight: "400",
                  lineHeight: "150%",
                  display: "flex",
                  alignItems: "center",
                  gap: "30px",
                }}
              >
                Jun 2016 — Present{" "}
                <span
                  style={{
                    color: "#747474",
                    fontSize: "12px",
                    fontStyle: "normal",
                    fontWeight: "400",
                    lineHeight: "150%",
                  }}
                >
                  3 yrs 3 mos
                </span>
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
                Work with clients and web studios as freelancer. Work in next
                areas: eCommerce web projects; creative landing pages; iOs and
                Android apps; corporate web sites and corporate identity
                sometimes.
              </p>
            </p>
          </h4>
        </div>
      </div>
  )
}

export default Profile_Experience