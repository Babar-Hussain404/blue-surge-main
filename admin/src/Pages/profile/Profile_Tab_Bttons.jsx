import React, { useState } from "react";
import Profile_Active_Tab from "./Profile_Active_Tab";
import Posts_Active_Tab from "./Posts_Active_Tab";

const Profile_Tab_Bttons = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };
  return (
    <>
      <div>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button
            onClick={() => handleTabClick(1)}
            className={`Tab_One Profile_Tab ${activeTab === 1 ? "active" : ""}`}
            style={{
              backgroundColor: activeTab === 1 ? "#00092D" : "#52AF29",
            }}
          >
            Profile
          </button>
          <button
            onClick={() => handleTabClick(2)}
            className={`Tab_One Profile_Tab ${activeTab === 2 ? "active" : ""}`}
            style={{
              backgroundColor: activeTab === 2 ? "#00092D" : "#52AF29",
            }}
          >
            Posts
          </button>
        </div>
        <div>
          {activeTab === 1 && (
            <div>
              {/* Content for Tab 1 */}
              <p>
                <Profile_Active_Tab />
              </p>
            </div>
          )}
          {activeTab === 2 && (
            <div>
              {/* Content for Tab 2 */}
              <p>
                <Posts_Active_Tab />
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile_Tab_Bttons;
