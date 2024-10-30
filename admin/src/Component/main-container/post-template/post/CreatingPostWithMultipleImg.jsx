const CreatingPostWithMultipleImg = ({ post, post1 }) => {
  const thirdImageBlurStyle = post.length >= 3 ? { filter: "blur(5px)" } : {};
  const remainingImageCount = post.length > 2 ? post.length - 2 : 0;
  const imageUrl1 = `${process.env.REACT_APP_IMAGE_URL}/${post[0].url}`;
  const imageUrl2 = `${process.env.REACT_APP_IMAGE_URL}/${post[1].url}`;
  const imageUrl3 = `${process.env.REACT_APP_IMAGE_URL}/${post[2].url}`;
  return (
    <>
      {post[0].url || post[1].url || post[2].url ? (
        <>
          <div className="col-lg-7 col-xs-12">
            <img
              className="three_img_post_imgone create_three_img_post_imgone post_img_radius"
              src={imageUrl1}
            />
          </div>
          <div className="col-lg-5 col-xs-12">
            <a
              href="#modal-post-single-img"
              data-toggle="modal"
              className=" theme_color_solid login_bottom_btn"
            >
              <img
                className="three_img_post_imgtwo create_three_img_post_imgtwo post_img_radius"
                src={imageUrl2}
              />
            </a>
            <a
              href="#modal-post-single-img"
              data-toggle="modal"
              className=" theme_color_solid login_bottom_btn"
            >
              <img
                className="three_img_post_imgthree create_three_img_post_imgthree post_img_radius"
                src={imageUrl3}
              />
            </a>

            <a
              href="#modal-post-img"
              data-toggle="modal"
              className=" theme_color_solid login_bottom_btn"
            >
              {remainingImageCount >= 0 && (
                <span className="remaining-image-count">{`+${remainingImageCount}`}</span>
              )}
            </a>
          </div>
        </>
      ) : (
        <>
          <div className="col-xs-7">
            <img
              className="three_img_post_imgone create_three_img_post_imgone post_img_radius"
              src={URL.createObjectURL(post1[post1.length - 1])}
            />
          </div>
          <div className="col-xs-5">
            <a
              href="#modal-post-single-img"
              data-toggle="modal"
              className=" theme_color_solid login_bottom_btn"
            >
              <img
                className="three_img_post_imgtwo create_three_img_post_imgtwo post_img_radius"
                src={URL.createObjectURL(post1[post1.length - 2])}
              />
            </a>
            <a
              href="#modal-post-single-img"
              data-toggle="modal"
              className=" theme_color_solid login_bottom_btn"
            >
              <img
                className="three_img_post_imgthree create_three_img_post_imgthree post_img_radius"
                src={URL.createObjectURL(post1[post1.length - 3])}
                // style={thirdImageBlurStyle}
              />
            </a>

            <a
              href="#modal-post-img"
              data-toggle="modal"
              className=" theme_color_solid login_bottom_btn"
            >
              {remainingImageCount >= 0 && (
                <span className="remaining-image-count">{`+${remainingImageCount}`}</span>
              )}
            </a>
          </div>
        </>
      )}
    </>
  );
};

export default CreatingPostWithMultipleImg;
