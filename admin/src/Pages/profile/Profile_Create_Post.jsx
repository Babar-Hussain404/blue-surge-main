import React from "react";
import inputpicture from "../../assets/imgs/post/picture.svg";
import inputattachment from "../../assets/imgs/post/attachment.svg";
import inputemoji from "../../assets/imgs/post/emoji.svg";
import sendpost from "../../assets/imgs/post/sendpost/send_grey.svg";

import { Link } from "react-router-dom";

const Profile_Create_Post = () => {
  return (
    <div
      className="block"
      style={{
        borderRadius: "12px",
        border: "0.97px solid var(--div_boarder, #D9DDE7)",
        backgroundColor: "#FFF",
        boxShadow: " 0px 20px 60px 0px rgba(241, 244, 248, 0.50)",
        marginTop:"20px"
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
          Create a post
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
        <span
          style={{
            color: "#52AF29",
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: "600",
            lineHeight: "150%",
          }}
        >
          1,043 Followers
        </span>
      </span>

      <div className="widget addpost-area-center">
        <div className="widget-extra-full">
          <form className="form-horizontal">
            <div className="form-group">
              <div className="col-xs-12">
                <textarea
                  id="widget-post3"
                  name="widget-post3"
                  rows={3}
                  className="form-control addpost-center"
                  placeholder="What’s on your mind?"
                />
              </div>
            </div>
            <div className="form-group remove-margin-bottom">
              <div className="col-xs-6">
                <div className=" ">
                  <button
                    type="button"
                    className="addpost-icon"
                    data-toggle="tooltip"
                    title="Add Image"
                  >
                    <img src={inputpicture} />
                  </button>
                  <button
                    type="button"
                    className="addpost-icon"
                    data-toggle="tooltip"
                    title="Add Location"
                  >
                    <img src={inputattachment} />
                  </button>
                  <button
                    type="button"
                    className="addpost-icon"
                    data-toggle="tooltip"
                    title="Add Recording"
                  >
                    <img src={inputemoji} />
                  </button>
                </div>
              </div>
              <div className="col-xs-6 text-right">
                <button type="submit" className=" addpost-icon">
                  <img src={sendpost} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="suggestion_footer1">
        <div className="suggestion_footer">
          <Link to={`/discover-people`}>Create Post</Link>
        </div>
      </div>
    </div>
  );
};

export default Profile_Create_Post;
