import React, { useState } from "react";
import Close_Green from "../../../assets/imgs/Close_Green.svg";

const CompanyHidePosts = () => {
  const hidePages = [
    {
      img: "https://s3-alpha-sig.figma.com/img/ab82/d4dc/6e0965d7d31ee98005f9a957ac64cf0d?Expires=1715558400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XigCcHfko54k648mErT66TIoAx6ShyPFG7WU7RXU4QEcnDAy7bkQD9QYypbWpXSKdqzoZjAfIljTRJRLzVF4zkw4TdumxiaZWAc1kxsFvl1Dg36oncb2Xm6UlVtphxzhNJbDYkCSbf8Taq-K24aSLR1cVYZrRnKAWvtaKJxbgqEJT4Qg54C~QE0ld~JShFfbpaL0wI1HiE9fNyFi1MDw3fFn8vyceDCWMjfxtv6Erg2PDomGgs4qQw39AETDu0b-pkFtXXfzsH55lT7yXDhsizJQa~Shs-4bHTbiEG6Zq3m3YSarsUQYBm6oMahSg0bpL3AvpBRsiCN50ucySHQYMQ__",
      title: "Tom Craez",
    },
    {
      img: "https://s3-alpha-sig.figma.com/img/b111/b33f/148e754300cd4f5487f00376dcd9cc60?Expires=1715558400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=EVChOCl6McIfX6~K-dv~la7-k5aF5afqtG456EgWHpWm0eYCf-aaLm-z6YhhG09-vAeu5a8K02ziMW1pFt6isvA46RvCf6ILm1ef~0TBQiAk2aMCe3~5l~K407l4YuIAYy5REyOX4l4OF3arX7tQX9vDd5WnavEOqi9HMw8iiXBW81mftf2fLPo6LFqtL4aCm3fsay9hJpy3vuC995LbsVAFNjj-lrUj2i5IwZP~FE62N0e-7FcqFSrlriCBQ0eSoxXHuRsrEiQsuYcn8ajgCcy71GOYyP-9GIzBp03v9DvNCID9Wdlauf80H23BqnX27CRiz82ivv7gDqZzmsRDMg__",
      title: "Javed Imran - C.E.O",
    },
  ];
  const initialHideStates = Array(hidePages.length).fill(true); // Initialize all items as hidden
  const [hideStates, setHideStates] = useState(initialHideStates);

  const handleClick = (index) => {
    // Create a copy of the hideStates array
    const newHideStates = [...hideStates];
    // Toggle the state of the clicked item
    newHideStates[index] = !newHideStates[index];
    // Update the state
    setHideStates(newHideStates);
  };
  return (
    <>
      <form className="col-lg-9">
        <div className="company_Security_name_container">
          <img src={Close_Green} alt="" />
          <span>Hide Post</span>
        </div>

        <div className="company_security_Container">
          <p className="Heading">
            Hide all photos and videos you add to your timeline from specific
            people.
          </p>

          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <form
              action="page_ready_search_results.html"
              className="navbar-form navbar-left"
            >
              <div className="form-group">
                <input
                  type="text"
                  className="navbar-form-input Searr"
                  placeholder="Search..."
                />
              </div>
            </form>
          </div>
          <div style={{ width: "100%" }}>
            {hidePages.map((hidePages, index) => {
              return (
                <>
                  <div className="follow_widget_right_modal  center_top_profile">
                    <div className="follow_widget_right_full">
                      <a className="Other_user_info"
                        href="/"
                      >
                        <img
                          src={hidePages.img}
                          alt="avatar"
                          className="follow_widget_right img_circle_border"
                          style={{ height: "60px", width: "60px" }}
                        />
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <strong>{hidePages.title}</strong>
                          <strong className="Blocked_info">
                            {hidePages.title}
                          </strong>
                        </div>
                      </a>
                      <div
                        style={{ marginTop: "-4rem" }}
                        className="text-right"
                      >
                        <a
                          href="#modal-terms-unblock"
                          data-toggle="modal"
                          className=" follow_btn_right Unblock"
                        >
                          <button
                            className={`follow_btn_right ${
                              hideStates[index] ? "Hide_btn" : "Unhide_btn"
                            }`}
                            onClick={() => handleClick(index)} // Pass index to handleClick
                          >
                            <small>
                              {hideStates[index] ? "Hide" : "Unhide"}
                            </small>
                          </button>
                        </a>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </form>
    </>
  );
};

export default CompanyHidePosts;
