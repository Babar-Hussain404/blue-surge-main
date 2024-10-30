import React from "react";
import { Link } from "react-router-dom";
import editsuggestions from "../../assets/imgs/suggestioncarousel/editsuggestions.svg";
import like_green from "../../assets/imgs/like/like_green.svg";
import comment_grey from "../../assets/imgs/like/comment_grey.svg";
import share_grey from "../../assets/imgs/like/share_grey.svg";

const Profile_Post_Page = () => {
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
          Post Page
        </span>
      </div>
      <div
        className="follow_widget_right_modal  center_top_profile"
        style={{
          marginTop: "20px",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "start",
          flexDirection: "row",
          justifyContent: "center",
          backgroundColor: "#FFF",
          width: "100%",
          height: "100%",
          border: "0",
          gap: "20px",
        }}
      >
        <div
          style={{
            width: "570px",
            borderRadius: "13.947px",
            border: " 0.97px solid var(--div_boarder, #D9DDE7)",
            backgroundColor: "#FFF",
            boxShadow: " 0px 17.434px 52.301px 0px rgba(241, 244, 248, 0.50)",
          }}
        >
          <div className="widget-simple">
            <a href="/">
              <img
                // src="img/placeholders/avatars/avatar2.jpg"
                src="https://s3-alpha-sig.figma.com/img/0d23/5692/e735a28fd34c9306c227064033c1b8fc?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=GtxB7JF7yhfuvMOFrlg4Bq4PQCqaMT-a7JQShvzJX5qnFeFr1qa0y8YMSaikCh5380BYWsW5SWUX8EuTgHzpDDXtmMPWwhCs4pMXP5TXc0gOia4tiK8TTlBdRwymeLON960QCBabvH5AXv-OPDSeMV66mRzzSRbZ6G0TNc8uRmUhqLZ9kSlip4aN8ZK8DHMI8AOcSFoIBEm2AwOnbUZmRZnh2VWOWSbHEmvWl0Mw0HkM6k3EvFG-O2M3ZzhEvLCyI7ZX0gm3bTX3by3dxe5LYd0OMZJ2FsnaG6z2DEwaT~MiJp~9Tjm8117-bj5Xi5GM42SHpniKfCdisHqr75UbXw__"
                alt="avatar"
                className="widget-image img-circle pull-left img_circle_border"
                style={{ height: "60px", width: "60px", padding: "5px" }}
              />
            </a>
            <h4
              className="widget-content"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <strong
                  style={{
                    color: "#52AF29",
                    fontSize: "15px",
                    fontStyle: "normal",
                    fontWeight: "500",
                    lineHeight: "17.434px",
                  }}
                >
                  Muhammd Tauheed
                </strong>
                <div style={{ cursor: "pointer" }}>
                  <img src={editsuggestions} alt="" />
                </div>
              </div>

              <p
                style={{
                  color: "#747474",
                  fontSize: "10px",
                  fontStyle: "normal",
                  fontWeight: "400",
                  lineHeight: "150%",
                }}
              >
                33 mins ago
              </p>
            </h4>
            <p
              style={{
                color: " var(--text-color, #181818)",
                fontSize: "12px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "187.4%",
              }}
            >
              “Agriculture is our wisest pursuit, because it will in the end
              contribute most to real wealth, good morals, and happiness.”
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <img
                src="https://s3-alpha-sig.figma.com/img/a5c3/fdc8/4e46c4b3b1e3e7499d4601ac147f3710?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=A8dyIxsql1WMsKUuWhSxPdOW1oCH3VfTd38CimtMJODYiIhfePcy3acMumGIyRKKWOYdp-hhV7s9dzQxnwm0YQcqXlmybSaY6vlo6KytG3OvGNLeXEzjluLWx3~nOPfH6h7hz8WrWoBcPyYOFwfM1tpGzfSzEebQIs6dSTdTa6hkcW4m2Wml2YS8KTu4sWFsiqkvlJuEV6BDU8g-JGDHVyfB7-zHluD3bxYxzauypNCSCMogJ4dlhpM-iOoH1SPNh9TGovg8QD5r-fZZQ6zzrFNAGku0nOBE25yixy6F4nbE8-h~Df-WZKMiLie8M9aMoqHaCt2Wh1yFLg2~lVy2rg__"
                alt=""
                style={{
                  height: "200px",
                  border: "1.224px solid #F1F2F6",
                  borderRadius: "7px",
                }}
              />

              <div className="page_post_small_img">
                <img
                  src="https://s3-alpha-sig.figma.com/img/df92/9603/b7931a0e09ab4a4a2bf79fdcb5c5f7d1?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=F6EuYcz6PQllkqVQkolvv90XCZIv9VqeDZFvr0OolsM30D5j2rNOAwQpw0NN86bfG0xPfNwSv4AxQVE7H1-XUyVoKAmXIGWAHwjrsc02tlJF0unF1K8ZaPh6hE7LqmtTef1nYudbsfRTGCfL0ZTQBihbemfPYzovnqpCQzlTCtHHK1slkSzeqVJfhFBcmMY1mgaJZFTw5VrGT82sneQqV2vqjczDeuKvYRScYSTJjqr~Yd7-hs5KBDl~BkX1hCQQcQ6mrsNAcARe1SNm4gNHjZvhxNcFFx-JjTWIWOGf7QfZ6UK2B99yMTTLZIvxNm28d5FPhvImrmLKVjyFFW9R2A__"
                  alt=""
                  style={{
                    height: "100px",
                    border: "1.224px solid #F1F2F6",
                    borderRadius: "7px",
                  }}
                />

                <img
                  src="https://s3-alpha-sig.figma.com/img/9b29/baee/9d5fe19589672c8c62002a971729f684?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gu1AhBvseottWReBHbcD8MyHvtbF49UtWovkP9YAyJiSXnsJQkDvJ~bRlNs491V77DJLoHRyAvvNp9KkG4KNDN5UGR0uQl3Q6mX~8AAX9o3n4b4VQC~5vGYMUrrhzVKAuZ0IvbFG07PKkpaD7vRu~sHwMafmrq4kEWJK1aUgP90ox8rYU0m0373LymPgBURM82h5qhXVtoUGH1BMLImHBsN-nCvIKjbv0QrNh47-KvZAc5DKrSKBIBSwUCT73~u1rXjmaMyG089jfXlvAufpjP79li4nmOaeaIL09E6kVRqrG3UoE5~mu6NZ99wzflV~1xbbLsYw3EhMvUaZ9blS-g__"
                  alt=""
                  style={{
                    height: "100px",
                    border: "1.224px solid #F1F2F6",
                    borderRadius: "7px",
                  }}
                />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                marginTop: "20px",
                paddingBottom: "20px",
              }}
            >
              <span
                style={{
                  color: "#52AF29",
                  fontSize: "13px",
                  fontStyle: "normal",
                  fontWeight: "600",
                  lineHeight: "normal",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  cursor: "pointer",
                }}
              >
                <img src={like_green} alt="" />
                Like
              </span>
              <span
                style={{
                  color: "#00092D",
                  fontSize: "13px",
                  fontStyle: "normal",
                  fontWeight: "600",
                  lineHeight: "normal",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  cursor: "pointer",
                }}
              >
                <img src={comment_grey} alt="" />
                Comment
              </span>
              <span
                style={{
                  color: "#00092D",
                  fontSize: "13px",
                  fontStyle: "normal",
                  fontWeight: "600",
                  lineHeight: "normal",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  cursor: "pointer",
                }}
              >
                <img src={share_grey} alt="" />
                Share
              </span>
            </div>
          </div>
        </div>

        <div
          style={{
            width: "570px",
            height: "200px",
            borderRadius: "13.947px",
            border: " 0.97px solid var(--div_boarder, #D9DDE7)",
            backgroundColor: "#FFF",
            boxShadow: " 0px 17.434px 52.301px 0px rgba(241, 244, 248, 0.50)",
          }}
        >
          <div className="widget-simple">
            <a href="/">
              <img
                // src="img/placeholders/avatars/avatar2.jpg"
                src="https://s3-alpha-sig.figma.com/img/0d23/5692/e735a28fd34c9306c227064033c1b8fc?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=GtxB7JF7yhfuvMOFrlg4Bq4PQCqaMT-a7JQShvzJX5qnFeFr1qa0y8YMSaikCh5380BYWsW5SWUX8EuTgHzpDDXtmMPWwhCs4pMXP5TXc0gOia4tiK8TTlBdRwymeLON960QCBabvH5AXv-OPDSeMV66mRzzSRbZ6G0TNc8uRmUhqLZ9kSlip4aN8ZK8DHMI8AOcSFoIBEm2AwOnbUZmRZnh2VWOWSbHEmvWl0Mw0HkM6k3EvFG-O2M3ZzhEvLCyI7ZX0gm3bTX3by3dxe5LYd0OMZJ2FsnaG6z2DEwaT~MiJp~9Tjm8117-bj5Xi5GM42SHpniKfCdisHqr75UbXw__"
                alt="avatar"
                className="widget-image img-circle pull-left img_circle_border"
                style={{ height: "60px", width: "60px", padding: "5px" }}
              />
            </a>
            <h4
              className="widget-content"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <strong
                  style={{
                    color: "#52AF29",
                    fontSize: "15px",
                    fontStyle: "normal",
                    fontWeight: "500",
                    lineHeight: "17.434px",
                  }}
                >
                  Muhammd Tauheed
                </strong>
                <div style={{ cursor: "pointer" }}>
                  <img src={editsuggestions} alt="" />
                </div>
              </div>

              <p
                style={{
                  color: "#747474",
                  fontSize: "10px",
                  fontStyle: "normal",
                  fontWeight: "400",
                  lineHeight: "150%",
                }}
              >
                33 mins ago
              </p>
            </h4>
            <p
              style={{
                color: " var(--text-color, #181818)",
                fontSize: "12px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "187.4%",
              }}
            >
              Agriculture is our wisest pursuit, because it will in the end
              contribute most to real wealth, good morals, and happiness.
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                marginTop: "20px",
              }}
            >
              <span
                style={{
                  color: "#52AF29",
                  fontSize: "13px",
                  fontStyle: "normal",
                  fontWeight: "600",
                  lineHeight: "normal",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  cursor: "pointer",
                }}
              >
                <img src={like_green} alt="" />
                Like
              </span>
              <span
                style={{
                  color: "#00092D",
                  fontSize: "13px",
                  fontStyle: "normal",
                  fontWeight: "600",
                  lineHeight: "normal",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  cursor: "pointer",
                }}
              >
                <img src={comment_grey} alt="" />
                Comment
              </span>
              <span
                style={{
                  color: "#00092D",
                  fontSize: "13px",
                  fontStyle: "normal",
                  fontWeight: "600",
                  lineHeight: "normal",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  cursor: "pointer",
                }}
              >
                <img src={share_grey} alt="" />
                Share
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="suggestion_footer1">
        <div className="suggestion_footer">
          <Link to={`/discover-people`}>Go To Page </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile_Post_Page;
