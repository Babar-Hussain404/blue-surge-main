import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  paginationRefreshAction,
  serviceViewState,
  singleContactAction,
} from "../../redux/action";
import DeleteAlert from "../../utility/DeleteAlert";
import Pagination from "../../utility/Pagination";
import { deleteIndustryReq, getIndustryReq } from "./__requests/RequestUser";
import SingleService from "./SingleService";
// import SingleIndustry from "./SingleIndustry";

const ServicesList = () => {
  const loginUser = useSelector((state) => state.loginUserReducer);
  const pageNumber = useSelector((state) => state.paginationPageNumberReducer);
  const paginationRefresh = useSelector(
    (state) => state.paginationRefreshReducer
  );
  const background_color = useSelector(
    (state) => state.changeBackgroundColorReducer
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
      const response = await getIndustryReq(pageNumber);
      setContactData(response.data.services);
      setPaginationData(response.data.meta);
      dispatch(paginationRefreshAction(false));
      setContactLoading(false);
      setDataLoading(false);
    } catch (error) {
      toast.error("Whoops! something wrong");
      setContactLoading(false);
      setDataLoading(false);
      dispatch(paginationRefreshAction(false));
    }
  };
  // console.log("contactData: ", contactData);

  const [deleteId, setDeleteId] = useState();
  const deleteContact = async () => {
    try {
      const response = await deleteIndustryReq(deleteId);
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
      <div style={{ paddingBottom: "10rem" }} id="page-content">
        <div className="  content-header-media">
          <div className="header-section">
            <div className="row">
              <div className="col-md-4 col-lg-6 hidden-xs hidden-sm">
                <h1>
                  Welcome <strong>{loginUser?.name}</strong>
                  <br />
                  <br />
                  <small>to</small> Service Page
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
            <p className="adduserhead">Service List</p>
          </div>
          <Link
            to={"/admin-add-service"}
            className={`btn btn-primary ${background_color}`}
          >
            <i className="fa fa-plus"></i> Add Service
          </Link>
        </div>

        <div className="block full">
          <div className="block-title">
            <h2>
              All Services{" "}
              <strong>
                {" "}
                {dataLoading ? (
                  <i className="fa fa-spinner fa-spin"></i>
                ) : (
                  <>({paginationData?.totalServices})</>
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
                {/* <th className="text-center visible-lg">Detail</th> */}
                <th className="hidden-xs text-center">Industry Name</th>
                <th className="text-center hidden-xs">Industry Email</th>
                <th className="text-center">Advantages</th>
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
                            <td className="text-center visible-lg">
                              {contact?.name}
                            </td>
                            <td className=" text-center hidden-xs">
                              {contact?.industry_data[0]?.name}
                            </td>
                            <td className="text-center hidden-xs">
                              <strong>
                                {contact?.industry_data[0]?.email}
                              </strong>
                            </td>
                            <td className="text-center">
                              <strong>{contact?.advantages?.length}</strong>
                            </td>

                            <td className="text-center">
                              <div className="btn-group btn-group-xs">
                                <a
                                  type="button"
                                  href="#singleService-modal-terms"
                                  data-toggle="modal"
                                  className={`btn btn-xs btn-default`}
                                  onClick={() => singleContactId(contact?._id)}
                                >
                                  <i className="fa fa-eye" />
                                </a>
                                <Link
                                  to={`/admin-edit-service`}
                                  onClick={() =>
                                    dispatch(serviceViewState(contact?._id))
                                  }
                                  className={`btn btn-xs btn-success`}
                                >
                                  <i className="fa fa-pencil" />
                                </Link>
                                <a
                                  type="button"
                                  href="#delete-modal-terms"
                                  data-toggle="modal"
                                  className={`btn btn-xs btn-danger`}
                                  onClick={() => setDeleteId(contact?._id)}
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
                      <td></td>
                      <td></td>
                    </tr>
                  )}
                </>
              )}
            </tbody>
          </table>

          <Pagination paginationData={paginationData} />
        </div>
      </div>
      <SingleService
        singleContactLoading={singleContactLoading}
        setSingleContactLoading={setSingleContactLoading}
      />
      <DeleteAlert deletePost={deleteContact} />
    </>
  );
};

export default ServicesList;
