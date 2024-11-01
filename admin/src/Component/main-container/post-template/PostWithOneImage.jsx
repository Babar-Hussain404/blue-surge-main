import { useDispatch, useSelector } from "react-redux";
import { postSingleImagesAction } from "../../../redux/action";

const PostWithOneImage = ({ post }) => {
  const dispatch = useDispatch();
  const singlePostDispath = (single) => {
    dispatch(postSingleImagesAction(single));
  };
  return (
    <>
      <div className="">
        <a
          href="#modal-post-single-img"
          data-toggle="modal"
          className=" theme_color_solid login_bottom_btn"
          onClick={() => singlePostDispath(post.photos[0].url)}
        >
          <img
            src={`https://admin.bluesurge.com.pk/uploads/${post.photos[0].url}`}
            className="one_img_post post_img_radius"
          />
        </a>
      </div>
    </>
  );
};

export default PostWithOneImage;
