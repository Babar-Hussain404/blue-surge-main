import { useDispatch, useSelector } from "react-redux";

const PostImageModal = () => {
  const postImages = useSelector((state) => state.postImageReducer);
  const dispatch = useDispatch();
  return (
    <>
      {postImages && postImages.photos && (
        <div
          id="modal-post-img"
          className="modal"
          tabIndex={-1}
          role="dialog"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"  
                  className="close"
                  data-dismiss="modal"
                  aria-hidden="true"
                >
                  ×
                </button>
                <h4 className="modal-title">{postImages.userData.name}</h4>
              </div>
              <div className="modal-body">
                <div className="widget">
                  <div className="widget-extra-full themed-background-primary">
                    <div
                      id="widget-carousel5"
                      className="carousel slide remove-margin"
                    >
                      <div className="carousel-inner">
                        {postImages &&
                          postImages.photos &&
                          postImages.photos.map((post, index) => {
                            return (
                              <div
                                className={index === 0 ? "active item" : "item"}
                                key={index}
                              >
                                <img
                                  src={`https://admin.bluesurge.com.pk/uploads/${post.url}`}
                                  alt="image"
                                />
                              </div>
                            );
                          })}
                      </div>
                      <a
                        className="left carousel-control"
                        href="#widget-carousel5"
                        data-slide="prev"
                      >
                        <span>
                          <i className="fa fa-chevron-left" />
                        </span>
                      </a>
                      <a
                        className="right carousel-control"
                        href="#widget-carousel5"
                        data-slide="next"
                      >
                        <span>
                          <i className="fa fa-chevron-right" />
                        </span>
                      </a>
                    </div>
                  </div>
                  <div className="widget-simple">
                    <h4 className="widget-content">
                      <a
                        href="javascript:void(0)"
                        className="themed-color-primary"
                      >
                        <strong> {postImages.userData.name}</strong>
                      </a>
                      <small>
                        {postImages.userData.email}
                        <a
                          href="javascript:void(0)"
                          className="themed-color-primary"
                        ></a>
                      </small>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostImageModal;
