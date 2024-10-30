import React from "react";
import removepost from "../../../assets/imgs/post/removepost.svg";
import Glob from "../../../assets/imgs/Glob.svg";

const PublicModal = () => {
  return (
    <>
      {/* <div
        id="modal-terms-public"
        className="modal"
        tabIndex={-1}
        role="dialog"
        aria-hidden="true"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-hidden="true"
                style={{ marginTop: "7px" }}
              >
                <img src={removepost} alt="" />
              </button>
              <h4 className="Modal_Heading  text-center">Select audience</h4>
            </div>
          </div>
        </div>
      </div> */}

      {/* <div
        id="modal-terms-public"
        className="modal"
        tabIndex={-1}
        role="dialog"
        aria-hidden="true"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-hidden="true"
                style={{ marginTop: "6px" }}
              >
                <img src={removepost} alt="" />
              </button>
              <h4 className="Modal_Heading  text-center">Select audience</h4>
            </div>
            <div className="modal-body" style={{ padding: "0" }}>
              <button className="Public_Modal_btn_Container">
                <div className="Public_Modal_btn_Heading">
                  <img src={Glob} alt="" />
                  <div style={{display:"flex", flexDirection:"column", alignItems:"end"}}>
                    <span>Public</span>
                    <span>Public</span>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div> */}

      <div
        id="modal-terms-public"
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
              <h4 className="  Modal_Heading">Select audience</h4>
            </div>
            <div className="modal-body" style={{padding:"0"}}>
              <button className="Public_Modal_btn_Container">
                <div className="Public_Modal_btn_Heading">
                  <img src={Glob} alt="" />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap:"5px"
                    }}
                  >
                    <span className="Public_Modal_btn_Name">Public</span>
                    <span>Public</span>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PublicModal;
