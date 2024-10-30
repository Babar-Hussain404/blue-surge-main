import React, { useState } from "react";
import Lock_Green from "../../../assets/imgs/Company Settings/Lock_Green.svg";


const CompanySecurity = () => {
  const [formData, setFormData] = useState({
    Currentpassword: "",
    Newpassword: "",
    Confirmnewpassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const { Currentpassword, Newpassword, Confirmnewpassword } = formData;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <form className="col-lg-9">
        <div className="company_Security_name_container">
          <img src={Lock_Green} alt="" />
          <span>Security</span>
        </div>

        <div className="company_security_Container">
          <span>
            You can update your password below. If you forgot your current
            password please contact support for assistance.
          </span>

          <div className="Company_Input_lable" style={{ position: "relative" }}>
            <label htmlFor="nameInput">
              Current password<span style={{ color: "red" }}>*</span>
            </label>
            <input
              className="Company_Inputs"
              type={showPassword ? "text" : "password"}
              id="nameInput"
              value={Currentpassword}
              name="Currentpassword"
              onChange={handleChange}
              placeholder="Please enter your current password"
              style={{ paddingRight: "40px" }}
            />
            <i
              className={`fa ${
                showPassword ? "fa-eye-slash" : "fa-eye"
              } password-icon`}
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                top: "65%",
                right: "10px",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
            ></i>
          </div>

          <div className="Company_Input_lable" style={{ position: "relative" }}>
            <label htmlFor="nameInput">
              New password<span style={{ color: "red" }}>*</span>
            </label>
            <input
              className="Company_Inputs"
              type={showPassword ? "text" : "password"}
              id="nameInput"
              value={Newpassword}
              name="Newpassword"
              onChange={handleChange}
              placeholder="Please enter your current password"
              style={{ paddingRight: "40px" }}
            />
            <i
              className={`fa ${
                showPassword ? "fa-eye-slash" : "fa-eye"
              } password-icon`}
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                top: "65%",
                right: "10px",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
            ></i>
          </div>

          <div className="Company_Input_lable" style={{ position: "relative" }}>
            <label htmlFor="nameInput">
              Confirm new password<span style={{ color: "red" }}>*</span>
            </label>
            <input
              className="Company_Inputs"
              type={showPassword ? "text" : "password"}
              id="nameInput"
              value={Confirmnewpassword}
              name="Confirmnewpassword"
              onChange={handleChange}
              placeholder="Please enter your current password"
              style={{ paddingRight: "40px" }}
            />
            <i
              className={`fa ${
                showPassword ? "fa-eye-slash" : "fa-eye"
              } password-icon`}
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                top: "65%",
                right: "10px",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
            ></i>
          </div>

          <div className="Company_Edet_Save_BTN_Container">
            <button className="Company_Edet_Save_BTN">Save Changes</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CompanySecurity;
