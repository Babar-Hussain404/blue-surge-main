import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { geIndustryOptionsReq } from "../industries/__requests/RequestUser";
import { postServiceReq } from "./__requests/RequestUser";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const AddService = () => {
  const initialValue = {
    name: "",
    thumbnailImage: "",
    detailImage: "",
    detail: "",
    industryId: "",
  };
  const [errorMsg, setErrorMsg] = useState(false);
  const [signUpData, setSignUpData] = useState({
    ...initialValue,
    advantages: [],
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImage3, setSelectedImage3] = useState(null);

  const [imagePreview, setImagePreview] = useState(null);
  const [imagePreview2, setImagePreview2] = useState(null);

  const [thumbnailImageError, setThumbnailImageError] = useState(false);
  const [detailImageError, setDetailImageError] = useState(false);

  const handleImageUpload = (event) => {
    const { name, files } = event.target;
    const file = files[0];

    switch (name) {
      case "thumbnailImage":
        setSelectedImage(file);
        setImagePreview(URL.createObjectURL(file));
        setThumbnailImageError(false); // Reset error
        break;

      case "detailImage":
        setSelectedImage3(file);
        setImagePreview2(URL.createObjectURL(file));   
        setDetailImageError(false); // Reset error
        break;
      default:
        break;
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setThumbnailImageError(true); // Set error when image is removed
  };

  const handleRemoveImage1 = () => {
    setSelectedImage3(null);
    setImagePreview2(null);
    setDetailImageError(true); // Set error when image is removed
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasError = false;

    if (!signUpData.name || !signUpData.detail) {
      setErrorMsg(true);
      hasError = true;
    }

    if (!selectedImage) {
      setThumbnailImageError(true);
      hasError = true;
    }

    if (!selectedImage3) {
      setDetailImageError(true);
      hasError = true;
    }

    if (!selectedIndustry) {
      hasError = true;
    }

    if (hasError) {
      return false;
    }

    const advantageJSON = JSON.stringify(signUpData.advantages);
    const updatedadvantagesData = {
      ...signUpData,
      advantages: advantageJSON,
    };
    const formData = new FormData();
    Object.keys(updatedadvantagesData).forEach((key) => {
      formData.append(key, updatedadvantagesData[key]);
    });

    formData.append("thumbnailImage", selectedImage);
    formData.append("detailImage", selectedImage3);
    formData.append("industryId", selectedIndustry);

    try {
      const response = await postServiceReq(formData);
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
      const response = await geIndustryOptionsReq();
      setContactData(response.data.industries);
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

  return (
    <>
      <br />
      <div
        style={{ paddingBottom: "35rem" }}
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
                      Thumbnail Image{" "}
                      <span className="text-danger">(600px*350px)</span>
                    </b>
                  </h5>
                </span>
                <input
                  className={`  `}
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
                {thumbnailImageError && (
                  <span className="text-danger">
                    Please upload a thumbnail image.
                  </span>
                )}
              </div>

              <div className="col-xs-6">
                <span>
                  <h5>
                    <b>
                      Detail Image{" "}
                      <span className="text-danger">(940px*807px)</span>
                    </b>
                  </h5>
                </span>
                <input
                  className={`  `}
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
                    Please upload a detail image.
                  </span>
                )}
              </div>
            </div>

            <div className="form-group">
              <div className="col-xs-6">
                <label className="form-label ">Name </label>
                <div
                  className={`input-group ${errorMsg && !signUpData.name && "has-error"
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

              <div className="col-xs-6">
                <label htmlFor="form-label  industrySelect">
                  Select Industry:
                </label>
                <div>
                  <select
                    id="industrySelect"
                    className={`form-control input-lg ${errorMsg && !signUpData.selectedIndustry && "has-error"
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
                  <span className="text-danger">Select Industry</span>
                )}
              </div>
            </div>
            <div className="form-group">
              <div className="col-xs-12">
                <label className="form-label ">Detail </label>
                {/* <textarea
                  onChange={handleChange}
                  type="text"
                  rows={5}
                  required
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
                onClick={handleSubmit}
                className="btn btn-primary"
                style={{ marginTop: "5rem" }}
              >
                Add Service
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddService;
