import React, { useState } from "react";
import sendGreen from "../../assets/imgs/post/sendpost/sendgreen.svg";
import Profile_Invite_Users from "../profile/Profile_Invite_Users";
import Profile_Tab_Bttons from "../profile/Profile_Tab_Bttons";
import Posts_Active_Tab from "../profile/Posts_Active_Tab";
import Profile_Active_Tab from "../profile/Profile_Active_Tab";
import CompanyUserInfoCard from "./CompanyUserInfoCard";
import CompanyTabButtons from "./CompanyTabButtons";
import CompanyInviteUser from "./CompanyInviteUser";

const CompanyPage = () => {
  return (
    <>
      <div id="page-content" style={{}}>
        <div className="row Main_Profile ">
          <div className="col-lg-9">
            <CompanyUserInfoCard />

            <CompanyTabButtons />
          </div>

          <CompanyInviteUser />
        </div>
      </div>
    </>
  );
};

export default CompanyPage;
