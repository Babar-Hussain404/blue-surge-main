import { useDispatch, useSelector } from "react-redux";
import {
  postImagesAction,
  postSingleImagesAction,
} from "../../../redux/action";

const PostWithMultipleImages = ({ post }) => {
  const dispatch = useDispatch();
  // postImagesAction
  const postDispath = () => {
    dispatch(postImagesAction(post));
  };
  const singlePostDispath = (single) => {
    dispatch(postSingleImagesAction(single));
  };
  const thirdImageBlurStyle =
    post.photos.length >= 3 ? { filter: "blur(5px)" } : {};
  const remainingImageCount =
    post.photos.length > 2 ? post.photos.length - 2 : 0;
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
            style={thirdImageBlurStyle}
          />
        </a>

        <a
          href="#modal-post-img"
          data-toggle="modal"
          className=" theme_color_solid login_bottom_btn"
          onClick={() => postDispath()}
        >
          {remainingImageCount >= 0 && (
            <span className="remaining-image-count">{`+${remainingImageCount}`}</span>
          )}
        </a>
      </div>
    </>
  );
};

export default PostWithMultipleImages;
