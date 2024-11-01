import { useDispatch, useSelector } from "react-redux";
import { postSingleImagesAction } from "../../../redux/action";

const PostWithTwoImage = ({ post }) => {
  console.log("post",post)
  const dispatch = useDispatch();
  const singlePostDispath = (single) => {
    dispatch(postSingleImagesAction(single));
  };

  return (
    <>
      {/* two image */}
      <div className=" ">
        <a
          href="#modal-post-single-img"
          data-toggle="modal"
          className=" theme_color_solid login_bottom_btn"
          onClick={() => singlePostDispath(post.photos[0].url)}
        >
          <img
            className="two_img_post_imgone post_img_radius"
            src={`https://admin.bluesurge.com.pk/uploads/${post.photos[0].url}`}
          />
        </a>
      </div>
      <div className=" ">
        <a
          href="#modal-post-single-img"
          data-toggle="modal"
          className=" theme_color_solid login_bottom_btn"
          onClick={() => singlePostDispath(post.photos[1].url)}
        >
          <img
            className="two_img_post_imgtwo post_img_radius"
            src={`https://admin.bluesurge.com.pk/uploads/${post.photos[1].url}`}
          />
        </a>
      </div>
      {/* end two image */}
    </>
  );
};

export default PostWithTwoImage;
