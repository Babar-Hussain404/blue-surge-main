import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleUserReq, updateUserReq } from "./__requests/RequestUser";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
const EditUser = () => {
  const editUserIdState = useSelector((state) => state.editUserIdReducer);
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
  const [userData, setUserData] = useState([]);
  const [userLoading, setUserLoading] = useState(true);

  const [errorMsg, setErrorMsg] = useState(false);
  const [signUpData, setSignUpData] = useState(initialValue);
  const getSingleUser = async () => {
    try {
      setUserLoading(true);
      const response = await getSingleUserReq(editUserIdState);
      setSignUpData(response.data);
      setUserLoading(false);
    } catch (error) {
      toast.error("Whoops! something wrong");
      setUserLoading(false);
    }
  };

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
      const response = await updateUserReq(editUserIdState, signUpData);
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

  useEffect(() => {
    if (editUserIdState && userLoading) {
      getSingleUser();
    }
  }, [editUserIdState, userLoading]);
  return (
    <>
      <br />
      <div
        style={{ paddingBottom: "25rem" }}
        id="page-content"
        className="add_user_form"
      >
        {userLoading ? (
          <div
            style={{
              textAlign: "center",
              height: "100vh",
              paddingTop: "20rem",
            }}
          >
            <i className="fa fa-spinner fa-4x fa-spin"></i>
          </div>
        ) : (
          <>
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
                        value={signUpData.name}
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
                  <div className="col-xs-8">
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
                        value={signUpData.email}
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
                </div>
                <div className="form-group">
                  <div className="col-xs-4">
                    <label className="form-label ">Phone Number </label>
                    <input
                      onChange={handleChange}
                      value={signUpData.phone}
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
                      value={signUpData.dob}
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
                      value={signUpData.gender}
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
                      value={signUpData.address_street}
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
                      value={signUpData.address_city}
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
                      value={signUpData.address_state}
                      required
                      name="address_state"
                      className={` form-control input-lg ${
                        errorMsg && !signUpData.address_state && "has-error"
                      } `}
                      placeholder="State"
                    />
                    {errorMsg && !signUpData.address_state && (
                      <span className="text-danger">
                        Enter State Before Signup
                      </span>
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
                      value={signUpData.address_country}
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
                      value={signUpData.address_postalCode}
                      required
                      name="address_postalCode"
                      className={` form-control input-lg ${
                        errorMsg &&
                        !signUpData.address_postalCode &&
                        "has-error"
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
                    Update User
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default EditUser;
