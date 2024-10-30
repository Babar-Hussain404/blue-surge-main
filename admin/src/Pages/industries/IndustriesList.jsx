import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  industryViewState,
  paginationRefreshAction,
  singleContactAction,
} from "../../redux/action";
import DeleteAlert from "../../utility/DeleteAlert";
import Pagination from "../../utility/Pagination";
import SingleIndustry from "./SingleIndustry";
import { deleteIndustryReq, getIndustryReq } from "./__requests/RequestUser";

const IndustriesList = () => {
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
      setContactData(response.data.industrys);
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
                  Welcome <strong>{loginUser.name}</strong>
                  <br />
                  <br />
                  <small>to</small> Industry Page
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
            <p className="adduserhead">Industry List</p>
          </div>
          <Link
            to={"/admin-add-industry"}
            className={`btn btn-primary ${background_color}`}
          >
            <i className="fa fa-plus"></i> Add Industry
          </Link>
        </div>

        <div className="block full">
          <div className="block-title">
            <h2>
              All Industries{" "}
              <strong>
                {" "}
                {dataLoading ? (
                  <i className="fa fa-spinner fa-spin"></i>
                ) : (
                  <>({paginationData?.totalIndustrys})</>
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
                <th className="visible-lg">Name</th>
                <th className="text-center visible-lg">Tag Line</th>
                <th className="hidden-xs">Address</th>
                <th className="text-center hidden-xs">website</th>
                <th className="text-center">Email</th>
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
                  {contactData.length > 0 ? (
                    contactData.map((contact) => {
                      return (
                        <>
                          <tr>
                            <td className="visible-lg">
                              <a href="">{contact.name}</a>
                            </td>
                            <td className="text-center visible-lg">
                              <a href="">{contact.email}</a>
                            </td>
                            <td className=" text-center hidden-xs">
                              {contact.address_city}, {contact.address_country}
                            </td>
                            <td className="text-center hidden-xs">
                              <strong>{contact.website}</strong>
                            </td>
                            <td className="text-center">
                              <strong>{contact.email}</strong>
                            </td>

                            <td className="text-center">
                              <div className="btn-group btn-group-xs">
                                <a
                                  type="button"
                                  href="#singleIndustry-modal-terms"
                                  data-toggle="modal"
                                  className={`btn btn-xs btn-default`}
                                  onClick={() => singleContactId(contact._id)}
                                >
                                  <i className="fa fa-eye" />
                                </a>
                                <Link
                                  to={`/admin-edit-industry`}
                                  className={`btn btn-xs btn-success`}
                                  onClick={() =>
                                    dispatch(industryViewState(contact._id))
                                  }
                                >
                                  <i className="fa fa-pencil" />
                                </Link>
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
      <SingleIndustry
        singleContactLoading={singleContactLoading}
        setSingleContactLoading={setSingleContactLoading}
      />
      <DeleteAlert deletePost={deleteContact} />
    </>
  );
};

export default IndustriesList;
