import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux"; 
import { getSingleContactReq } from "./__requests/RequestUser";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SingleContact = ({ singleContactLoading, setSingleContactLoading }) => {
  const singleContactState = useSelector((state) => state.singleContactReducer);
  const [contactData, setContactData] = useState([]);
  const getContactsData = async () => {
    try {
      setSingleContactLoading(true);
      const response = await getSingleContactReq(singleContactState);
      setContactData(response.data);
      setSingleContactLoading(false);
    } catch (error) {
      // toast.error("Whoops! something wrong");
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
      id="singleContact-modal-terms"
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
              <strong>Message Detail</strong>{" "}
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
                <h5>
                  {contactData.firstName} {contactData.lastName}
                </h5>
              </div>
              <div className="contact_single_data">
                <h4 className="modal-title">
                  <strong>Email:</strong>{" "}
                </h4>
                <h5>{contactData.email}</h5>
              </div>
              <div className="contact_single_data">
                <h4 className="modal-title">
                  <strong>Phone:</strong>{" "}
                </h4>
                <h5>{contactData.phone}</h5>
              </div>
              <div className="contact_single_data">
                <h4 className="modal-title">
                  <strong>Company Name:</strong>{" "}
                </h4>
                <h5>{contactData.companyName}</h5>
              </div>
              <div className="contact_single_data">
                <h4 className="modal-title">
                  <strong>Address: </strong>{" "}
                </h4>
                <h5>
                  {contactData.street}, {contactData.city},{" "}
                  {contactData.country}, {contactData.postalCode}
                </h5>
              </div>
              <div className="contact_single_data">
                <h4 className="modal-title">
                  <strong>Message:</strong>{" "}
                </h4>
                <h5>{contactData.message}</h5>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleContact;
