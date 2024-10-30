import React, { useState } from "react";
import CompanyEditPage from "./CompanyEditPage";
import CompanyFeed from "./CompanyFeed";
import CompanySecurity from "./company-security/CompanySecurity";
import Lock_Gray from "../../assets/imgs/Company Settings/Lock_Gray.svg";
import Lock_Green from "../../assets/imgs/Company Settings/Lock_Green.svg";
import Payment_Card from "../../assets/imgs/Company Settings/Payment_Card.svg";
import edit from "../../assets/imgs/post/edit.svg";
import edit_Green from "../../assets/imgs/post/edit_Green.svg";
import Notification from "../../assets/imgs/Company Settings/Notification.svg";
import Notification_Green from "../../assets/imgs/Company Settings/Notification_Green.svg";
import User_Blocked from "../../assets/imgs/Company Settings/User_Blocked.svg";
import User_Blocked_Green from "../../assets/imgs/Company Settings/User_Blocked_Green.svg";
import Replay from "../../assets/imgs/Company Settings/Replay.svg";
import Replay_Green from "../../assets/imgs/Company Settings/Replay_Green.svg";
import Message_Replay from "../../assets/imgs/Company Settings/Message_Replay.svg";
import Tag_Mention from "../../assets/imgs/Company Settings/Tag_Mention.svg";
import comments from "../../assets/imgs/Company Settings/comments.svg";
import share_grey from "../../assets/imgs/like/share_grey.svg";
import Suggested_content from "../../assets/imgs/like/Suggested_content.svg";
import Close_Green from "../../assets/imgs/Close_Green.svg";
import DisLikes from "../../assets/imgs/like/Suggested_content.svg";
import Device_Connect from "../../assets/imgs/Company Settings/Device_Connect.svg";
import Delete_Account from "../../assets/imgs/Company Settings/Delete_Account.svg";
import removepost from "../../assets/imgs/post/removepost.svg";
import CompanyNotifications from "./company-notifications/CompanyNotifications";
import CompanyBlocked from "./company-blocked-details/CompanyBlocked";
import CompanyHidePosts from "./company-hide-posts/CompanyHidePosts";
import CompanyPostReplay from "./company-post-replay/CompanyPostReplay";
import UnBlockModal from "./company-blocked-details/UnBlockModal";


const CompanyTabButtons = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <>
      <div className="row">
        <div className="col-lg-3">
          <div className="company_Edit_Btn_Container">
            <button
              onClick={() => handleTabClick("tab1")}
              className={`${
                activeTab === "tab1" ? "company_feed_BTN" : "company_feed_BTN2"
              }`}
            >
              Feed
            </button>

            <button
              onClick={() => handleTabClick("tab2")}
              className={`${
                activeTab === "tab2" ? "company_feed_BTN" : "company_feed_BTN2"
              }`}
            >
              <span className="Company_Setting_Tabs">
                {activeTab === "tab2" ? (
                  <img src={edit_Green} alt="" />
                ) : (
                  <img src={edit} alt="" />
                )}
                Edit
              </span>
            </button>

            <button
              onClick={() => handleTabClick("tab3")}
              className={`${
                activeTab === "tab3" ? "company_feed_BTN" : "company_feed_BTN2"
              }`}
            >
              <span className="Company_Setting_Tabs">
                {activeTab === "tab3" ? (
                  <img src={Lock_Green} alt="" />
                ) : (
                  <img src={Lock_Gray} alt="" />
                )}
                Security
              </span>
            </button>

            <button
              onClick={() => handleTabClick("tab4")}
              className={`${
                activeTab === "tab4" ? "company_feed_BTN" : "company_feed_BTN2"
              }`}
            >
              <span className="Company_Setting_Tabs">
                {activeTab === "tab3" ? (
                  <img src={Payment_Card} alt="" />
                ) : (
                  <img src={Payment_Card} alt="" />
                )}
                Payments Method
              </span>
            </button>

            <button
              onClick={() => handleTabClick("tab5")}
              className={`${
                activeTab === "tab5" ? "company_feed_BTN" : "company_feed_BTN2"
              }`}
            >
              <span className="Company_Setting_Tabs">
                {activeTab === "tab5" ? (
                  <img src={Notification_Green} alt="" />
                ) : (
                  <img src={Notification} alt="" />
                )}
                Notifications
              </span>
            </button>

            <button
              onClick={() => handleTabClick("tab6")}
              className={`${
                activeTab === "tab6" ? "company_feed_BTN" : "company_feed_BTN2"
              }`}
            >
              <span className="Company_Setting_Tabs">
                {activeTab === "tab6" ? (
                  <img src={User_Blocked_Green} alt="" />
                ) : (
                  <img src={User_Blocked} alt="" />
                )}
                Blocked
              </span>
            </button>

            <button
              onClick={() => handleTabClick("tab7")}
              className={`${
                activeTab === "tab7" ? "company_feed_BTN" : "company_feed_BTN2"
              }`}
            >
              <span className="Company_Setting_Tabs">
                {activeTab === "tab7" ? (
                  <img src={Close_Green} alt="" />
                ) : (
                  <img src={removepost} alt="" />
                )}
                Hide post
              </span>
            </button>

            <button
              onClick={() => handleTabClick("tab8")}
              className={`${
                activeTab === "tab8" ? "company_feed_BTN" : "company_feed_BTN2"
              }`}
            >
              <span className="Company_Setting_Tabs">
                {activeTab === "tab8" ? (
                  <img src={Replay_Green} alt="" />
                ) : (
                  <img src={Replay} alt="" />
                )}
                Post replies
              </span>
            </button>

            <button
              onClick={() => handleTabClick("tab9")}
              className={`${
                activeTab === "tab9" ? "company_feed_BTN" : "company_feed_BTN2"
              }`}
            >
              <span className="Company_Setting_Tabs">
                {activeTab === "tab9" ? (
                  <img src={Message_Replay} alt="" />
                ) : (
                  <img src={Message_Replay} alt="" />
                )}
                Messages replies
              </span>
            </button>

            <button
              onClick={() => handleTabClick("tab10")}
              className={`${
                activeTab === "tab10" ? "company_feed_BTN" : "company_feed_BTN2"
              }`}
            >
              <span className="Company_Setting_Tabs">
                {activeTab === "tab10" ? (
                  <img src={Tag_Mention} alt="" />
                ) : (
                  <img src={Tag_Mention} alt="" />
                )}
                Tags and mentions
              </span>
            </button>

            <button
              onClick={() => handleTabClick("tab11")}
              className={`${
                activeTab === "tab11" ? "company_feed_BTN" : "company_feed_BTN2"
              }`}
            >
              <span className="Company_Setting_Tabs">
                {activeTab === "tab10" ? (
                  <img src={comments} alt="" />
                ) : (
                  <img src={comments} alt="" />
                )}
                Comments
              </span>
            </button>

            <button
              onClick={() => handleTabClick("tab12")}
              className={`${
                activeTab === "tab12" ? "company_feed_BTN" : "company_feed_BTN2"
              }`}
            >
              <span className="Company_Setting_Tabs">
                {activeTab === "tab10" ? (
                  <img src={share_grey} alt="" />
                ) : (
                  <img src={share_grey} alt="" />
                )}
                Sharing
              </span>
            </button>

            <button
              onClick={() => handleTabClick("tab13")}
              className={`${
                activeTab === "tab13" ? "company_feed_BTN" : "company_feed_BTN2"
              }`}
            >
              <span className="Company_Setting_Tabs">
                {activeTab === "tab10" ? (
                  <img src={Suggested_content} alt="" />
                ) : (
                  <img src={Suggested_content} alt="" />
                )}
                Suggested content
              </span>
            </button>

            <button
              onClick={() => handleTabClick("tab14")}
              className={`${
                activeTab === "tab14" ? "company_feed_BTN" : "company_feed_BTN2"
              }`}
            >
              <span className="Company_Setting_Tabs">
                {activeTab === "tab10" ? (
                  <img src={DisLikes} alt="" />
                ) : (
                  <img src={DisLikes} alt="" />
                )}
                Like / share counts
              </span>
            </button>

            <button
              onClick={() => handleTabClick("tab15")}
              className={`${
                activeTab === "tab15" ? "company_feed_BTN" : "company_feed_BTN2"
              }`}
            >
              <span className="Company_Setting_Tabs">
                {activeTab === "tab10" ? (
                  <img src={Device_Connect} alt="" />
                ) : (
                  <img src={Device_Connect} alt="" />
                )}
                Device Permission
              </span>
            </button>

            <div className="divider"></div>

            <div className="company_BTN_Border"></div>
            <button className="company_Del_BTN">
              {" "}
              <span className="Company_Setting_Tabs">
                {activeTab === "tab7" ? (
                  <img src={Delete_Account} alt="" />
                ) : (
                  <img src={Delete_Account} alt="" />
                )}
                Delete account{" "}
              </span>
            </button>
          </div>
        </div>

        <div>
          {activeTab === "tab1" && (
            <div>
              <CompanyFeed />
            </div>
          )}
          {activeTab === "tab2" && (
            <div>
              <CompanyEditPage />
            </div>
          )}
          {activeTab === "tab3" && (
            <div>
              <CompanySecurity />
            </div>
          )}
          {activeTab === "tab5" && (
            <div>
              <CompanyNotifications />
            </div>
          )}
          {activeTab === "tab6" && (
            <div>
              <CompanyBlocked />
            </div>
          )}
          {activeTab === "tab7" && (
            <div>
              <CompanyHidePosts />
            </div>
          )}
          {activeTab === "tab8" && (
            <div>
              <CompanyPostReplay />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CompanyTabButtons;
