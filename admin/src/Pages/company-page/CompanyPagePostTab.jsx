import React from "react";
import Profile_Create_Post from "../profile/Profile_Create_Post";
import Profile_Post_Page from "../profile/Profile_Post_Page";

const CompanyPagePostTab = () => {
  return (
    <>
      {/* Create a Post Start  */}
      <Profile_Create_Post />
      {/* Create a Post End  */}

      {/* Page Posts Start  */}
      <Profile_Post_Page />
      {/* Page Posts end  */}
    </>
  );
};

export default CompanyPagePostTab;
