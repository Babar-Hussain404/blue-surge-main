import React from "react";
import "react-toastify/dist/ReactToastify.css";
import Suggested_for_you from "./Suggested_for_you";
import Profile_Analytics from "./Profile_Analytics";
import Profile_Post_Page from "./Profile_Post_Page";
import Profile_Experience from "./Profile_Experience";
import Profile_Education from "./Profile_Education";
import Profile_About from "./Profile_About";

const Profile_Active_Tab = () => {
  return (
    <>
      {/* About Start  */}
      <Profile_About />
      {/* About End  */}
      {/* Suggested for you Start  */}
      <Suggested_for_you />
      {/* Suggested for you end  */}

      {/* Analytics Start  */}
      <Profile_Analytics />
      {/* Analytics End  */}

      {/* Page Posts Start  */}
      <Profile_Post_Page />
      {/* Page Posts end  */}

      {/* Create a Post Start  */}

      {/* <Profile_Create_Post /> */}

      {/* Create a Post End  */}

      {/* Experience Start  */}
      <Profile_Experience />
      {/* Experience End  */}

      {/* Education Start  */}
      <Profile_Education />
      {/* Education End  */}
    </>
  );
};

export default Profile_Active_Tab;
