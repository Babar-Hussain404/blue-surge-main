import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addPostCommentReq,
  deleteCommentReq,
  deletePostReq,
  getCommentsReq,
  getPostsReq,
  singleCommentReq,
  singlePostReq,
  updateCommentReq,
  updateLikeReq,
} from "./__request/RequestPost";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PostWithOneImage from "./PostWithOneImage";
import PostWithTwoImage from "./PostWithTwoImage";
import PostWithImage from "./PostWithImage";
import PostWithMultipleImages from "./PostWithMultipleImages";
import dropdown from "../../../assets/imgs/post/editpostdropdown.svg";
import like_green from "../../../assets/imgs/like/like_green.svg";
import like_gray from "../../../assets/imgs/like/like_grey.svg";
import comment_grey from "../../../assets/imgs/like/comment_grey.svg";
import share_grey from "../../../assets/imgs/like/share_grey.svg";
import inputpicture from "../../../assets/imgs/post/picture.svg";
import inputattachment from "../../../assets/imgs/post/attachment.svg";
import inputemoji from "../../../assets/imgs/post/emoji.svg";
import sendpost from "../../../assets/imgs/post/sendpost/send_grey.svg";
import {
  commentViewState,
  postEditViewState,
  postRefresh,
} from "../../../redux/action";
import DeleteAlert from "../../../utility/DeleteAlert";
import EmojiPicker from "emoji-picker-react";
import ShowAllImgs from "./post/ShowAllImgs";
const AllPosts = () => {
  const loginUser = useSelector((state) => state.loginUserReducer);
  const postRefreshState = useSelector((state) => state.postRefreshReducer);
  const postEditState = useSelector((state) => state.postEditState);
  const commentState = useSelector((state) => state.commentState);
  const location = useLocation();
  const dispatch = useDispatch();
  const [postData, setPostData] = useState([]);
  const [postCommentsData, setPostCommentsData] = useState([]);
  const [postLoading, setPostLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState({});

  const [openCommentsMap, setOpenCommentsMap] = useState({});
  const toggleComments = (postId) => {
    setOpenCommentsMap((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
  };

  const toggleDropdown = (postId) => {
    setShowDropdown((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
  };

  const getPostData = async () => {
    try {
      setPostLoading(true);
      const response = await getPostsReq();
      setPostData(response.data.posts);
      dispatch(postRefresh(false));
      setPostLoading(false);
      postRefresh(false);
    } catch (error) {
      console.log("error: ", error);
      setPostLoading(false);
      dispatch(postRefresh(false));
    }
  };

  //delete post

  const [deleteDataID, setDeleteDataID] = useState("");
  const deletePostData = (ID) => {
    setDeleteDataID(ID);
  };
  const deletePost = async (id) => {
    try {
      const response = await deletePostReq(deleteDataID);
      if (response) {
        toast.success(response.data.message);
        getPostData();
      }
    } catch (error) {
      toast.error("There Could be Some Eroror");
    }
  };

  useEffect(() => {
    if (postRefreshState) {
      getPostData();
    }
  }, [postRefreshState, postLoading]);
  useEffect(() => {
    if (postLoading) {
      dispatch(postRefresh(true));
    }
  }, [postLoading]);

  const [likedPosts, setLikedPosts] = useState([]);

  const handleLike = (postId) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter((id) => id !== postId)); // Unlike the post
    } else {
      setLikedPosts([...likedPosts, postId]); // Like the post
    }
    AddLike(postId);
  };

  const isPostLiked = (postId) => likedPosts.includes(postId);

  const userId = loginUser._id;
  const AddLike = async (id) => {
    dispatch(postEditViewState(id));
    const formData = new FormData();
    formData.append("userId", userId);

    try {
      const response = await updateLikeReq(postEditState, formData);
      setPostLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log("Error: Bad request");
        setPostLoading(false);
      } else {
        toast.error("There could be some error");
      }
    }
  };

  //post comment
  const [selectedImage, setSelectedImage] = useState(null);
  const [postContent, setPostContent] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  const handleSubmit = async (e) => {
    // setPostLoading(true);
    e.preventDefault();

    const formData = new FormData();
    formData.append("content", postContent);
    formData.append("replyphotos", selectedImage);
    try {
      const response = await addPostCommentReq(
        postEditState,
        loginUser._id,
        formData
      );
      getCommentsData();
      setSelectedImage("");
      setPostContent("");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log("Error: Bad request");
      } else {
        toast.error("There could be some error");
      }
    }
  };

  //Get comments

  const getCommentsData = async () => {
    try {
      // setPostLoading(true);
      const response = await getCommentsReq(postEditState);
      setPostCommentsData(response.data.comments);
      // dispatch(postRefresh(false));
      // setPostLoading(false);
      postRefresh(false);
    } catch (error) {
      console.log("error: ", error);
      // setPostLoading(false);
      dispatch(postRefresh(false));
    }
  };
  useEffect(() => {
    if (postEditState) {
      getCommentsData();
    }
  }, [postEditState]);

  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);

  const toggleEmojiPicker = () => {
    setEmojiPickerVisible(!emojiPickerVisible);
  };
  const emojiPickerRef = useRef(null);
  const handleClickOutside = (event) => {
    if (
      emojiPickerRef.current &&
      !emojiPickerRef.current.contains(event.target)
    ) {
      setEmojiPickerVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onEmojiClick = (emojiObject) => {
    setEmojiPickerVisible(emojiObject);
    // You can handle the selected emoji here
  };

  const [dropdownStates, setDropdownStates] = useState(
    Array(postCommentsData.length).fill(false)
  );

  const handleOpenDropDown = (index) => {
    const newDropdownStates = [...dropdownStates];
    newDropdownStates[index] = !newDropdownStates[index];
    setDropdownStates(newDropdownStates);
  };

  const updatePost = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("content", postContent);
    formData.append("replyphotos", selectedImage);

    try {
      const response = await updateCommentReq(commentState, formData);
      getCommentsData();
      dispatch(commentViewState(null));
      setDropdownStates([]);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log("Error: Bad request");
      } else {
        toast.error("Error occurred during image upload");
      }
    }
  };

  const singleCommentData = async () => {
    // setPostLoading(true);
    try {
      const response = await singleCommentReq(commentState);
      const resObj = response.data.comment;
      setPostContent(resObj.content);
      setSelectedImage(resObj.photos);
      // setPostLoading(false);
    } catch (error) {
      toast.error("Single Data");
      // setPostLoading(false);
    }
  };
  useEffect(() => {
    if (commentState) {
      singleCommentData();
    }
  }, [commentState]);
  useEffect(() => {
    dispatch(commentViewState(null));
  }, []);

  const deleteComment = async (id) => {
    try {
      const response = await deleteCommentReq(id);
      if (response) {
        // toast.success(response.data.message);
        getCommentsData();
        setDropdownStates([]);
      }
    } catch (error) {
      toast.error("There Could be Some Eroror");
    }
  };

  return (
    <>
      {postRefreshState ? (
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
        <>
          {postData.map((post) => {
            const isDropdownOpen = showDropdown[post._id] || false;
            return (
              <div key={post._id} className="widget">
                <div
                  style={{ marginBottom: "1rem" }}
                  className="widget-simple "
                >
                  <div className="dropdown">
                    <a data-toggle="dropdown">
                      <a className={`pull-right`}>
                        <img src={dropdown} />
                      </a>
                    </a>
                    <br />
                    <ul className="dropdown-menu dropdown-custom dropdown-menu-right">
                      <li className="text-center">
                        <a href="javascript:void(0)">Save Post</a>

                        <a
                          href="#post-modal-terms"
                          data-toggle="modal"
                          className=" theme_color_solid login_bottom_btn"
                          onClick={() => dispatch(postEditViewState(post._id))}
                        >
                          Edit Post
                        </a>
                        <a
                          href="#delete-modal-terms"
                          data-toggle="modal"
                          className=" theme_color_solid login_bottom_btn"
                          onClick={() => deletePostData(post._id)}
                        >
                          Delete
                        </a>
                      </li>
                    </ul>
                  </div>

                  <a href="/">
                    <img
                      src={`${
                        post.userData.profilePicture
                          ? `${process.env.REACT_APP_IMAGE_URL}/${post.userData.profilePicture}`
                          : `img/placeholders/avatars/avatar2.jpg`
                      }`}
                      alt="avatar"
                      className="widget-image img-circle pull-left img_circle_border"
                    />
                  </a>
                  <h4 className="widget-content">
                    <a href="">
                      <strong>{post.userData.name}</strong>
                    </a>
                    <small>33 mins ago</small>
                  </h4>
                </div>

                <div className="widget-extra ">
                  <div className="row ">
                    <div className="col-xs-12 ">
                      <p className="">{post.content}</p>
                    </div>
                  </div>
                  <div className="post_images">
                    {/* {post.photos.length === 0 ? (
                      <></>
                    ) : post.photos.length === 1 ? (
                      <PostWithOneImage post={post} />
                    ) : post.photos.length === 2 ? (
                      <PostWithTwoImage postImages={post} />
                    ) : post.photos.length === 3 ? (
                      <PostWithImage post={post} />
                    ) : (
                      <PostWithMultipleImages post={post} />
                    )} */}

                    {post.photos.length === 1 ? (
                      <PostWithOneImage post={post} />
                    ) : (
                      <ShowAllImgs postImages={post} />
                    )}
                  </div>
                  <div className="row text-center  ">
                    <div className="col-xs-12">
                      <div className="post_btn_group">
                        <button
                          type="button"
                          className="btn_post theme_color2"
                          data-toggle="tooltip"
                          title="Add Image"
                          // onClick={AddLike}
                          onClick={() => handleLike(post._id)}
                        >
                          {likedPosts.length}
                          <img
                            src={isPostLiked(post._id) ? like_green : like_gray}
                            alt="Like Icon"
                          />{" "}
                          {isPostLiked(post._id) ? "Liked" : "Like"}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            toggleComments(post._id); // Call toggleComments function
                            dispatch(postEditViewState(post._id)); // Dispatch the action
                          }}
                          className="btn_post"
                          data-toggle="tooltip"
                          title="Add Location"
                        >
                          <img src={comment_grey} /> Comment
                          {/* <EmojiPicker /> */}
                        </button>

                        <button
                          type="button"
                          className="btn_post"
                          data-toggle="tooltip"
                          title="Add Recording"
                        >
                          <img src={share_grey} /> Share
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {openCommentsMap[post._id] && (
                  <>
                    <div className="widget-extra comment_post_section">
                      <a href="/">
                        <img
                          src={`${
                            loginUser.profilePicture
                              ? `${process.env.REACT_APP_IMAGE_URL}/${loginUser.profilePicture}`
                              : `img/placeholders/avatars/avatar2.jpg`
                          }`}
                          alt="avatar"
                          className="widget-image img-circle pull-left img_circle_border"
                        />
                      </a>
                      <form className="form-horizontal comment_section">
                        {!commentState && (
                          <div className="col-xs-12">
                            <textarea
                              id="widget-post3"
                              rows={2}
                              className="form-control addpost-center"
                              placeholder="Add a comment..."
                              value={postContent}
                              onChange={(e) => setPostContent(e.target.value)}
                            />
                          </div>
                        )}
                        <div className="form-group  ">
                          <div className="col-xs-6">
                            <div className=" ">
                              {selectedImage && (
                                <div>
                                  <div
                                    style={{
                                      position: "relative",
                                      display: "inline-block",
                                    }}
                                  >
                                    <img
                                      src={selectedImage}
                                      alt="Selected Image"
                                      style={{ width: "100px" }}
                                    />
                                    <button
                                      type="button"
                                      className="handle-remove close-button"
                                      onClick={handleRemoveImage}
                                    >
                                      <span
                                        aria-hidden="true"
                                        className="text-light"
                                      >
                                        ×
                                      </span>
                                    </button>
                                  </div>
                                </div>
                              )}
                              <button
                                type="button"
                                className="addpost-icon"
                                data-toggle="tooltip"
                                title="Add Image"
                                onClick={() =>
                                  document.getElementById("imageInput").click()
                                }
                              >
                                <img src={inputpicture} alt="Add Image" />
                              </button>

                              <input
                                name="replyphotos"
                                type="file"
                                accept="image/*"
                                style={{ display: "none" }}
                                id="imageInput"
                                onChange={handleImageUpload}
                              />

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
                                onClick={toggleEmojiPicker}
                              >
                                <img src={inputemoji} />
                              </button>
                              {emojiPickerVisible && (
                                <EmojiPicker ref={emojiPickerRef} />
                                // <EmojiPicker
                                //   onEmojiClick={onEmojiClick}
                                //   autoFocusSearch={true}
                                //   theme="light"
                                //   emojiStyle="apple"
                                //   defaultSkinTone="neutral"
                                //   ref={emojiPickerRef}
                                // />
                              )}
                            </div>
                          </div>
                          <div className="col-xs-6 text-right">
                            <button
                              type="submit"
                              className=" addpost-icon"
                              onClick={handleSubmit}
                            >
                              <img src={sendpost} />
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>

                    {postCommentsData.map((comment, index) => (
                      <ul className="media-list push" key={index}>
                        <li className="media">
                          <a
                            href="page_ready_user_profile.html"
                            className="pull-left"
                          >
                            <img
                              src={
                                comment.profilePicture
                                  ? `${process.env.REACT_APP_IMAGE_URL}/${comment.profilePicture}`
                                  : `img/placeholders/avatars/avatar2.jpg`
                              }
                              alt="Avatar"
                              className="img-circle"
                              style={{ width: "40px" }}
                            />
                          </a>
                          <div className="media-body">
                            <a href="page_ready_user_profile.html">
                              <strong>{comment.name}</strong>
                            </a>
                            <span className="text-muted">
                              <small>
                                <em>29 min ago</em>
                              </small>

                              {commentState === comment._id ? (
                                <>
                                  <div className="col-xs-12">
                                    <textarea
                                      id="widget-post3"
                                      rows={2}
                                      className="form-control addpost-center"
                                      placeholder="What’s on your mind?"
                                      name="content"
                                      value={postContent}
                                      onChange={(e) =>
                                        setPostContent(e.target.value)
                                      }
                                    />
                                  </div>

                                  <div className="form-group  ">
                                    <div className="col-xs-6">
                                      <div className=" ">
                                        {selectedImage && (
                                          <div>
                                            <div
                                              style={{
                                                position: "relative",
                                                display: "inline-block",
                                              }}
                                            >
                                              <img
                                                src={selectedImage}
                                                alt="Selected Image"
                                                style={{ width: "100px" }}
                                              />
                                              <button
                                                type="button"
                                                className="handle-remove close-button"
                                                onClick={handleRemoveImage}
                                              >
                                                <span
                                                  aria-hidden="true"
                                                  className="text-light"
                                                >
                                                  ×
                                                </span>
                                              </button>
                                            </div>
                                          </div>
                                        )}
                                        <button
                                          type="button"
                                          className="addpost-icon"
                                          data-toggle="tooltip"
                                          title="Add Image"
                                          onClick={() =>
                                            document
                                              .getElementById("imageInput")
                                              .click()
                                          }
                                        >
                                          <img
                                            src={inputpicture}
                                            alt="Add Image"
                                          />
                                        </button>

                                        <input
                                          name="replyphotos"
                                          type="file"
                                          accept="image/*"
                                          style={{ display: "none" }}
                                          id="imageInput"
                                          onChange={handleImageUpload}
                                        />

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
                                          onClick={toggleEmojiPicker}
                                        >
                                          <img src={inputemoji} />
                                        </button>
                                        <button
                                          type="button"
                                          className="close-button"
                                          onClick={() =>
                                            dispatch(commentViewState(null)) &&
                                            setDropdownStates([])
                                          }
                                        >
                                          Close
                                        </button>
                                        {emojiPickerVisible && (
                                          <EmojiPicker ref={emojiPickerRef} />
                                        )}
                                      </div>
                                    </div>
                                    <div className="col-xs-6 text-right">
                                      <button
                                        type="submit"
                                        className=" addpost-icon"
                                        onClick={updatePost}
                                      >
                                        <img src={sendpost} />
                                      </button>
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <div style={{ cursor: "pointer" }} className="">
                                  <a onClick={() => handleOpenDropDown(index)}>
                                    <img src={dropdown} />
                                  </a>
                                  {dropdownStates[index] && (
                                    <div className="comment-dropDown text-center">
                                      <a
                                        onClick={() =>
                                          dispatch(
                                            commentViewState(comment._id)
                                          )
                                        }
                                      >
                                        Edit
                                      </a>
                                      <a
                                        onClick={() =>
                                          deleteComment(comment._id)
                                        }
                                      >
                                        Delete
                                      </a>
                                    </div>
                                  )}
                                </div>
                              )}
                            </span>
                            {!(commentState === comment._id) && (
                              <>
                                <p>{comment.content}</p>

                                {/* <img
                                  src={`${process.env.REACT_APP_IMAGE_URL}/${comment.replyphotos[0].url}`}
                                  alt="avatar"
                                  className="widget-image img-circle pull-left img_circle_border"
                                /> */}
                              </>
                            )}
                          </div>
                        </li>
                      </ul>
                    ))}
                  </>
                )}
              </div>
            );
          })}
          <DeleteAlert deletePost={deletePost} />
        </>
      )}
    </>
  );
};

export default AllPosts;
