import React from "react";
import removepost from "../../../assets/imgs/post/removepost.svg";

const UnBlockModal = () => {
  return (
    <>
      <div
        id="modal-terms-unblock"
        className="modal"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        tabIndex={-1}
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div
              className=""
              style={{
                padding: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "end",
                }}
              >
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-hidden="true"
                >
                  <img src={removepost} alt="" />
                </button>
              </div>
              <p>
                <span className="Modal_unblock">Unblock</span>
                <span className="Modal_unblock_Name">Tom Craez?</span>
              </p>
              <p className="Unblock_Modal_Para">
                Tom Craez can now view your messages, follow your updates, and
                send you messages on Fruity Chat. They won't receive any
                notification that you've unblocked them.
              </p>
              <button className="Unblock_Modal_btn">Unblock</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UnBlockModal;
