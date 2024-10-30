import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addressState, paginationRefreshAction } from "../../../redux/action";
import DeleteAlert from "../../../utility/DeleteAlert";
import Pagination from "../../../utility/Pagination";
import {
  deleteContactAddressReq,
  getContactAddressReq,
} from "../__requests/RequestUser";
import AddContactAddress from "./AddContactAddress";
import EditContactAddress from "./EditContactAddress";

const ContactAddress = () => {
  const [contactData, setContactData] = useState([]);
  const [contactLoading, setContactLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(true);
  const [paginationData, setPaginationData] = useState(null);
  const [activeState, setActiveState] = useState(0);
  const pageNumber = useSelector((state) => state.paginationPageNumberReducer);
  const paginationRefresh = useSelector(
    (state) => state.paginationRefreshReducer
  );

  const dispatch = useDispatch();
  const getContactsData = async () => {
    try {
      setContactLoading(true);
      setDataLoading(true);
      const response = await getContactAddressReq(pageNumber);
      setContactData(response.data.address);
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
  useEffect(() => {
    if (contactLoading || paginationRefresh) {
      getContactsData();
    }
  }, [contactLoading || paginationRefresh]);

  const [deleteContactAddressId, setDeleteContactAddressId] = useState();
  const deleteContact = async () => {
    try {
      const response = await deleteContactAddressReq(deleteContactAddressId);
      toast.success(response.data.message);
      getContactsData();
    } catch (error) {
      // toast.error("Whoops! something wrong");
    }
  };
  // console.log("contactData in contact address", contactData);

  const background_color = useSelector(
    (state) => state.changeBackgroundColorReducer
  );
  return (
    <>
      <div className="adduserbtn" style={{ marginTop: "10rem" }}>
        <div>
          <p className="adduserhead">Address List</p>
        </div>
        <Link
          onClick={() => setActiveState(1)}
          className={`btn btn-primary ${background_color}`}
        >
          <i className="fa fa-plus"></i> Add Address
        </Link>
      </div>

      {activeState === 1 ? (
        <AddContactAddress
          setAddState={setActiveState}
          setContactLoading={setContactLoading}
        />
      ) : activeState === 2 ? (
        <EditContactAddress
          setAddState={setActiveState}
          setContactLoading={setContactLoading}
        />
      ) : (
        <>
          <div className="block full">
            <div className="block-title">
              <h2>
                All Members{" "}
                <strong>
                  {" "}
                  {dataLoading ? (
                    <i className="fa fa-spinner fa-spin"></i>
                  ) : (
                    // <>({paginationData.totalTeam})</>
                    ""
                  )}{" "}
                </strong>
              </h2>
            </div>
            <table
              id="ecom-orders"
              className={`table   table-vcenter ${
                !contactLoading ? "table-striped table-bordered" : ""
              }`}
            >
              <thead>
                <tr>
                  <th className="visible-lg text-center">Name</th>
                  <th className="visible-lg text-center">Street</th>
                  <th className="text-center visible-lg">City</th>
                  <th className="text-center visible-lg">State</th>
                  <th className="text-center visible-lg">Country</th>
                  <th className="text-center visible-lg">Zipcode</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {contactLoading ? (
                  <tr>
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
                    {contactData && contactData.length > 0 ? (
                      contactData.map((contact) => {
                        return (
                          <>
                            <tr>
                              <td className="visible-lg text-center">
                                {contact.name}
                              </td>
                              <td className="visible-lg text-center">
                                {contact.street}
                              </td>
                              <td className="text-center visible-lg">
                                {contact.city}
                              </td>
                              <td className="text-center visible-lg">
                                {contact.state}
                              </td>
                              <td className="text-center visible-lg">
                                {contact.country}
                              </td>
                              <td className="text-center visible-lg">
                                {contact.zipcode}
                              </td>

                              <td className="text-center">
                                <div className="btn-group btn-group-xs">
                                  <Link
                                    className={`btn btn-xs btn-success`}
                                    onClick={() => {
                                      setActiveState(2);

                                      dispatch(addressState(contact._id));
                                    }}
                                  >
                                    <i className="fa fa-pencil" />
                                  </Link>
                                  <a
                                    type="button"
                                    href="#delete-modal-terms"
                                    data-toggle="modal"
                                    className={`btn btn-xs btn-danger`}
                                    onClick={() =>
                                      setDeleteContactAddressId(contact._id)
                                    }
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
                      <tr>
                        <td></td>
                        <td
                          style={{
                            textAlign: "center",
                            height: "30vh",
                            width: "100%",
                          }}
                          className="visible-lg"
                        >
                          <h3>Opps! No Data Found</h3>
                        </td>
                        <td></td>
                      </tr>
                    )}
                  </>
                )}
              </tbody>
            </table>
            <DeleteAlert deletePost={deleteContact} />
            {/* <Pagination paginationData={paginationData} /> */}
          </div>
        </>
      )}
    </>
  );
};

export default ContactAddress;
