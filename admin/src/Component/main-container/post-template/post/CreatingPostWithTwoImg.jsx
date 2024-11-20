const CreatingPostWithTwoImg = ({ post }) => {
  const imageUrl1 = `${process.env.REACT_APP_IMAGE_URL}/${post[0].url}`;
  const imageUrl2 = `${process.env.REACT_APP_IMAGE_URL}/${post[1].url}`;

  return (
    <>
      {post[0].url || post[1].url ? (
        <>
          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <img
              className="create_post_withtwoimg_img1 post_img_radius"
              src={imageUrl1}
            />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <img
              className="create_post_withtwoimg_img2 post_img_radius"
              src={imageUrl2}
            />
          </div>
        </>
      ) : (
        <>
          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <img
              className="create_post_withtwoimg_img1 post_img_radius"
              src={URL.createObjectURL(post[0])}
            />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <img
              className="create_post_withtwoimg_img2 post_img_radius"
              src={URL.createObjectURL(post[1])}
            />
          </div>
        </>
      )}
    </>
  );
};

export default CreatingPostWithTwoImg;
