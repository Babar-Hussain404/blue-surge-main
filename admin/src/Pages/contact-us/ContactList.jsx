import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  paginationRefreshAction,
  singleContactAction,
} from "../../redux/action";
import DeleteAlert from "../../utility/DeleteAlert";
import Pagination from "../../utility/Pagination";
import SingleContact from "./SingleContact";
import { deleteMessageReq, getContactReq } from "./__requests/RequestUser";
import ContactAddressList from "./contact-address/ContactAddressList";

const ContactList = () => {
  const loginUser = useSelector((state) => state.loginUserReducer);
  const pageNumber = useSelector((state) => state.paginationPageNumberReducer);
  const paginationRefresh = useSelector(
    (state) => state.paginationRefreshReducer
  );
  const dispatch = useDispatch();
  const [contactData, setContactData] = useState([]);
  const [contactLoading, setContactLoading] = useState(true);
  const [singleContactLoading, setSingleContactLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(true);
  const [paginationData, setPaginationData] = useState(null);

  const singleContactId = (id) => {
    dispatch(singleContactAction(id));
    setSingleContactLoading(true);
  };
  const getContactsData = async () => {
    try {
      setContactLoading(true);
      setDataLoading(true);
      const response = await getContactReq(pageNumber);
      setContactData(response.data.contacts);
      setPaginationData(response.data.meta);
      dispatch(paginationRefreshAction(false));
      setContactLoading(false);
      setDataLoading(false);
    } catch (error) {
      // toast.error("Whoops! something wrong");
      setContactLoading(false);
      setDataLoading(false);
      dispatch(paginationRefreshAction(false));
    }
  };

  const [deleteId, setDeleteId] = useState(); 
  const deleteContact = async () => { 
    try {
      const response = await deleteMessageReq(deleteId);
      toast.success(response.data.message);
      getContactsData();
    } catch (error) {
      toast.error("Whoops! something wrong");
    }
  };

  useEffect(() => {
    if (contactLoading || paginationRefresh) {
      getContactsData();
    }
  }, [contactLoading || paginationRefresh]);

  return (
    <>
      <br />
      <div id="page-content">
        <div className="  content-header-media">
          <div className="header-section">
            <div className="row">
              <div className="col-md-4 col-lg-6 hidden-xs hidden-sm">
                <h1>
                  Welcome <strong>{loginUser.name}</strong>
                  <br />
                  <br />
                  <small>to</small> Contact Page
                </h1>
              </div>
            </div>
          </div>
          <img
            src="img/placeholders/headers/dashboard_header.jpg"
            alt="header image"
            className="animation-pulseSlow"
          />
        </div>

        <div className="adduserbtn">
          <div>
            <p className="adduserhead">Contact List</p>
          </div>
        </div>
        <div className="block full">
          <div className="block-title">
            <h2>
              All Messages{" "}
              <strong>
                {" "}
                {dataLoading ? (
                  <i className="fa fa-spinner fa-spin"></i>
                ) : (
                  <>({paginationData?.totalContacts})</>
                )}{" "}
              </strong>
            </h2>
          </div>
          {/* END All Orders Title */}
          {/* All Orders Content */}
          <table
            id="ecom-orders"
            className={`table   table-vcenter ${
              !contactLoading ? "table-striped table-bordered" : ""
            }`}
          >
            <thead>
              <tr>
                <th className="visible-lg">Name</th>
                <th className="text-center visible-lg">Email</th>
                <th className="hidden-xs">Address</th>
                <th className="text-right hidden-xs">Phone</th>
                <th>Message</th>
                {/* <th className="hidden-xs text-center">Submitted</th> */}
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {contactLoading ? (
                <tr>
                  <td></td>
                  <td></td>
                  <td
                    style={{
                      textAlign: "center",
                      height: "30vh",
                      width: "100%",
                    }}
                    className="visible-lg"
                  >
                    <i className="fa fa-spinner fa-4x fa-spin"></i>
                  </td>
                </tr>
              ) : (
                <>
                  {contactData?.length > 0 ? (
                    contactData?.map((contact) => {
                      return (
                        <>
                          <tr>
                            <td className="visible-lg">
                              <a
                                type="button"
                                href="#singleContact-modal-terms"
                                data-toggle="modal"
                                onClick={() => singleContactId(contact?._id)}
                              >
                                {contact?.firstName} {contact?.lastName}
                              </a>
                            </td>
                            <td className="text-center visible-lg">
                              <a
                                type="button"
                                href="#singleContact-modal-terms"
                                data-toggle="modal"
                                onClick={() => singleContactId(contact._id)}
                              >
                                {contact.email}
                              </a>
                            </td>
                            <td className="hidden-xs">
                              {contact.city}, {contact.country}
                            </td>
                            <td className="text-right hidden-xs">
                              <strong>{contact.phone}</strong>
                            </td>
                            <td>
                              {contact.message}
                              {/* <span className="label label-warning">Processing</span> */}
                            </td>
                            <td className="text-center">
                              <div className="btn-group btn-group-xs">
                                <a
                                  type="button"
                                  href="#singleContact-modal-terms"
                                  data-toggle="modal"
                                  className={`btn btn-xs btn-default`}
                                  onClick={() => singleContactId(contact._id)}
                                >
                                  <i className="fa fa-eye" />
                                </a>
                                <a
                                  type="button"
                                  href="#delete-modal-terms"
                                  data-toggle="modal"
                                  className={`btn btn-xs btn-danger`}
                                  onClick={() => setDeleteId(contact._id)}
                                >
                                  <i className="fa fa-times" />
                                </a>
                              </div>
                            </td>
                          </tr>
                        </>
                      );
                    })
                  ) : (
                    <div
                      style={{
                        textAlign: "center",
                        height: "100vh",
                        paddingTop: "20rem",
                      }}
                    >
                      <h3>Opps! No Data Found</h3>
                    </div>
                  )}
                </>
              )}
            </tbody>
          </table>

          <DeleteAlert deletePost={deleteContact} />
          <Pagination paginationData={paginationData} />
        </div>
        <ContactAddressList />
      </div>

      <SingleContact
        singleContactLoading={singleContactLoading}
        setSingleContactLoading={setSingleContactLoading}
      />
    </>
  );
};

export default ContactList;
