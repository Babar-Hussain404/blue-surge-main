import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postUserReq } from "./__requests/RequestUser";

const AddUser = () => {
  const initialValue = {
    name: "",
    email: "",
    phone: "",
    password: "",
    gender: "",
    dob: "",
    role: "super_admin",
    address_street: "",
    address_city: "",
    address_state: "",
    address_country: "",
    address_postalCode: "",
  };
  const [errorMsg, setErrorMsg] = useState(false);
  const [signUpData, setSignUpData] = useState(initialValue);

  const handleChange = (e) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
  };
  const navigate = useNavigate();
  const [errIdMsg, setErrIdMsg] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !signUpData.name ||
      !signUpData.email ||
      !signUpData.phone ||
      !signUpData.password ||
      !signUpData.gender ||
      !signUpData.dob ||
      !signUpData.address_street ||
      !signUpData.address_city ||
      !signUpData.address_state ||
      !signUpData.address_country ||
      !signUpData.address_postalCode ||
      !signUpData.password
    ) {
      setErrorMsg(true);
      return false;
    }
    try {
      const response = await postUserReq(signUpData);
      setSignUpData(initialValue);
      navigate("/admin-users");
      setErrIdMsg("");
    } catch (error) {
      console.log("error", error);
      if (error.response && error.response.status === 400) {
        setErrIdMsg(error.response.data.error);
        return false;
      }
    }
  };
  return (
    <>
      <br />
      <div
      style={{ paddingBottom: "25rem" }}
        id="page-content"
        className="add_user_form"
      >
        <div>
          {errIdMsg ? (
            <div className=" error_messages login-title themed-background-fire text-center">
              <p className="text-light">{errIdMsg} </p>
            </div>
          ) : (
            <></>
          )}
          <form className={`form-horizontal  `}>
            <div className="form-group">
              <div className="col-xs-4">
                <label className="form-label ">Name </label>
                <div
                  className={`input-group ${
                    errorMsg && !signUpData.name && "has-error"
                  } `}
                >
                  <span className="input-group-addon">
                    <i className="gi gi-user" />
                  </span>
                  <input
                    type="text"
                    required
                    onChange={handleChange}
                    id="register-firstname"
                    name="name"
                    className={`form-control input-lg `}
                    placeholder="Name"
                  />
                </div>
                {errorMsg && !signUpData.name && (
                  <span className="text-danger">
                    Please Enter User Name before SignUp
                  </span>
                )}
              </div>
              <div className="col-xs-4">
                <label className="form-label ">Email </label>
                <div
                  className={`input-group ${
                    errorMsg && !signUpData.email && "has-error"
                  } `}
                >
                  <span className="input-group-addon">
                    <i className="gi gi-envelope" />
                  </span>
                  <input
                    onChange={handleChange}
                    type="email"
                    required
                    name="email"
                    className={`form-control input-lg `}
                    placeholder="Email"
                  />
                </div>
                {errorMsg && !signUpData.email && (
                  <span className="text-danger">
                    Please Enter Email before SignUp
                  </span>
                )}
              </div>
              <div className="col-xs-4">
                <label className="form-label ">Password </label>
                <div
                  className={`input-group ${
                    errorMsg && !signUpData.password && "has-error"
                  } `}
                >
                  <span className="input-group-addon">
                    <i className="gi gi-asterisk" />
                  </span>
                  <input
                    required
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    className={` form-control input-lg  `}
                  />
                </div>
                {errorMsg && !signUpData.password && (
                  <span className="text-danger">
                    Enter Password Before Signup
                  </span>
                )}
              </div>
            </div>
            <div className="form-group">
              <div className="col-xs-4">
                <label className="form-label ">Phone Number </label>
                <input
                  onChange={handleChange}
                  className={` form-control input-lg ${
                    errorMsg && !signUpData.phone && "has-error"
                  } `}
                  type="number"
                  required
                  name="phone"
                  placeholder="Phone Number"
                />
                {errorMsg && !signUpData.phone && (
                  <span className="text-danger">
                    Please Enter Phone Number Before SignUp
                  </span>
                )}
              </div>
              <div className="col-xs-4">
                <label className="form-label ">Date Of Birth </label>
                <input
                  onChange={handleChange}
                  type="date"
                  required
                  name="dob"
                  className={` form-control input-lg ${
                    errorMsg && !signUpData.dob && "has-error"
                  } `}
                  placeholder="Date of Birth"
                />
                {errorMsg && !signUpData.dob && (
                  <span className="text-danger">
                    Enter Date of Birth Before Signup
                  </span>
                )}
              </div>
              <div className="col-xs-4">
                <label className="form-label ">Gender </label>
                <select
                  onChange={handleChange}
                  required
                  name="gender"
                  className={` form-control input-lg ${
                    errorMsg && !signUpData.gender && "has-error"
                  } `}
                >
                  <option disabled value="#">
                    choose...
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>

                {errorMsg && !signUpData.gender && (
                  <span className="text-danger">
                    Enter Gender Before Signup
                  </span>
                )}
              </div>
            </div>
            <br />
            <br />
            <br />
            <div className="form-group">
              <div className="col-xs-4">
                <label className="form-label ">Street </label>
                <input
                  onChange={handleChange}
                  className={` form-control input-lg ${
                    errorMsg && !signUpData.address_street && "has-error"
                  } `}
                  type="text"
                  required
                  name="address_street"
                  placeholder="Street"
                />
                {errorMsg && !signUpData.address_street && (
                  <span className="text-danger">
                    Please Enter Street Before SignUp
                  </span>
                )}
              </div>
              <div className="col-xs-4">
                <label className="form-label ">City </label>
                <input
                  onChange={handleChange}
                  className={` form-control input-lg ${
                    errorMsg && !signUpData.address_city && "has-error"
                  } `}
                  type="text"
                  required
                  name="address_city"
                  placeholder="City"
                />
                {errorMsg && !signUpData.address_city && (
                  <span className="text-danger">
                    Please Enter City Before SignUp
                  </span>
                )}
              </div>
              <div className="col-xs-4">
                <label className="form-label ">State </label>
                <input
                  onChange={handleChange}
                  type="text"
                  required
                  name="address_state"
                  className={` form-control input-lg ${
                    errorMsg && !signUpData.address_state && "has-error"
                  } `}
                  placeholder="State"
                />
                {errorMsg && !signUpData.address_state && (
                  <span className="text-danger">Enter State Before Signup</span>
                )}
              </div>
            </div>
            <div className="form-group">
              <div className="col-xs-4">
                <label className="form-label ">Country </label>
                <input
                  onChange={handleChange}
                  className={` form-control input-lg ${
                    errorMsg && !signUpData.address_country && "has-error"
                  } `}
                  type="text"
                  required
                  name="address_country"
                  placeholder="Country"
                />
                {errorMsg && !signUpData.address_country && (
                  <span className="text-danger">
                    Please Enter Country Before SignUp
                  </span>
                )}
              </div>
              <div className="col-xs-4">
                <label className="form-label ">Zip Code</label>
                <input
                  onChange={handleChange}
                  type="text"
                  required
                  name="address_postalCode"
                  className={` form-control input-lg ${
                    errorMsg && !signUpData.address_postalCode && "has-error"
                  } `}
                  placeholder="Zip Code"
                />
                {errorMsg && !signUpData.address_postalCode && (
                  <span className="text-danger">
                    Enter Zip Code Before Signup
                  </span>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="btn btn-primary"
              >
                {" "}
                Add User
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddUser;
