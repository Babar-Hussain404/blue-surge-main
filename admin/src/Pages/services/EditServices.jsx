import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getIndustryReq } from "../industries/__requests/RequestUser";
import { getSingleServiceReq, putServiceReq } from "./__requests/RequestUser";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const EditServices = () => {
  const initialValue = {
    name: "",
    thumbnailImage: "",
    detailImage: "",
    advantages: [],
    detail: "",
    industryId: "",
  };
  const [errorMsg, setErrorMsg] = useState(false);
  const [signUpData, setSignUpData] = useState(initialValue);
  const serviceid = useSelector((state) => state.serviceStateReducer);

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [selectedImage3, setSelectedImage3] = useState(null);

  const [postContent, setPostContent] = useState("");

  const [imagePreview, setImagePreview] = useState(null);
  const [imagePreview1, setImagePreview1] = useState(null);
  const [imagePreview2, setImagePreview2] = useState(null);

  const handleImageUpload = (event) => {
    const { name, files } = event.target;
    const file = files[0];

    switch (name) {
      case "thumbnailImage":
        setSelectedImage(file);
        setImagePreview(URL.createObjectURL(file));
        break;
      case "detailImage":
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
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const handleIndustryChange = (event) => {
    setSelectedIndustry(event.target.value);
  };

  const handleChange = (e) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
  };
  const navigate = useNavigate();
  const [errIdMsg, setErrIdMsg] = useState("");


  const updateService = async (e) => { 
    e.preventDefault();

    const advantageJSON = JSON.stringify(signUpData.advantages);
    const updatedadvantagesData = {
      ...signUpData,
      advantages: advantageJSON,
    };

    const formData = new FormData();

    if (selectedImage) {
      Object.keys(updatedadvantagesData).forEach((key) => {
        formData.append(key, updatedadvantagesData[key]);
      });
      formData.append("thumbnailImage", selectedImage);
    } 
    else if (selectedImage3) {
      Object.keys(updatedadvantagesData).forEach((key) => {
        formData.append(key, updatedadvantagesData[key]);
      });
      formData.append("detailImage", selectedImage3);
    } else {
      Object.keys(updatedadvantagesData).forEach((key) => {
        formData.append(key, updatedadvantagesData[key]);
      });
    }

    // Append values from initialValue
    // Object.keys(updatedadvantagesData).forEach((key) => {
    //   if (updatedadvantagesData[key] !== "") {
    //     formData.append(key, updatedadvantagesData[key]);
    //   }
    // });

    // if (selectedImage) formData.append("thumbnailImage", selectedImage);
    // if (selectedImage3) formData.append("detailImage", selectedImage3);
    formData.append("industryId", selectedIndustry);

    try {
      const response = await putServiceReq(serviceid, formData);
      setSignUpData(initialValue);
      navigate("/admin-services");
      setErrIdMsg("");
    } catch (error) {
      console.log("error", error);
      if (error.response && error.response.status === 400) {
        setErrIdMsg(error.response.data.error);
        return false;
      }
    }
  };

  const [contactData, setContactData] = useState([]);
  const getContactsData = async () => {
    try {
      const response = await getIndustryReq();
      setContactData(response.data.industrys);
    } catch (error) {
      console.log("fetching error", error);
    }
  };
  useEffect(() => {
    getContactsData();
  }, []);

  const addAdvantage = () => {
    setSignUpData((prevSignUpData) => ({
      ...prevSignUpData,
      advantages: [
        ...prevSignUpData.advantages,
        {
          name: "",
        },
      ],
    }));
  };

  const updateDiagnosisEntry = (index, name, selectedValue) => {
    setSignUpData((prevState) => {
      const updatedAdvantages = [...prevState.advantages];
      updatedAdvantages[index][name] = selectedValue;
      return {
        ...prevState,
        advantages: updatedAdvantages,
      };
    });
  };

  const removeAdvantage = (index) => {
    setSignUpData((prevSignUpData) => {
      const updatedAdvantages = [...prevSignUpData.advantages];
      updatedAdvantages.splice(index, 1);
      return {
        ...prevSignUpData,
        advantages: updatedAdvantages,
      };
    });
  };

  const getSingleService = async () => {
    try {
      const response = await getSingleServiceReq(serviceid);
      const formData = response.data.service;
      setSelectedIndustry(formData.industryId);

      const advantagesArray = formData.advantages.map((item) =>
        JSON.parse(item)
      );
      setSignUpData({
        advantages: advantagesArray.length > 0 ? advantagesArray[0] : [],
        detail: formData.detail,
        name: formData.name,
        thumbnailImage: formData.thumbnailImage,
        detailImage: formData.detailImage,
      });
      if (formData.thumbnailImage) {
        const thumbnailImage = `${process.env.REACT_APP_IMAGE_URL}/${formData.thumbnailImage}`;
        setImagePreview(thumbnailImage); // Set preview for the old image
      }

      if (formData.detailImage) {
        const detailImage = `${process.env.REACT_APP_IMAGE_URL}/${formData.detailImage}`;
        setImagePreview2(detailImage); // Set preview for the old logo
      }
    } catch (error) {
      toast.error("Whoops! something wrong");
    }
  };
  useEffect(() => {
    if (serviceid) getSingleService();
  }, [serviceid]);

  return (
    <>
      <br />
      <div
        style={{ paddingBottom: "30rem" }}
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
          <form className={`form-horizontal`} onSubmit={updateService}>
            <diV className="form-group">
              <div className="col-xs-6">
                <span>
                  <h5>
                    <b>Thumbnail Image</b>
                  </h5>
                </span>

                <input
                  name="thumbnailImage"
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

              <div className="col-xs-6">
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
              <div className="col-xs-6">
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

              <div className="col-xs-6">
                <label htmlFor="form-label  industrySelect">
                  Select Industry
                </label>
                <div>
                  <select
                    id="industrySelect"
                    className={`form-control input-lg `}
                    value={selectedIndustry}
                    onChange={handleIndustryChange}
                  >
                    <option value="">Select an industry</option>
                    {contactData.map((industry) => (
                      <option key={industry.id} value={industry._id}>
                        {industry.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="col-xs-12">
                <label className="form-label ">Detail </label>
                {/* <textarea
                  onChange={handleChange}
                  type="text"
                  required
                  name="detail"
                  rows={4}
                  value={signUpData.detail}
                  className={` form-control input-lg ${
                    errorMsg && !signUpData.detail && "has-error"
                  } `}
                  placeholder="Date of Birth"
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

            <div
              className=""
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div>
                <h3>Advantages</h3>
                <div className="text-gray-600">
                  Here are the advantages of Industry
                </div>
              </div>
              <div>
                <button
                  type="button"
                  style={{ marginTop: "5rem" }}
                  className="btn btn-success"
                  onClick={addAdvantage}
                >
                  Add Advantages
                </button>
              </div>
            </div>

            {signUpData.advantages.map((advantage, index) => (
              <div
                style={{
                  padding: "1rem 0",
                  display: "flex",
                  justifyContent: "space-between",
                }}
                key={index}
              >
                <div style={{ width: "70%" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span>{index + 1}.</span>
                    <input
                      type="text"
                      value={advantage.name}
                      onChange={(e) =>
                        updateDiagnosisEntry(index, "name", e.target.value)
                      }
                      placeholder="Enter advantages..."
                      className="form-control"
                    />
                  </div>
                </div>

                <div style={{ width: "10%" }}>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => removeAdvantage(index)}
                  >
                    <i className="bi bi-trash-fill fs-4 px-0">Remove</i>
                  </button>
                </div>
              </div>
            ))}

            <div>
              <button
                type="submit"
                onClick={updateService}
                className="btn btn-primary"
              >
                {" "}
                Update Service
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditServices;
