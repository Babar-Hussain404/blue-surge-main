import React, { useState } from "react";
import Notification_Green from "../../../assets/imgs/Company Settings/Notification_Green.svg";
import BTN_Off from "../../../assets/imgs/BTN_Off.svg";
import BTN_On from "../../../assets/imgs/BTN_On.svg";

const CompanyNotifications = () => {
  const [selectedOption, setSelectedOption] = useState({
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    option5: "",
    option6: "",
  });

  const handleOptionChange = (event) => {
    const { name, value } = event.target;
    setSelectedOption({ ...selectedOption, [name]: value });
  };

  return (
    <>
      <form className="col-lg-9">
        <div className="company_Security_name_container">
          <img src={Notification_Green} alt="" />
          <span>Notifications settings</span>
        </div>

        <div className="company_security_Container">
          <div>
            <span className="Heading">Push Notifications</span>
            <p className="Para">
              Fruity Chat may still send you important notifications about your
              account and content outside of your preferred notification
              settings.
            </p>
          </div>

          <p className="pause_All">Pause all</p>

          <span className="Heading">Likes</span>
          <div
            className=""
            style={{ display: "flex", flexDirection: "column", gap: "7px" }}
          >
            <label className="radio_btn">
              <input
                type="radio"
                value="option1"
                name="option1"
                checked={selectedOption.option1 === "option1"}
                onChange={handleOptionChange}
              />
              {selectedOption.option1 === "option1" ? (
                <img src={BTN_On} alt="" />
              ) : (
                <img src={BTN_Off} alt="" />
              )}
              Off
            </label>
            
            <label className="radio_btn">
              <input
                type="radio"
                value="option2"
                name="option2"
                checked={selectedOption.option2 === "option2"}
                onChange={handleOptionChange}
              />
              {selectedOption.option2 === "option2" ? (
                <img src={BTN_On} alt="" />
              ) : (
                <img src={BTN_Off} alt="" />
              )}
              poioiuyyg
            </label>
          </div>

          <div className="radio_btn_divider"></div>

          <span className="push_Notifications">
            Likes and comments on photos of you
          </span>
          <div
            className=""
            style={{ display: "flex", flexDirection: "column", gap: "7px" }}
          >
            <label className="radio_btn">
              <input
                type="radio"
                value="option4"
                name="option4"
                checked={selectedOption.option4 === "option4"}
                onChange={handleOptionChange}
              />
              {selectedOption.option4 === "option4" ? (
                <img src={BTN_On} alt="" />
              ) : (
                <img src={BTN_Off} alt="" />
              )}
              Off
            </label>
            {/* Similarly for option5 and option6 */}
          </div>

          <div className="radio_btn_divider"></div>
        </div>
      </form>
    </>
  );
};

export default CompanyNotifications;
