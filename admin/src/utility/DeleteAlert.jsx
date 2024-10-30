import React from "react";

const DeleteAlert = ({ deletePost }) => {
  return (
    <div
      id="delete-modal-terms"
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
            <h4 className="modal-title">Delete Alert</h4>
          </div>
          <div className="modal-body">
            <h4 style={{ textAlign: "center" }}>
              Are you sure you want to Delete!!
            </h4>
            <div className="delete-btn">
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                aria-hidden="true"
                style={{ marginRight: "2rem" }}
                onClick={deletePost}
              >
                Delete
              </button>
              <button
                type="button"
                className="btn btn-success"
                data-dismiss="modal"
                aria-hidden="true"
              >
                cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAlert;
