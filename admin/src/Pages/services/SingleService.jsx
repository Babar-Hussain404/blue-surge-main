import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getSingleServiceReq } from "./__requests/RequestUser";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SingleService = ({ singleContactLoading, setSingleContactLoading }) => {
  const singleContactState = useSelector((state) => state.singleContactReducer);
  const [contactData, setContactData] = useState([]);
  const getContactsData = async () => {
    try {
      setSingleContactLoading(true);
      const response = await getSingleServiceReq(singleContactState);
      setContactData(response.data.service);
      setSingleContactLoading(false);
    } catch (error) {
      toast.error("Whoops! something wrong");
      setSingleContactLoading(false);
    }
  };

  useEffect(() => {
    if (singleContactLoading) {
      getContactsData();
    }
  }, [singleContactLoading]);

  return (
    <div
      id="singleService-modal-terms"
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
            <h4 className="modal-title">
              <strong>Service Detail</strong>{" "}
            </h4>
          </div>
          {singleContactLoading ? (
            <div
              style={{
                textAlign: "center",
                height: "30vh",
                width: "100%",
              }}
              className="modal-body"
            >
              <i className="fa fa-spinner fa-4x fa-spin"></i>
            </div>
          ) : (
            <div className="modal-body">
              <div className="contact_single_data">
                <h4 className="modal-title">
                  <strong>Name:</strong>{" "}
                </h4>
                <h5>{contactData && contactData.name}</h5>
              </div>
              <div className="contact_single_data">
                <h4 className="modal-title">
                  <strong>Detail:</strong>{" "}
                </h4>
                <h5>{contactData && contactData.detail}</h5>
              </div>
              <div className="contact_single_data">
                <h4 className="modal-title">
                  <strong>Industry Name:</strong>{" "}
                </h4>
                <h5>{contactData && contactData.industry_data[0].name}</h5>
              </div>
              <div className="contact_single_data">
                <h4 className="modal-title">
                  <strong>Industry Email:</strong>{" "}
                </h4>
                <h5>{contactData && contactData.industry_data[0].email}</h5>
              </div>
              <div className="contact_single_data">
                <h4 className="modal-title">
                  <strong>Advantages: </strong>{" "}
                </h4>
                <h5>{contactData && contactData.advantages.length}</h5>
              </div>

              <div className="contact_single_data">
                <h4 className="modal-title">
                  <strong>Detail:</strong>{" "}
                </h4>
                <h5>{contactData && contactData.detail}</h5>
              </div>

              <div className="text-center ">
                <h4 className="modal-title">
                  <strong>Thumbnail Image:</strong>{" "}
                </h4>
                <br />
                <img
                  style={{ width: "400px" }}
                  src={`https://admin.bluesurge.com.pk/uploads/${
                    contactData && contactData.thumbnailImage
                  }`}
                />
              </div>
              <br />
              <div className="text-center ">
                <h4 className="modal-title">
                  <strong>Detail Image:</strong>{" "}
                </h4>
                <br />
                <img
                  style={{ width: "200px" }}
                  src={`https://admin.bluesurge.com.pk/uploads/${
                    contactData && contactData.detailImage
                  }`}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleService;
