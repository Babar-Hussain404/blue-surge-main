import { useDispatch, useSelector } from "react-redux";
import { postSingleImagesAction } from "../../../redux/action";

const PostWithImage = ({ post }) => {
  const dispatch = useDispatch();
  const singlePostDispath = (single) => {
    dispatch(postSingleImagesAction(single));
  };
  return (
    <>
      <div className="col-xs-7">
        <a
          href="#modal-post-single-img"
          data-toggle="modal"
          className=" theme_color_solid login_bottom_btn"
          onClick={() => singlePostDispath(post.photos[0].url)}
        >
          <img
            className="three_img_post_imgone post_img_radius"
            src={`${process.env.REACT_APP_IMAGE_URL}/${post.photos[0].url}`}
          />
        </a>
      </div>
      <div className="col-xs-5">
        <a
          href="#modal-post-single-img"
          data-toggle="modal"
          className=" theme_color_solid login_bottom_btn"
          onClick={() => singlePostDispath(post.photos[1].url)}
        >
          <img
            className="three_img_post_imgtwo post_img_radius"
            src={`${process.env.REACT_APP_IMAGE_URL}/${post.photos[1].url}`}
          />
        </a>
        <a
          href="#modal-post-single-img"
          data-toggle="modal"
          className=" theme_color_solid login_bottom_btn"
          onClick={() => singlePostDispath(post.photos[2].url)}
        >
          <img
            className="three_img_post_imgthree post_img_radius"
            src={`${process.env.REACT_APP_IMAGE_URL}/${post.photos[2].url}`}
          />
        </a>
      </div>
    </>
  );
};

export default PostWithImage;
