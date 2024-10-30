import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteUserReq,
  getUserToConnectReq, 
} from "./__requests/RequestUser";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import DeleteAlert from "../../utility/DeleteAlert";
import { editUserIdAction } from "../../redux/action";

const MyConnects = () => {
  const loginUser = useSelector((state) => state.loginUserReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const background_color = useSelector(
    (state) => state.changeBackgroundColorReducer
  );
  const [userData, setUserData] = useState([]);
  const [userLoading, setUserLoading] = useState(true);
  const getUsersData = async () => {
    try {
      setUserLoading(true);
      const response = await getUserToConnectReq();
      setUserData(response.data.users);
      setUserLoading(false);
    } catch (error) {
      toast.error("Whoops! something wrong");
      setUserLoading(false);
    }
  };

  const [deleteId, setDeleteId] = useState();
  const deleteUser = async () => {
    try {
      const response = await deleteUserReq(deleteId);
      toast.success(response.data.message);
      getUsersData();
    } catch (error) {
      toast.error("Whoops! something wrong");
    }
  };

  useEffect(() => {
    if (userLoading) {
      getUsersData();
    }
  }, [userLoading]);

  return (
    <>
      <br />
      <div style={{ paddingBottom: "15rem" }} id="page-content">
        <div className="  content-header-media">
          <div className="header-section">
            <div className="row">
              <div className="col-md-4 col-lg-6 hidden-xs hidden-sm">
                <h1>
                  Welcome <strong>{loginUser.name}</strong>
                  <br />
                  <br />
                  <small>to</small> User Page
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
            <p className="adduserhead">User List</p>
          </div>
          <Link
            to={"/admin-add-user"}
            className={`btn btn-primary ${background_color}`}
          >
            <i className="fa fa-plus"></i> Add User
          </Link>
        </div>
        {userLoading ? (
          <div
            style={{
              textAlign: "center",
              height: "100vh",
              paddingTop: "20rem",
            }}
          >
            <i className="fa fa-spinner fa-4x fa-spin"></i>
          </div>
        ) : (
          <>
            <div
              style={{
                margin: "2rem 0",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-around",
              }}
            >
              {userData.length > 0 ? (
                userData.map((user) => {
                  return (
                    <>
                      <div className="widget position_home_left">
                        <div className="widget-simple">
                          <h4 className="widget-content text-right">
                            <a href="/" className="">
                              <strong>{user.name}</strong>
                            </a>
                            <small>{user.email}</small>
                            <small className="fw-bold">
                              Role:{" "}
                              {user.role === "super_admin"
                                ? "Super Admin"
                                : "Admin"}
                            </small>
                          </h4>
                        </div>
                        <div className="widget-extra ">
                          <div className="row text-center ">
                            {/* <Link
                              type="button"
                              className={`btn btn-primary ${background_color}`}
                            >
                              <i className="fa fa-eye" />
                            </Link> */}
                            <Link
                              type="button"
                              className={`btn btn-success`}
                              to={`/admin-edit-user`}
                              onClick={()=> dispatch(editUserIdAction(user._id))}
                            >
                              <i className="fa fa-pencil" />
                            </Link>
                            <a
                              type="button"
                              href="#delete-modal-terms"
                              data-toggle="modal"
                              className={`btn btn-danger`}
                              onClick={() => setDeleteId(user._id)}
                            >
                              <i className="fa fa-times" />
                            </a>
                          </div>
                        </div>
                      </div>
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
            </div>
          </>
        )}
      </div>
      <DeleteAlert deletePost={deleteUser} />
    </>
  );
};

export default MyConnects;
