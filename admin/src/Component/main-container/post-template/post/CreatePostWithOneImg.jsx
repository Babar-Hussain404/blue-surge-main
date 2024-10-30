import React from "react";

const CreatePostWithOneImg = ({ post }) => {
  const imageUrl = `${process.env.REACT_APP_IMAGE_URL}/${post[0].url}`;

  return (
    <div className="col-xs-12">
      {post[0].url ? (
        <img
          src={imageUrl}
          alt="Post Image"
          className="one_img_post post_img_radius"
        />
      ) : (
        <img
          src={URL.createObjectURL(post[0])}
          alt="Post Image"
          className="create_one_img_post one_img_post post_img_radius"
        />
      )}
    </div>
  );
};

export default CreatePostWithOneImg;
