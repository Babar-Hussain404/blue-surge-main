import React from 'react'
import { useSelector } from "react-redux"; 
const ProfileWidgetLand = () => {
  const loginUser = useSelector((state) => state.loginUserReducer);
  return (
    <div className="widget center_top_profile">
            <div className="widget-simple">
              <a href="/">
                <img
                  // src="img/placeholders/avatars/avatar2.jpg"
                  src={`${loginUser.profilePicture? `${process.env.REACT_APP_IMAGE_URL}/${loginUser.profilePicture}`: `img/placeholders/avatars/avatar2.jpg`}`}
      
                  alt="avatar"
                  className="widget-image img-circle pull-left img_circle_border"
                />
              </a>
              <h4 className="widget-content">
                <a href="/">
                  <strong>{loginUser.name}</strong>
                </a>
                <small>{loginUser.email}</small>
              </h4>

              <h4
                style={{ marginTop: "-5rem" }}
                className="widget-content text-right"
              >
                <a href="/" className="">
                  <small>Followers</small>
                </a>
                <strong className="theme_color2">3.5k</strong>
              </h4>
            </div>
          </div>
  )
}

export default ProfileWidgetLand
