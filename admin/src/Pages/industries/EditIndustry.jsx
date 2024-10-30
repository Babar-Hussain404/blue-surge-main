import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { getSingleIndustryReq, putIndustryReq } from "./__requests/RequestUser";
const EditIndustry = () => {
  const industryid = useSelector((state) => state.industrytStateReducer);
  const initialValue = {
    name: "",
    logo: "",
    tagline: "",
    description: "",
    detail: "",
    image: "",
    email: "",
    website: "",
    address_street: "",
    address_city: "",
    address_state: "",
    address_country: "",
    address_zipcode: "",
  };
  const [errorMsg, setErrorMsg] = useState(false);
  const [signUpData, setSignUpData] = useState(initialValue);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [selectedImage3, setSelectedImage3] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imagePreview1, setImagePreview1] = useState(null);
  const [imagePreview2, setImagePreview2] = useState(null);

  const getSingleIndustry = async () => {
    try {
      // setIndustryLoading(true);
      const response = await getSingleIndustryReq(industryid);
      setSignUpData(response.data.industry);
      if (response.data.industry.image) {
        const image = `${process.env.REACT_APP_IMAGE_URL}/${response.data.industry.image}`;
        setImagePreview(image);
      }
      if (response.data.industry.detailImage) {
        const detailImage = `${process.env.REACT_APP_IMAGE_URL}/${response.data.industry.detailImage}`;
        setImagePreview1(detailImage);
      }
      if (response.data.industry.logo) {
        const logo = `${process.env.REACT_APP_IMAGE_URL}/${response.data.industry.logo}`;
        setImagePreview2(logo);
      }
    } catch (error) {
      toast.error("Whoops! something wrong");
    }
  };
  useEffect(() => {
    if (industryid) getSingleIndustry();
  }, [industryid]);

  const handleImageUpload = (event) => {
    const { name, files } = event.target;
    const file = files[0];

    switch (name) {
      case "image":
        setSelectedImage(file);
        setImagePreview(URL.createObjectURL(file));
        break;
      case "detailImage":
        setSelectedImage2(file);
        setImagePreview1(URL.createObjectURL(file));
        break;
      case "logo":
        setSelectedImage3(file);
        setImagePreview2(URL.createObjectURL(file));
        break;
      default:
        break;
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
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

    const formData = new FormData();

    if (selectedImage) {
      Object.keys(signUpData).forEach((key) => {
        formData.append(key, signUpData[key]);
      });
      formData.append("image", selectedImage);
    } else if (selectedImage2) {
      Object.keys(signUpData).forEach((key) => {
        formData.append(key, signUpData[key]);
      });
      formData.append("detailImage", selectedImage2);
    } else if (selectedImage3) {
      Object.keys(signUpData).forEach((key) => {
        formData.append(key, signUpData[key]);
      });
      formData.append("logo", selectedImage3);
    } else {
      Object.keys(signUpData).forEach((key) => {
        formData.append(key, signUpData[key]);
      });
    }

    // Object.keys(signUpData).forEach((key) => {
    //   formData.append(key, signUpData[key]);
    // });
    // if (selectedImage) {
    //   formData.append("image", selectedImage);
    // }
    // if (selectedImage2) {
    //   formData.append("detailImage", selectedImage2);
    // }
    // if (selectedImage3) {
    //   formData.append("logo", selectedImage3);
    // }

    try {
      const response = await putIndustryReq(industryid, formData);
      setSignUpData(initialValue);
      navigate("/admin-industries");
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
        style={{ paddingBottom: "15rem" }}
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
          <form className={`form-horizontal`} onSubmit={handleSubmit}>
            <diV className="form-group">
              <div className="col-xs-4">
                <span>
                  <h5>
                    <b>Image</b>
                  </h5>
                </span>
                <input
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                {imagePreview && (
                  <div>
                    <div
                      style={{
                        position: "relative",
                        display: "inline-block",
                      }}
                    >
                      <img
                        src={imagePreview}
                        alt="Selected Image"
                        style={{ width: "100px" }}
                      />
                      <button
                        type="button"
                        className="handle-remove close-button"
                        onClick={handleRemoveImage}
                      >
                        <span aria-hidden="true" className="text-light">
                          ×
                        </span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="col-xs-4">
                <span>
                  <h5>
                    <b>Detail Image</b>
                  </h5>
                </span>
                <input
                  name="detailImage"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                {imagePreview1 && (
                  <div>
                    <div
                      style={{
                        position: "relative",
                        display: "inline-block",
                      }}
                    >
                      <img
                        src={imagePreview1}
                        alt="Selected Image"
                        style={{ width: "100px" }}
                      />
                      <button
                        type="button"
                        className="handle-remove close-button"
                        onClick={handleRemoveImage}
                      >
                        <span aria-hidden="true" className="text-light">
                          ×
                        </span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="col-xs-4">
                <span>
                  <h5>
                    <b>Logo</b>
                  </h5>
                </span>
                <input
                  name="logo"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className={` `}
                  required
                />
                {imagePreview2 && (
                  <div>
                    <div
                      style={{
                        position: "relative",
                        display: "inline-block",
                      }}
                    >
                      <img
                        src={imagePreview2}
                        alt="Selected Image"
                        style={{ width: "100px" }}
                      />
                      <button
                        type="button"
                        className="handle-remove close-button"
                        onClick={handleRemoveImage}
                      >
                        <span aria-hidden="true" className="text-light">
                          ×
                        </span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </diV>
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
                    value={signUpData.email}
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
                <label className="form-label ">Website </label>
                <input
                  onChange={handleChange}
                  type="website"
                  required
                  name="website"
                  value={signUpData.website}
                  className={` form-control input-lg ${
                    errorMsg && !signUpData.website && "has-error"
                  } `}
                  placeholder="Date of Birth"
                />
                {errorMsg && !signUpData.website && (
                  <span className="text-danger">Enter website</span>
                )}
              </div>
            </div>

            <div className="form-group">
              <div className="col-xs-4">
                <label className="form-label ">Tagline </label>
                <div
                  className={`input-group ${
                    errorMsg && !signUpData.tagline && "has-error"
                  } `}
                >
                  <span className="input-group-addon">
                    <i className="gi gi-asterisk" />
                  </span>
                  <input
                    required
                    type="text"
                    name="tagline"
                    value={signUpData.tagline}
                    placeholder="tagline"
                    onChange={handleChange}
                    className={` form-control input-lg  `}
                  />
                </div>
                {errorMsg && !signUpData.tagline && (
                  <span className="text-danger">Enter tagline</span>
                )}
              </div>
            </div>

            <div className="form-group">
              <div className="col-xs-6">
                <label className="form-label ">Description </label>
                <CKEditor
                  editor={ClassicEditor}
                  data={signUpData.description}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setSignUpData({
                      ...signUpData,
                      description: data,
                    });
                  }}
                />
                {/* <textarea
                  onChange={handleChange}
                  className={` form-control input-lg ${
                    errorMsg && !signUpData.description && "has-error"
                  } `}
                  type="text"
                  required
                  name="description"
                  value={signUpData.description}
                  placeholder="Description"
                  rows={4}
                /> */}
                {errorMsg && !signUpData.description && (
                  <span className="text-danger">Please Enter description</span>
                )}
              </div>
              <div className="col-xs-6">
                <label className="form-label ">Detail </label>
                <CKEditor
                  editor={ClassicEditor}
                  data={signUpData.detail}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setSignUpData({
                      ...signUpData,
                      detail: data,
                    });
                  }}
                />
                {/* <textarea
                  onChange={handleChange}
                  type="text"
                  required
                  rows={4}
                  name="detail"
                  value={signUpData.detail}
                  className={` form-control input-lg ${
                    errorMsg && !signUpData.detail && "has-error"
                  } `}
                  placeholder="Date of Birth"
                /> */}
                {errorMsg && !signUpData.detail && (
                  <span className="text-danger">Enter detail</span>
                )}
              </div>

              {/* <div className="col-xs-4">
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
              </div> */}
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
                  value={signUpData.address_street}
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
                  value={signUpData.address_city}
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
                  value={signUpData.state}
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
                  value={signUpData.address_country}
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
                  name="address_zipcode"
                  value={signUpData.address_zipcode}
                  className={` form-control input-lg ${
                    errorMsg && !signUpData.address_zipcode && "has-error"
                  } `}
                  placeholder="Zip Code"
                />
                {errorMsg && !signUpData.address_zipcode && (
                  <span className="text-danger">Enter Zip Code</span>
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
                Update Industry
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditIndustry;