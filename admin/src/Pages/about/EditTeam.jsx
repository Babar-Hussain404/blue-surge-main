import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { postAboutTeamMemberReq } from './__requests/RequestAbout';

const EditTeam = ({ setAddState, setContactLoading }) => {
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
    title: '',
    designation: '',
    image:''
  })
  const handleChange = (e) => {
    setTeamData({
      ...teamData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
  
    // Append values from teamData
     
    // Check if the image has been changed or not
    if (selectedImage) {
      Object.keys(teamData).forEach((key) => {
        formData.append(key, teamData[key]);
      });
      formData.append("image", selectedImage);
    } else {
      Object.keys(teamData).forEach((key) => {
        formData.append(key, teamData[key]);
      });
    }
    try {
      const response = await postAboutTeamMemberReq(teamMemberEditReducer, formData);
      setAddState(0);
      setContactLoading(true);
    } catch (error) {
      console.log("Error:", error);
      setContactLoading(true);
      if (error.response && error.response.status === 400) {
        // Handle error if needed
      }
    }
  };
  
  const teamMemberEditReducer = useSelector((state) => state.teamMemberStateReducer);
  const getSingleTeamData = async (page) => {
    // setProductLoading(true)
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/about/team/${teamMemberEditReducer}`);
      setTeamData(response.data.team);
      if (response.data.team.image) {
        const image = `${process.env.REACT_APP_IMAGE_URL}/${response.data.team.image}`;
        setImagePreview(image);
      }
    } catch (error) {
      console.log("Error fetching products:", error);
      // setProductLoading(false)
      // dispatch(pageNumberRefresh(false));
    }
  };
  useEffect(() => {
    if (teamMemberEditReducer) {
      getSingleTeamData();
    }
  }, [teamMemberEditReducer])

  return (
    <>
      <form onSubmit={handleSubmit}>
        <diV className="form-group">
          <div className="col-xs-4" style={{ marginTop: '-1.2rem' }}>
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
            <label className="form-label ">Title </label>
            <div
              className={`input-group ${errorMsg && !teamData.name && "has-error"
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
                value={teamData.title}
                className={`form-control input-lg `}
                placeholder="Title"
              />
            </div>
            {errorMsg && !teamData.name && (
              <span className="text-danger">
                Please Enter Title before Adding
              </span>
            )}
          </div>

          <div className="col-xs-4">
            <label className="form-label ">Designation </label>
            <div
              className={`input-group ${errorMsg && !teamData.email && "has-error"
                } `}
            >
              <span className="input-group-addon">
                <i className="gi gi-envelope" />
              </span>
              <input
                onChange={handleChange}
                type="text"
                required
                name="designation"
                value={teamData.designation}
                className={`form-control input-lg `}
                placeholder="designation"
              />
            </div>
            {errorMsg && !teamData.email && (
              <span className="text-danger">
                Please Enter designation
              </span>
            )}
          </div>

          <div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn btn-primary"
              style={{ marginTop: '10rem', marginLeft: '2rem' }}
            >
              {" "}
              Update Team
            </button>
          </div>

        </diV>

      </form>
    </> 
  )
}

export default EditTeam
