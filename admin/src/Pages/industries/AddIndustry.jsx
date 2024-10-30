import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postIndustryReq } from "./__requests/RequestUser";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const AddIndustry = () => {
  const initialValue = {
    name: "",
    logo: "",
    detailImage: "",
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
  const [errIdMsg, setErrIdMsg] = useState("");

  const [imageError, setImageError] = useState(false);
  const [detailImageError, setDetailImageError] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const handleImageUpload = (event) => {
    const { name, files } = event.target;
    const file = files[0];

    switch (name) {
      case "image":
        setSelectedImage(file);
        setImagePreview(URL.createObjectURL(file));
        setImageError(false);
        break;
      case "detailImage":
        setSelectedImage2(file);
        setImagePreview1(URL.createObjectURL(file));
        setDetailImageError(false);
        break;
      case "logo":
        setSelectedImage3(file);
        setImagePreview2(URL.createObjectURL(file));
        setLogoError(false);
        break;
      default:
        break;
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setSelectedImage(null);
  };
  const handleRemoveImage1 = () => {
    setImagePreview1(null);
    setSelectedImage2(null);
  };
  const handleRemoveImage2 = () => {
    setImagePreview2(null);
    setSelectedImage3(null);
  };

  const handleChange = (e) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;
    if (!selectedImage) {
      setImageError(true);
      isValid = false;
    }
    if (!selectedImage2) {
      setDetailImageError(true);
      isValid = false;
    }
    if (!selectedImage3) {
      setLogoError(true);
      isValid = false;
    }

    if (
      !signUpData.name ||
      !signUpData.tagline ||
      !signUpData.description ||
      !signUpData.detail
    ) {
      setErrorMsg(true);
      return false;
    }

    if (!isValid) return false;

    const formData = new FormData();

    // Append values from initialValue
    Object.keys(signUpData).forEach((key) => {
      formData.append(key, signUpData[key]);
    });

    formData.append("image", selectedImage);
    formData.append("detailImage", selectedImage2);
    formData.append("logo", selectedImage3);

    try {
      const response = await postIndustryReq(formData);
      setSignUpData(initialValue);
      navigate("/admin-industries");
      setErrIdMsg("");
      console.log("Form submitted successfully!");
      console.log("Response:", response);
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
            <div className="form-group">
              <div className="col-xs-4">
                <span>
                  <h5>
                    <b>
                      Image{" "}
                      <span className="text-danger">(433px * 379px )</span>
                    </b>
                  </h5>
                </span>
                <input
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className={` `}
                  required
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
                {imageError && (
                  <span className="text-danger">Please Upload Image</span>
                )}
              </div>
              <div className="col-xs-4">
                <span>
                  <h5>
                    <b>
                      Detail Image{" "}
                      <span className="text-danger">(617px*575px )</span>
                    </b>
                  </h5>
                </span>
                <input
                  name="detailImage"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className={` `}
                  required
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
                        onClick={handleRemoveImage1}
                      >
                        <span aria-hidden="true" className="text-light">
                          ×
                        </span>
                      </button>
                    </div>
                  </div>
                )}
                {detailImageError && (
                  <span className="text-danger">
                    Please Upload Detail Image
                  </span>
                )}
              </div>
              <div className="col-xs-4">
                <span>
                  <h5>
                    <b>
                      Logo <span className="text-danger">(240px*240px)</span>
                    </b>
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
                        onClick={handleRemoveImage2}
                      >
                        <span aria-hidden="true" className="text-light">
                          ×
                        </span>
                      </button>
                    </div>
                  </div>
                )}
                {logoError && (
                  <span className="text-danger">Please Upload Logo</span>
                )}
              </div>
            </div>
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
                  <span className="text-danger">Please Enter User Name</span>
                )}
              </div>
              <div className="col-xs-4">
                <label className="form-label ">Email </label>
                <div className={`input-group  `}>
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
                {/* {errorMsg && !signUpData.email && (
                  <span className="text-danger">
                    Please Enter Email before SignUp
                  </span>
                )} */}
              </div>
              <div className="col-xs-4">
                <label className="form-label ">Website </label>
                <input
                  onChange={handleChange}
                  type="website"
                  required
                  name="website"
                  className={` form-control input-lg  `}
                  placeholder="Website"
                />
                {/* {errorMsg && !signUpData.website && (
                  <span className="text-danger">Enter website</span>
                )} */}
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
                {/* <textarea
                  onChange={handleChange}
                  className={` form-control input-lg ${errorMsg && !signUpData.description && "has-error"
                    } `}
                  type="text"
                  required
                  rows={4}
                  name="description"
                  placeholder="Description"
                /> */}
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
                {errorMsg && !signUpData.description && (
                  <span className="text-danger">Please Enter description</span>
                )}
              </div>
              <div className="col-xs-6">
                <label className="form-label ">Detail </label>
                {/* <textarea
                  onChange={handleChange}
                  type="text"
                  required
                  rows={4}
                  name="detail"
                  className={` form-control input-lg ${errorMsg && !signUpData.detail && "has-error"
                    } `}
                  placeholder="Detail"
                /> */}
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
                {errorMsg && !signUpData.detail && (
                  <span className="text-danger">Enter detail</span>
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
                  className={` form-control input-lg  `}
                  type="text"
                  required
                  name="address_street"
                  placeholder="Street"
                />
                {/* {errorMsg && !signUpData.address_street && (
                  <span className="text-danger">
                    Please Enter Street Before SignUp
                  </span>
                )} */}
              </div>
              <div className="col-xs-4">
                <label className="form-label ">City </label>
                <input
                  onChange={handleChange}
                  className={` form-control input-lg  `}
                  type="text"
                  required
                  name="address_city"
                  placeholder="City"
                />
                {/* {errorMsg && !signUpData.address_city && (
                  <span className="text-danger">
                    Please Enter City Before SignUp
                  </span>
                )} */}
              </div>
              <div className="col-xs-4">
                <label className="form-label ">State </label>
                <input
                  onChange={handleChange}
                  type="text"
                  required
                  name="address_state"
                  className={` form-control input-lg  `}
                  placeholder="State"
                />
                {/* {errorMsg && !signUpData.address_state && (
                  <span className="text-danger">Enter State Before Signup</span>
                )} */}
              </div>
            </div>
            <div className="form-group">
              <div className="col-xs-4">
                <label className="form-label ">Country </label>
                <input
                  onChange={handleChange}
                  className={` form-control input-lg  `}
                  type="text"
                  required
                  name="address_country"
                  placeholder="Country"
                />
                {/* {errorMsg && !signUpData.address_country && (
                  <span className="text-danger">
                    Please Enter Country Before SignUp
                  </span>
                )} */}
              </div>
              <div className="col-xs-4">
                <label className="form-label ">Zip Code</label>
                <input
                  onChange={handleChange}
                  type="text"
                  required
                  name="address_zipcode"
                  className={` form-control input-lg  `}
                  placeholder="Zip Code"
                />
                {/* {errorMsg && !signUpData.address_zipcode && (
                  <span className="text-danger">Enter Zip Code</span>
                )} */}
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="btn btn-primary"
              >
                {" "}
                Add Industry
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddIndustry;
