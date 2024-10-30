import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { geIndustryOptionsReq } from "../industries/__requests/RequestUser";
import { getServiceOptionReq } from "../services/__requests/RequestUser";
import { postProductReq } from "./__requests/RequestUser";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const AddProduct = () => {
  const initialValue = {
    industryId: "",
    serviceId: "",
    name: "",
    thumbnailImage: "",
    detail: "",
    detailImage: "",
    video: "",
    video_description: "",
  };
  const [errorMsg, setErrorMsg] = useState(false);
  const [thumbnailImageError, setThumbnailImageError] = useState(false);
  const [detailImageError, setDetailImageError] = useState(false);
  const [signUpData, setSignUpData] = useState({
    ...initialValue,
    features: [],
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [selectedImage3, setSelectedImage3] = useState(null);
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
        setThumbnailImageError(false);
        break;
      case "video":
        setSelectedImage2(file);
        setImagePreview1(URL.createObjectURL(file));
        break;
      case "detailImage":
        setSelectedImage3(file);
        setImagePreview2(URL.createObjectURL(file));
        setDetailImageError(false);
        break;
      default:
        break;
    }
  };

  const handleRemoveImage = (type) => {
    switch (type) {
      case "thumbnailImage":
        setSelectedImage(null);
        setImagePreview(null);
        break;
      case "video":
        setSelectedImage2(null);
        setImagePreview1(null);
        break;
      case "detailImage":
        setSelectedImage3(null);
        setImagePreview2(null);
        break;
      default:
        break;
    }
  };

  const [selectedIndustry, setSelectedIndustry] = useState("");
  const handleIndustryChange = (event) => {
    setSelectedIndustry(event.target.value);
  };
  const [selectedService, setSelectedServices] = useState("");
  const handleServiceChange = (event) => {
    setSelectedServices(event.target.value);
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
    let hasError = false;

    if (!selectedImage) {
      setThumbnailImageError(true);
      hasError = true;
    }
    if (!selectedImage3) {
      setDetailImageError(true);
      hasError = true;
    }
    
    if (!signUpData.name || !signUpData.detail || !signUpData.video_description) {
      setErrorMsg(true);
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const advantageJSON = JSON.stringify(signUpData.features);
    const updatedAdvantagesData = {
      ...signUpData,
      features: advantageJSON,
    };

    const formData = new FormData();

    // Append values from initialValue
    Object.keys(updatedAdvantagesData).forEach((key) => {
      formData.append(key, updatedAdvantagesData[key]);
    });

    formData.append("thumbnailImage", selectedImage);
    if(selectedImage2){
      formData.append("video", selectedImage2);
    }
    formData.append("detailImage", selectedImage3);
    formData.append("industryId", selectedIndustry);
    formData.append("serviceId", selectedService);

    try {
      const response = await postProductReq(formData);
      setSignUpData(initialValue);
      navigate("/admin-products");
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
      const response = await geIndustryOptionsReq();
      setContactData(response.data.industries);
    } catch (error) {
      console.log("error: ", error);
    }
  };
  useEffect(() => {
    getContactsData();
  }, []);

  const [serviceOption, setServiceOption] = useState([]);
  const getServiceOptionData = async () => {
    try {
      const response = await getServiceOptionReq(selectedIndustry);
      setServiceOption(response.data.services);
    } catch (error) {
      console.log("fetch error: ", error);
    }
  };
  useEffect(() => {
    if (selectedIndustry) {
      getServiceOptionData();
    }
  }, [selectedIndustry]);

  const addAdvantage = () => {
    setSignUpData((prevSignUpData) => ({
      ...prevSignUpData,
      features: [
        ...prevSignUpData.features,
        {
          name: "",
        },
      ],
    }));
  };

  const updateDiagnosisEntry = (index, name, selectedValue) => {
    setSignUpData((prevState) => {
      const updatedAdvantages = [...prevState.features];
      updatedAdvantages[index][name] = selectedValue;
      return {
        ...prevState,
        features: updatedAdvantages,
      };
    });
  };

  const removeAdvantage = (index) => {
    setSignUpData((prevSignUpData) => {
      const updatedAdvantages = [...prevSignUpData.features];
      updatedAdvantages.splice(index, 1);
      return {
        ...prevSignUpData,
        features: updatedAdvantages,
      };
    });
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
          <form className={`form-horizontal`} onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="col-xs-6">
                <span>
                  <h5>
                    <b>
                      Thumbnail{" "}
                      <span className="text-danger">(400px*200px)</span>
                    </b>
                  </h5>
                </span>
                <input
                  className={` `}
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
                        onClick={() => handleRemoveImage("thumbnailImage")}
                      >
                        <span aria-hidden="true" className="text-light">
                          ×
                        </span>
                      </button>
                    </div>
                  </div>
                )}
                {thumbnailImageError && (
                  <span className="text-danger">Please upload a thumbnail image</span>
                )}
              </div>

              <div className="col-xs-6">
                <span>
                  <h5>
                    <b>
                      Detail Image{" "}
                      <span className="text-danger">(550px*250px)</span>
                    </b>
                  </h5>
                </span>
                <input
                  className={` `}
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
                        onClick={() => handleRemoveImage("detailImage")}
                      >
                        <span aria-hidden="true" className="text-light">
                          ×
                        </span>
                      </button>
                    </div>
                  </div>
                )}
                {detailImageError && (
                  <span className="text-danger">Please upload a detail image</span>
                )}
              </div>
            </div>
            <div className="form-group">
              <div className="col-xs-12">
                <span>
                  <h5>
                    <b>Video</b>
                  </h5>
                </span>
                <input
                  className={` `}
                  name="video"
                  type="file"
                  accept="video/*"
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
                      <video
                        src={imagePreview1}
                        alt="Selected Video"
                        style={{ width: "100px" }}
                        controls // Add controls for video playback
                      />
                      <button
                        type="button"
                        className="handle-remove close-button"
                        onClick={() => handleRemoveImage("video")}
                      >
                        <span aria-hidden="true" className="text-light">
                          ×
                        </span>
                      </button>
                    </div>
                  </div>
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
                  <span className="text-danger">Enter Name</span>
                )}
              </div>

              <div className="col-xs-4">
                <label htmlFor="form-label industrySelect">
                  Select Industry:
                </label>
                <div>
                  <select
                    id="industrySelect"
                    className={`form-control input-lg ${
                      errorMsg && !selectedIndustry && "has-error"
                    } `}
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
                {errorMsg && !selectedIndustry && (
                  <span className="text-danger">
                    Enter Industry Before service
                  </span>
                )}
              </div>
              <div className="col-xs-4">
                <label htmlFor="form-label industrySelect">
                  Select Service:
                </label>
                <div>
                  <select
                    id="industrySelect"
                    className={`form-control input-lg ${
                      errorMsg && !selectedIndustry && "has-error"
                    } `}
                    value={selectedService}
                    onChange={handleServiceChange}
                  >
                    <option value="">Select a Service</option>
                    {serviceOption.map((service) => (
                      <option key={service.id} value={service._id}>
                        {service.name}
                      </option>
                    ))}
                  </select>
                </div>
                {errorMsg && !selectedService && (
                  <span className="text-danger">Enter service</span>
                )}
              </div>
            </div>
            <div className="form-group">
              <div className="col-xs-12">
                <label className="form-label ">Detail </label>
                {/* <textarea
                  rows={5}
                  onChange={handleChange}
                  type="text"
                  required
                  name="detail"
                  className={` form-control input-lg ${
                    errorMsg && !signUpData.detail && "has-error"
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
            <div className="form-group">
              <div className="col-xs-12">
                <label className="form-label ">Video Description </label>
                {/* <textarea
                  rows={5}
                  onChange={handleChange}
                  className={` form-control input-lg ${
                    errorMsg && !signUpData.video_description && "has-error"
                  } `}
                  type="text"
                  required
                  name="video_description"
                  placeholder="Video Description"
                /> */}
                
                <CKEditor
                    editor={ClassicEditor}
                    data={signUpData.video_description}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setSignUpData({
                        ...signUpData,
                        video_description: data,
                      });
                    }}
                  />
                {errorMsg && !signUpData.video_description && (
                  <span className="text-danger">
                    Please Enter description
                  </span>
                )}
              </div>
            </div>

            <div
              className=""
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div>
                <h3>Features</h3>
                <div className="text-gray-600">
                  Here are the features of Products
                </div>
              </div>
              <div>
                <button
                  type="button"
                  style={{ marginTop: "5rem" }}
                  className="btn btn-success"
                  onClick={addAdvantage}
                >
                  Add Features
                </button>
              </div>
            </div>

            {signUpData.features.map((advantage, index) => (
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
                      placeholder="Enter Features..."
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
                onClick={handleSubmit}
                className="btn btn-primary"
                style={{ marginTop: "5rem" }}
              >
                {" "}
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
