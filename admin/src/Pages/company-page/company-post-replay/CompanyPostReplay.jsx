import React from "react";
import Replay_Green from "../../../assets/imgs/Company Settings/Replay_Green.svg";
import PublicModal from "./PublicModal";

const CompanyPostReplay = () => {
  return (
    <>
      <form className="col-lg-9">
        <div className="company_Security_name_container">
          <img src={Replay_Green} alt="" />
          <span>Notifications settings</span>
        </div>

        <div className="company_security_Container">
          <div>
            <span className="Heading">Who can see your future posts?</span>
            <div className="Post_Reply_Para">
              <p className="Para">
                Your default audience is set to Public, including both followers
                and non-followers. This will be the audience for future posts,
                although you can always adjust it for specific posts.
              </p>
              <a
                href="#modal-terms-public"
                data-toggle="modal"
                className=" follow_btn_right Unblock"
              >
                <button className="reply_Public">Public</button>
              </a>
            </div>
          </div>
        </div>
      </form>
      <PublicModal />
    </>
  );
};

export default CompanyPostReplay;
