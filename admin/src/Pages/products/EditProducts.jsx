import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { geIndustryOptionsReq } from "../industries/__requests/RequestUser";
import { getServiceOptionReq } from "../services/__requests/RequestUser";
import { editProductReq, getSingleProductReq } from "./__requests/RequestUser";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const EditProducts = () => {
  const initialValue = {
    industryId: "",
    serviceId: "",
    name: "",
    thumbnailImage: "",
    detail: "",
    detailImage: "",
    // features: "",
    video: "",
    video_description: "",
  };
  const [errorMsg, setErrorMsg] = useState(false);
  const [signUpData, setSignUpData] = useState({
    ...initialValue,
    features: [],
  });

  const [industryId, setIndustryId] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [selectedImage3, setSelectedImage3] = useState(null);

  const [postContent, setPostContent] = useState("");

  const [imagePreview, setImagePreview] = useState(null);
  const [imagePreview1, setImagePreview1] = useState(null);
  const [imagePreview2, setImagePreview2] = useState(null);

  const productId = useSelector((state) => state.productStateReducer);

  const getProductData = async () => {
    try {
      const response = await getSingleProductReq(productId);
      setSignUpData(response.data.product);
    } catch (error) {
      toast.error("Whoops! something wrong");
    }
  };

  useEffect(() => {
    if (productId) {
      getContactsData();
    }
  }, [productId]);

  const handleImageUpload = (event) => {
    const { name, files } = event.target;
    const file = files[0];

    switch (name) {
      case "thumbnailImage":
        setSelectedImage(file);
        setImagePreview(URL.createObjectURL(file));
        break;
      case "video":
        setSelectedImage2(file);
        setImagePreview1(URL.createObjectURL(file));
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
  const handleRemoveImage1 = () => {
    setImagePreview1(null);
  };
  const handleRemoveImage2 = () => {
    setImagePreview2(null);
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
    const advantageJSON = JSON.stringify(signUpData.features);
    const updatedadvantagesData = {
      ...signUpData,
      features: advantageJSON,
    };

    const formData = new FormData();

    if (selectedImage) {
      Object.keys(updatedadvantagesData).forEach((key) => {
        formData.append(key, updatedadvantagesData[key]);
      });
      formData.append("thumbnailImage", selectedImage);
    } else if (selectedImage2) {
      Object.keys(updatedadvantagesData).forEach((key) => {
        formData.append(key, updatedadvantagesData[key]);
      });
      formData.append("video", selectedImage2);
    } else if (selectedImage3) {
      Object.keys(updatedadvantagesData).forEach((key) => {
        formData.append(key, updatedadvantagesData[key]);
      });
      formData.append("detailImage", selectedImage3);
    } else {
      Object.keys(updatedadvantagesData).forEach((key) => {
        formData.append(key, updatedadvantagesData[key]);
      });
    }

     
    formData.append("industryId", selectedIndustry);
    formData.append("serviceId", selectedService);

    try {
      const response = await editProductReq(productId, formData);
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
      console.log("fetch error", error);
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
      console.log("Whoops! something wrong");
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

  const getSingleService = async () => {
    try {
      const response = await getSingleProductReq(productId);
      const formData = response.data.product;
      setSelectedIndustry(formData.industryId);
      setSelectedServices(formData.serviceId);

      const featuresArray = formData.features.map((item) => JSON.parse(item));
      setSignUpData({
        features: featuresArray.length > 0 ? featuresArray[0] : [],
        detail: formData.detail,

        name: formData.name,
        thumbnailImage: formData.thumbnailImage,
        video: formData.video,
        video_description: formData.video_description,
        detailImage: formData.detailImage,
      });
      if (formData.thumbnailImage) {
        const thumbnailImage = `${process.env.REACT_APP_IMAGE_URL}/${formData.thumbnailImage}`;
        setImagePreview(thumbnailImage); // Set preview for the old image
      }
      if (formData.video) {
        const video = `${process.env.REACT_APP_IMAGE_URL}/${formData.video}`;
        setImagePreview1(video); // Set preview for the old logo
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
    if (productId) getSingleService();
  }, [productId]);

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
            <div>
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
                          onClick={handleRemoveImage2}
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

              <diV className="form-group">
                <div className="col-xs-6">
                  <span>
                    <h5>
                      <b>Video</b>
                    </h5>
                  </span>
                  <input
                    name="video"
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
                        <video controls style={{ maxWidth: "50%" }}>
                          <source src={imagePreview1} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
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
                      className={`form-control input-lg `}
                      value={signUpData.name}
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
                  <label htmlFor="form-label  industrySelect">
                    Select Industry:
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
                <div className="col-xs-4">
                  <label htmlFor="form-label  industrySelect">
                    Select Service:
                  </label>
                  <div>
                    <select
                      id="industrySelect"
                      className={`form-control input-lg `}
                      value={selectedService}
                      onChange={handleServiceChange}
                    >
                      <option value="">Select an industry</option>
                      {serviceOption.map((service) => (
                        <option key={service.id} value={service._id}>
                          {service.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <div className="col-xs-12">
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
                    name="detail"
                    rows={4}
                    className={` form-control input-lg ${
                      errorMsg && !signUpData.detail && "has-error"
                    } `}
                    placeholder="Detail"
                    value={signUpData.detail}
                  /> */}

                  {errorMsg && !signUpData.detail && (
                    <span className="text-danger">Enter detail</span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <div className="col-xs-12">
                  <label className="form-label ">Video Description </label>
                  {/* <CKEditor
                    editor={ClassicEditor}
                    data={aboutUsData.whoWeAre}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setAboutUsData({
                        ...aboutUsData,
                        whoWeAre: data,
                      });
                    }}
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

                  {/* <textarea
                    onChange={handleChange}
                    className={` form-control input-lg ${
                      errorMsg && !signUpData.video_description && "has-error"
                    } `}
                    type="text"
                    required
                    name="video_description"
                    rows={4}
                    placeholder="Image description"
                    value={signUpData.video_description}
                  /> */}
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
                    Here are the Features of Product
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
                  Update Product
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProducts;
