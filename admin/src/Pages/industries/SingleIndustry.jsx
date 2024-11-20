import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getSingleIndustryReq
} from "./__requests/RequestUser";

const SingleIndustry = ({ singleContactLoading, setSingleContactLoading }) => {
  const singleContactState = useSelector((state) => state.singleContactReducer);
  const [contactData, setContactData] = useState([]);
  const getContactsData = async () => {
    try {
      setSingleContactLoading(true);
      const response = await getSingleIndustryReq(singleContactState);
      setContactData(response.data.industry);
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
      id="singleIndustry-modal-terms"
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
              <strong>Industry Detail</strong>{" "}
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
                  <strong>Email:</strong>{" "}
                </h4>
                <h5>{contactData && contactData.email}</h5>
              </div>
              <div className="contact_single_data">
                <h4 className="modal-title">
                  <strong>Tag Line:</strong>{" "}
                </h4>
                <h5>{contactData && contactData.tagline}</h5>
              </div>
              <div className="contact_single_data">
                <h4 className="modal-title">
                  <strong>Description:</strong>{" "}
                </h4>
                <h5>{contactData && contactData.description}</h5>
              </div>
              <div className="contact_single_data">
                <h4 className="modal-title">
                  <strong>Address: </strong>{" "}
                </h4>
                <h5>
                  {contactData && contactData.address_street},{" "}
                  {contactData && contactData.address_city},{" "}
                  {contactData && contactData.address_state},{" "}
                  {contactData && contactData.address_country},{" "}
                  {contactData && contactData.address_zipcode}
                </h5>
              </div>
              <div className="contact_single_data">
                <h4 className="modal-title">
                  <strong>Website:</strong>{" "}
                </h4>
                <h5>{contactData && contactData.website}</h5>
              </div>
              <div className="contact_single_data">
                <h4 className="modal-title">
                  <strong>Detail:</strong>{" "}
                </h4>
                <h5>{contactData && contactData.detail}</h5>
              </div>

              <div className="text-center ">
                <h4 className="modal-title">
                  <strong>Logo:</strong>{" "}
                </h4>
                <br />
                <img
                  style={{ width: "200px" }}
                  src={`${process.env.REACT_APP_IMAGE_URL}/${
                    contactData && contactData.logo
                  }`}
                />
              </div>
              <br />
              <div className="text-center ">
                <h4 className="modal-title">
                  <strong>Image:</strong>{" "}
                </h4>
                <br />
                <img
                  style={{ width: "400px" }}
                  src={`${process.env.REACT_APP_IMAGE_URL}/${
                    contactData && contactData.image
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
                  style={{ width: "400px" }}
                  src={`${process.env.REACT_APP_IMAGE_URL}/${
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

export default SingleIndustry;
