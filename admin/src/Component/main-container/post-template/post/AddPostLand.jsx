import React, { useEffect, useState } from "react";
// import inputpicture from "../../assets/imgs/post/picture.svg";
import inputpicture from "../../../../assets/imgs/post/picture.svg";
import inputattachment from "../../../../assets/imgs/post/attachment.svg";
import inputemoji from "../../../../assets/imgs/post/emoji.svg";
import sendpost from "../../../../assets/imgs/post/sendpost/send_grey.svg";
import { useDispatch, useSelector } from "react-redux";
import { addPostReq, getPostsReq } from "../__request/RequestPost";
import { postEditViewState, postRefresh } from "../../../../redux/action";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PostModal from "./PostModal";
const AddPostLand = () => {
  const dispatch = useDispatch();
  const initialValues = {
    content: "",
  };
  const loginUser = useSelector((state) => state.loginUserReducer);
  const [postContent, setPostContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!postContent.trim()) {
      // console.log("Post content is empty.");
      return;
    }

    try {
      const response = await addPostReq(loginUser._id, {
        content: postContent,
      });
      toast.success(response.data.message);
      setPostContent("");
      // postRefresh
      dispatch(postRefresh(true));
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log("Error: Bad request");
      } else {
        console.log("Error occurred during post creation:", error.message);
      }
    }
  };

  return (
    <div className="widget addpost-area-center">
      <div className="widget-extra-full">
        <form className="form-horizontal" onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="col-xs-12">
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
            </div>
          </div>
          <div className="form-group remove-margin-bottom">
            <div className="col-xs-6">
              <div className=" ">
                <button
                  type="button"
                  className="addpost-icon"
                  data-toggle="tooltip"
                  title="Add Image"
                >
                  <a
                    href="#post-modal-terms"
                    data-toggle="modal"
                    className=" theme_color_solid login_bottom_btn"
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
            <div className="col-xs-6 text-right">
              <button
                type="submit"
                className=" addpost-icon"
                onSubmit={handleSubmit}
              >
                <img src={sendpost} />
              </button>
            </div>
          </div>
        </form>
      </div>
      <PostModal />
    </div>
  );
};

export default AddPostLand;
