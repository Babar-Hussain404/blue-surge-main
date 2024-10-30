import React, { useState } from "react";
import { postAboutTeamReq } from "./__request/RequestPartners";

const AddPartner = ({ setAddState, setContactLoading }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const handleImageUpload = (event) => {
    const { name, files } = event.target;
    const file = files[0];
    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
  };
  const [errorMsg, setErrorMsg] = useState(false);
  const [teamData, setTeamData] = useState({
    title: "",
  });
  const handleChange = (e) => {
    setTeamData({
      ...teamData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(teamData).forEach((key) => {
      formData.append(key, teamData[key]);
    });

    formData.append("image", selectedImage);

    try {
      const response = await postAboutTeamReq(formData);
      setAddState(0);
      setContactLoading(true); 
      console.log("Form submitted successfully!");
      console.log("Response:", response);
    } catch (error) {
      console.log("error", error);
      setContactLoading(true);
      if (error.response && error.response.status === 400) {
        // setErrIdMsg(error.response.data.error);
        return false;
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <diV className="form-group">
          <div className="col-xs-4" style={{ marginTop: "-1.2rem" }}>
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
          </div>

          <div className="col-xs-4">
            <label className="form-label ">Link </label>
            <div
              className={`input-group ${
                errorMsg && !teamData.name && "has-error"
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
                name="title"
                className={`form-control input-lg `}
                placeholder="Link"
              />
            </div>
            {errorMsg && !teamData.name && (
              <span className="text-danger">
                Please Enter Link before Adding
              </span>
            )}
          </div>

          <div className="col-xs-4">
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn btn-primary"
              style={{ marginTop: "3rem", marginLeft: "2rem" }}
            >
              {" "}
              Add Partner
            </button>
          </div>
        </diV>
      </form>
    </>
  );
};

export default AddPartner;
