import React, { useState, useRef, useEffect } from "react";
import "../../../../assets/css/social3.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import inputpicture from "../../../../assets/imgs/post/picture.svg";
import inputattachment from "../../../../assets/imgs/post/attachment.svg";
import inputemoji from "../../../../assets/imgs/post/emoji.svg";
import sendpost from "../../../../assets/imgs/post/sendpost/send_grey.svg";
import {
  addPostReq,
  singlePostReq,
  updatePostReq,
} from "../__request/RequestPost";
import CreatePostWithOneImg from "./CreatePostWithOneImg";
// import CreatingPostWithThreeImg from "./CreatingPostWithThreeImg";
import CreatingPostWithMultipleImg from "./CreatingPostWithMultipleImg";
import CreatingPostWithTwoImg from "./CreatingPostWithTwoImg";
import { postEditViewState, postRefresh } from "../../../../redux/action";
import removepost from "../../../../assets/imgs/post/removepost.svg";

const PostModal = () => {
  const dispatch = useDispatch();
  const initialValues = {
    content: "",
    photo: [],
  };
  const fileInput = useRef(null);
  const [postContent, setPostContent] = useState("");

  const loginUser = useSelector((state) => state.loginUserReducer);
  const postEditState = useSelector((state) => state.postEditState);

  // const [showImageBox, setShowImageBox] = useState(false);

  // const handleAddImageClick = () => {
  //   setShowImageBox(true);
  // };

  const [photos, setPhotos] = useState();

  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [postLoading, setPostLoading] = useState(false);
  const handleChange = (e) => {
    const selectedFiles = e.target.files;
    const updatedPhotos = [...selectedPhotos];
    for (let i = 0; i < selectedFiles.length; i++) {
      updatedPhotos.push(selectedFiles[i]);
    }
    setSelectedPhotos(updatedPhotos);
  };

  const handleSubmit = async (e) => {
    setPostLoading(true);
    e.preventDefault();

    const formData = new FormData();
    formData.append("content", postContent);
    selectedPhotos.forEach((photo) => {
      formData.append("photos", photo);
    });

    try {
      const response = await addPostReq(loginUser._id, formData);
      toast.success(response.data.message);
      setPostLoading(false);
      dispatch(postRefresh(true));

      setSelectedPhotos([]);
      setPostContent("");
      // setShowImageBox(false);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log("Error: Bad request");
        setPostLoading(false);
      } else {
        toast.error("There could be some error");
      }
    }
  };

  const updatePost = async (e) => {
    setPostLoading(true);
    e.preventDefault();

    const formData = new FormData();
    formData.append("content", postContent);
    selectedPhotos.forEach((photo) => {
      formData.append("photos", photo);
    });

    try {
      const response = await updatePostReq(postEditState, formData);
      toast.success(response.data.message);

      setPostLoading(false);
      dispatch(postRefresh(true));

      setSelectedPhotos([]);
      setPostContent("");
      // setShowImageBox(false);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log("Error: Bad request");
        setPostLoading(false);
      } else {
        toast.error("Error occurred during image upload");
      }
    }
  };

  const singlePostData = async () => {
    setPostLoading(true);
    try {
      const response = await singlePostReq(postEditState);
      const resObj = response.data.post;
      setPostContent(resObj.content);
      setSelectedPhotos(resObj.photos);
      setPostLoading(false);
    } catch (error) {
      toast.error("Single Data");
      setPostLoading(false);
    }
  };
  useEffect(() => {
    if (postEditState) {
      singlePostData();
    }
  }, [postEditState]);

  return (
    <>
      {" "}
      <form onSubmit={!postEditState ? handleSubmit : updatePost}>
        {postLoading ? (
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
          <div
            id="post-modal-terms"
            className="modal"
            tabIndex={-1}
            role="dialog"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-hidden="true"
                    // onClick={() => setShowImageBox(false)}
                  >
                    ×
                  </button>
                  <h4 className="text-center post-heading">Create Post</h4>
                </div>

                <div className="modal-body">
                  <a href="/">
                    <img
                      src={`${
                        loginUser.profilePicture ? `https://admin.bluesurge.com.pk/uploads/${loginUser.profilePicture}`
                          : 'img/placeholders/avatars/avatar2.jpg'
                      }`}
                      alt="avatar"
                      className="widget-image img-circle pull-left img_circle_border"
                      height={40}
                      width={40}
                    />
                  </a>
                  <h4 className="">
                    <a href="/">
                      <strong>{loginUser.name}</strong>
                    </a>
                  </h4>
                </div>

                <div className="form-group">
                  <textarea
                    id="widget-post3"
                    name="content"
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    rows={3}
                    className="form-control addpost-center"
                    placeholder="What’s on your mind?"
                    style={{ fontSize: "3rem" }}
                  />

                  {/* {showImageBox && ( */}
                  <div className="image-box">
                    {/* {selectedPhotos.length > 0 && (
                      <button
                        type="button"
                        className="close cross-position"
                        onClick={() => setSelectedPhotos([])}
                      >
                        ×wqfdqwdwqfwqf
                      </button>
                    )} */}
                    <div className="Img_Box_Container">
                      <div className="Img_Box_addPhoto_Container">
                        <input
                          id="photos"
                          name="photos"
                          type="file"
                          onChange={handleChange}
                          multiple
                          className="choose-btn"
                          style={{ display: "none" }}
                        />

                        <label
                          htmlFor="photos"
                          className="custom-file-upload add_photo_btn"
                        >
                          Add Photo
                        </label>
                        {selectedPhotos.length > 0 && (
                          <button
                            type="button"
                            onClick={() => setSelectedPhotos([])}
                            style={{
                              border: "0",
                              backgroundColor: "transparent",
                            }}
                          >
                            <img src={removepost} alt="" />
                          </button>
                        )}
                      </div>
                      <div
                        style={{ margin: "", textAlign: "center" }}
                        className="row"
                      >
                        {selectedPhotos.length === 1 && (
                          <CreatePostWithOneImg post={selectedPhotos} />
                        )}
                        {selectedPhotos.length === 2 && (
                          <CreatingPostWithTwoImg post={selectedPhotos} />
                        )}
                        {selectedPhotos.length >= 3 && (
                          <CreatingPostWithMultipleImg
                            post={selectedPhotos}
                            post1={selectedPhotos}
                          />
                        )}
                      </div>
                    </div>

                    {/* </div> */}
                  </div>
                  {/* )} */}
                </div>

                <div className="post-imports-icon">
                  <div className="">
                    <div className=" ">
                      <button
                        type="button"
                        className="addpost-icon"
                        data-toggle="tooltip"
                        title="Add Image"
                      >
                        <a
                          className=" theme_color_solid login_bottom_btn"
                          // onClick={handleAddImageClick}
                          onClick={() => dispatch(postEditViewState(null))}
                        >
                          <img src={inputpicture} />
                        </a>
                      </button>
                      <button
                        type="button"
                        className="addpost-icon"
                        data-toggle="tooltip"
                        title="Add Location"
                      >
                        <img src={inputattachment} />
                      </button>
                      <button
                        type="button"
                        className="addpost-icon"
                        data-toggle="tooltip"
                        title="Add Recording"
                      >
                        <img src={inputemoji} />
                      </button>
                    </div>
                  </div>
                  <div className="">
                    <button
                      type="submit"
                      className="addpost-icon"
                      style={{ marginBottom: "10px" }}
                      onClick={() => handleSubmit}
                    >
                      <img src={sendpost} alt="Send Post" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </form>
    </>
  );
};

export default PostModal;