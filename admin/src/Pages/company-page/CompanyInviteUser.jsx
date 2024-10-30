import React from "react";
import You_might_like_Pages from "../profile/You_might_like_Pages";
import CompanyPhotos from "./CompanyPhotos";

const CompanyInviteUser = () => {
  return (
    <>
      <div className="col-lg-3">
        <CompanyPhotos />

        <You_might_like_Pages />
      </div>
    </>
  );
};

export default CompanyInviteUser;
