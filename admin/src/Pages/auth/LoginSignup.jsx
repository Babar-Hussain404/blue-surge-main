import React, { useState } from "react";
import Login from "./Login";
import ForgetPassword from "./ForgetPassword";
import Register from "./Register";
import OtpVerification from "./OtpVerification";
import OtpResend from "./OtpResend";

const LoginSignup = () => {
  const [formType, setFormType] = useState("Login");

  const toggleForm = (type) => {
    setFormType(type);
  };
  return (
    <>
      <div className="login_home">
        <div className=" ">
          {/* <AuthLeft /> */}
          <div className="  ">
            <div className="">
              <p className="login_title_right">Welcome,</p>
              <p className="login_title_right_a">{formType} to Blue Surge </p>
              <p
                className={`login_title_right_b ${
                  formType === "Register" ? "display-none" : ""
                }`}
              >
                Enter your email address and password below{" "}
              </p>
            </div>

            <div className="">
              <Login formType={formType} toggleForm={toggleForm} />
              <ForgetPassword formType={formType} toggleForm={toggleForm} />
              <Register formType={formType} toggleForm={toggleForm} />
              <OtpVerification formType={formType} toggleForm={toggleForm} />
              <OtpResend formType={formType} toggleForm={toggleForm} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginSignup;
