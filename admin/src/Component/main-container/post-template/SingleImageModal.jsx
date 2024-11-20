import { useDispatch, useSelector } from "react-redux";

const SingleImageModal = () => {
  const postImages = useSelector((state) => state.postSingleImageReducer);
  const dispatch = useDispatch();
  return (
    <>
      {postImages && (
        <div
          id="modal-post-single-img"
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
                {/* <h4 className="modal-title">{postImages.userData.name}</h4> */}
              </div>
              <div className="modal-body">
                <div className="widget">
                  <div className="widget-extra-full themed-background-primary">
                    <div
                      id="widget-carousel5"
                      className="carousel slide remove-margin"
                    >
                      <div className="carousel-inner">
                        <div className={"active item"}>
                          <img
                            src={`${process.env.REACT_APP_IMAGE_URL}/${postImages}`}
                            alt="image"
                          />
                        </div>
                      </div>
                       
                    </div>
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

export default SingleImageModal;
