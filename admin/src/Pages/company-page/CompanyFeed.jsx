import React, { useState } from "react";
import CompanyPagePostTab from "./CompanyPagePostTab";
import CompanyFollowing from "./CompanyFollowing";
import CompanyFollowersTab from "./CompanyFollowersTab";

const CompanyFeed = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };
  return (
    <div className="col-lg-9">
      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          borderBottom: "1px solid #E7E7E7",
        }}
      >
        <button
          onClick={() => handleTabClick(1)}
          className={`Tab_One Profile_Tab ${activeTab === 1 ? "active" : ""}`}
          style={{
            backgroundColor: activeTab === 1 ? "#00092D" : "#52AF29",
          }}
        >
          Page Posts
        </button>
        <button
          onClick={() => handleTabClick(2)}
          className={`Tab_One Profile_Tab ${activeTab === 2 ? "active" : ""}`}
          style={{
            backgroundColor: activeTab === 2 ? "#00092D" : "#52AF29",
          }}
        >
          Following
        </button>
        <button
          onClick={() => handleTabClick(3)}
          className={`Tab_One Profile_Tab ${activeTab === 3 ? "active" : ""}`}
          style={{
            backgroundColor: activeTab === 3 ? "#00092D" : "#52AF29",
          }}
        >
          Followers
        </button>
      </div>
      <div
        style={{
          width: "100%",
          height: "0.689px",
          backgroundColor: "#E7E7E7",
        }}
      ></div>
      <div>
        {activeTab === 1 && (
          <div>
            {/* Content for Tab 1 */}
            <p>
              <CompanyPagePostTab />
            </p>
          </div>
        )}
        {activeTab === 2 && (
          <div>
            {/* Content for Tab 2 */}
            <p>
              <CompanyFollowing />
            </p>
          </div>
        )}
        {activeTab === 3 && (
          <div>
            {/* Content for Tab 2 */}
            <p>
              <CompanyFollowersTab />
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyFeed;
