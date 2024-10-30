import React from "react";
import Profile_User_Info_Card from "./Profile_User_Info_Card";
import Profile_Tab_Bttons from "./Profile_Tab_Bttons";

const Profile_User_Info = () => {
  return (
    <>
      <div className="col-lg-9">
        <Profile_User_Info_Card />

        <Profile_Tab_Bttons />
      </div>
    </>
  );
};

export default Profile_User_Info;
