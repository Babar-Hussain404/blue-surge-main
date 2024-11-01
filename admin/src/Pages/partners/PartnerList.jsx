import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  aboutTeamMeberState,
  industryViewState,
  paginationRefreshAction,
  singleContactAction,
} from "../../redux/action";
import DeleteAlert from "../../utility/DeleteAlert";
import Pagination from "../../utility/Pagination";
// import { deleteIndustryReq, getIndustryReq } from "../__requests/RequestUser";
import { deleteTeamReq, getAboutTeamReq } from "./__request/RequestPartners";  
import AddPartner from "./AddPartner";
import EditPartner from "./EditPartner";

const PartnerList = () => {
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
      const response = await getAboutTeamReq(pageNumber);
      setContactData(response.data.partner);
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
      const response = await deleteTeamReq(deleteId);
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
  const [addState, setAddState] = useState(0);

  return (
    <div style={{paddingBottom:'40rem'}} className="block full">
      <div className="adduserbtn ">
        <div>
          <p style={{cursor:'pointer'}} onClick={() => setAddState(0)} className="adduserhead">Partner List</p>
        </div>
        <Link
          //   to={"/admin-add-industry"}
          onClick={() => setAddState(1)}
          className={`btn btn-primary ${background_color}`}
        >
          <i className="fa fa-plus"></i> Add Partner
        </Link>
      </div>
      {addState === 1 ? (
        <AddPartner setContactLoading={setContactLoading} setAddState={setAddState} />
      ) : (
        <>
          {
            addState === 2 ? (
              <EditPartner setContactLoading={setContactLoading} setAddState={setAddState} />
            ) :
              (
                  <>
                    <div className="block full">
                      <div className="block-title">
                        <h2>
                          All Partners{" "}
                          <strong>
                            {" "}
                            {dataLoading ? (
                              <i className="fa fa-spinner fa-spin"></i>
                            ) : (
                              <>({paginationData?.totalPartner})</>
                            )}{" "}
                          </strong>
                        </h2>
                      </div>
                      <table
                        id="ecom-orders"
                        className={`table   table-vcenter ${!contactLoading ? "table-striped table-bordered" : ""
                          }`}
                      >
                        <thead>
                          <tr>
                            <th className="visible-lg text-center">Logo</th>
                            <th className="visible-lg text-center">Link</th> 
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
                                  <td></td>
                            </tr>
                          ) : (
                            <>
                              {contactData && contactData.length > 0 ? (
                                contactData.map((contact) => {
                                  return (
                                    <>
                                      <tr>
                                        <td className="visible-lg text-center">
                                          <img
                                            style={{ width: "5rem" }}
                                            className="widget-image img-circle  img_circle_border"
                                            src={`https://admin.bluesurge.com.pk/uploads/${contact.image}`}
                                          />
                                        </td>
                                        <td className="visible-lg text-center">
                                          {contact.title}
                                        </td> 

                                        <td className="text-center">
                                          <div className="btn-group btn-group-xs">
                                            <Link
                                              // to={`/admin-edit-industry`}
                                              className={`btn btn-xs btn-success`}
                                              onClick={() => {
                                                setAddState(2);
                                                dispatch(aboutTeamMeberState(contact._id));
                                              }}

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

                      <Pagination paginationData={paginationData} />
                    </div>
                  </>
              )
          }

        </>
      )

      }
      
      <DeleteAlert deletePost={deleteContact} />
    </div>
  )
}

export default PartnerList
