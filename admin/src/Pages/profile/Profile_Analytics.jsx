import React from 'react'
import eye from "../../assets/imgs/eye.svg";
import meetpeople from "../../assets/imgs/navicons/meetpeople.svg";
import { Link } from 'react-router-dom'

const Profile_Analytics = () => {
  return (
    <>
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
            Analytics
          </span>
        </div>
        <span
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
        <div class="row text-center animation-fadeIn">
          <div class="col-xs-4">
            <h3>
              <div>
                <img src={meetpeople} alt="" />
              </div>
              <strong
                style={{
                  color: "var(--text-color, #181818)",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: "700",
                  lineHeight: "150%",
                }}
              >
                4 Profile views
              </strong>
              <br />
              <small
                style={{
                  color: "var(--text-color, #181818)",
                  fontSize: "12px",
                  fontStyle: "normal",
                  fontWeight: "400",
                  lineHeight: "150%",
                }}
              >
                Discover who's viewed your profile
              </small>
            </h3>
          </div>
          <div class="col-xs-4">
            <h3>
              <div>
                <img src={meetpeople} alt="" />
              </div>
              <strong
                style={{
                  color: "var(--text-color, #181818)",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: "700",
                  lineHeight: "150%",
                }}
              >
                3 search appearances
              </strong>
              <br />
              <small
                style={{
                  color: "var(--text-color, #181818)",
                  fontSize: "12px",
                  fontStyle: "normal",
                  fontWeight: "400",
                  lineHeight: "150%",
                }}
              >
                See how often you appear in search results
              </small>
            </h3>
          </div>
          <div class="col-xs-4">
            <h3>
              <div>
                <img src={meetpeople} alt="" />
              </div>
              <strong
                style={{
                  color: "var(--text-color, #181818)",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: "700",
                  lineHeight: "150%",
                }}
              >
                3 search appearances
              </strong>
              <br />
              <small
                style={{
                  color: "var(--text-color, #181818)",
                  fontSize: "12px",
                  fontStyle: "normal",
                  fontWeight: "400",
                  lineHeight: "150%",
                }}
              >
                See how often you appear in search results
              </small>
            </h3>
          </div>
        </div>
        <div className="suggestion_footer1">
          <div className="suggestion_footer">
            <Link to={`/discover-people`}>See All</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile_Analytics