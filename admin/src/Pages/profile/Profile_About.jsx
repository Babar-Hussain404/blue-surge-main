import React from "react";
import { Link } from "react-router-dom";

const Profile_About = () => {
  return (
    <div className="block Profile_About_Container">
      <div className="suggestion_title">
        <span className="Profile_About_Name">About</span>
      </div>
      <p className="Profile_About_Text">
        As a Farmer, 80+ projects in agricultural field, I am eager to leverage
        my skills and expertise in agricultural world. enabling effectively
        collaborate with farmers, industry stakeholders, machinery vendors and
        research partners. As a farmer, I have dedicated my life to cultivating
        the land and producing food for my community.
      </p>

      <div className="suggestion_footer1">
        <div className="suggestion_footer">
          <Link to={`/discover-people`}>View more</Link>
        </div>
      </div>
    </div>
  );
};

export default Profile_About;
