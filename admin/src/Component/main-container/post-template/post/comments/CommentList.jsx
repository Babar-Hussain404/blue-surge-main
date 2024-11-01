import React, { useEffect, useState } from "react";
import { deleteCommentReq, getCommentsReq } from "../../__request/RequestPost";
import { useDispatch, useSelector } from "react-redux";
import { postRefresh } from "../../../../../redux/action";
// import inputpicture from "../../../../assets/imgs/post/picture.svg";
import inputpicture from '../../../../../assets/imgs/post/picture.svg'
const CommentList = () => {
  const postEditState = useSelector((state) => state.postEditState);
  const commentState = useSelector((state) => state.commentState);

  const [selectedImage, setSelectedImage] = useState(null);
  const [postContent, setPostContent] = useState("");
  const [postCommentsData, setPostCommentsData] = useState([]);
  const dispatch = useDispatch();

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  const [dropdownStates, setDropdownStates] = useState(
    Array(postCommentsData.length).fill(false)
  );

  const handleOpenDropDown = (index) => {
    const newDropdownStates = [...dropdownStates];
    newDropdownStates[index] = !newDropdownStates[index];
    setDropdownStates(newDropdownStates);
  };

  const getCommentsData = async () => {
    try {
      const response = await getCommentsReq(postEditState);
      setPostCommentsData(response.data.comments);
      postRefresh(false);
    } catch (error) {
      console.log("error: ", error);
      dispatch(postRefresh(false));
    }
  };
  useEffect(() => {
    if (postEditState) {
      getCommentsData();
    }
  }, [postEditState]);
  const deleteComment = async (id) => {
    try {
      const response = await deleteCommentReq(id);
      if (response) {
        getCommentsData();
        setDropdownStates([]);
      }
    } catch (error) {
      console.log("There Could be Some Eroror");
    }
  };

  return (
    <>
      {postCommentsData.map((comment, index) => (
        <ul className="media-list push" key={index}>
          <li className="media">
            <a href="page_ready_user_profile.html" className="pull-left">
              <img
                src={
                  comment.profilePicture
                    ? `https://admin.bluesurge.com.pk/uploads/${comment.profilePicture}`
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
                </span>
                <div> {comment.content}</div>

                {/* {commentState === comment._id ? (
                  <>
                    <div className="col-xs-12">
                      <textarea
                        id="widget-post3"
                        rows={2}
                        className="form-control addpost-center"
                        placeholder="What’s on your mind?"
                        name="content"
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
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
                            dispatch(commentViewState(comment._id))
                          }
                        >
                          Edit
                        </a>
                        <a onClick={() => deleteComment(comment._id)}>Delete</a>
                      </div>
                    )}
                  </div>
                )}
              </span>
              {!(commentState === comment._id) && <p>{comment.content}</p>} */}
            </div>
          </li>
        </ul>
      ))}
    </>
  );
};

export default CommentList;
