import React from "react";
import FriendRequests from "../../Component/main-container/FriendRequests";
import Users_New_Followers from "./Users_New_Followers";
import Profile_Photos from "./Profile_Photos";
import You_might_like_Pages from "./You_might_like_Pages";

const Profile_Invite_Users = () => {
  return (
    <>
      <div className="col-lg-3">
        <FriendRequests />

        <Users_New_Followers />

        <Profile_Photos />

        <You_might_like_Pages />
      </div>
    </>
  );
};

export default Profile_Invite_Users;
