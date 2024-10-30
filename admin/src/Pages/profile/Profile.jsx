import React from "react";
import Profile_Invite_Users from "./Profile_Invite_Users";
import Profile_User_Info_Card from "./Profile_User_Info_Card";
import Profile_Tab_Bttons from "./Profile_Tab_Bttons";

const Profile = () => {
  return (
    <>
      <div id="page-content" style={{}}>
        <div className="row Main_Profile ">
          <div className="col-lg-9">
            <Profile_User_Info_Card />
            <Profile_Tab_Bttons />
          </div>
          <Profile_Invite_Users />
        </div>
      </div>
    </>
  );
};

export default Profile;
