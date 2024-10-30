import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getIconsReq, postIconsReq } from "./__requests/Request";

const SocialIcons = () => {
  const initialValue = {
    fackbook: "",

    linkedIn: "",

    youtube: "",

    twitter: "",

    instagram: "",
    mail: "",
  };
  const [headerData, setHeaderData] = useState({
    ...initialValue,
  });

  const navigate = useNavigate();
  const [errIdMsg, setErrIdMsg] = useState("");
  const [headerLoading, setHeaderLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getIconsReq();
        setHeaderData(response.data.icons);
        setHeaderLoading(false);
      } catch (error) {
        setHeaderLoading(false);
        console.log("error", error);
      }
    };
    fetchData();
  }, [getIconsReq]);

  const handleChange = (e) => {
    setHeaderData({
      ...headerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Append all text fields to formData
    formData.append("fackbook", headerData.fackbook);
    formData.append("linkedIn", headerData.linkedIn);
    formData.append("youtube", headerData.youtube);
    formData.append("twitter", headerData.twitter);
    formData.append("instagram", headerData.instagram);
    formData.append("mail", headerData.mail);

    try {
      const response = await postIconsReq(formData);
      toast.success("Social Data Updated Successfully");
      setErrIdMsg("");
    } catch (error) {
      console.log("error", error);
      if (error.response && error.response.status === 400) {
        setErrIdMsg(error.response.data.error);
      }
    }
  };

  return (
    <>
      <br />
      <div id="page-content" style={{ paddingBottom: "40rem" }}
        
        className="">
        {headerLoading ? (
          <div
            style={{
              textAlign: "center",
              paddingTop: "25rem",
              height: "100vh",
              width: "100%",
            }}
            className="visible-lg"
          >
            <i className="fa fa-spinner fa-4x fa-spin"></i>
          </div>
        ) : (
          <div>
            {errIdMsg ? (
              <div className="error_messages login-title themed-background-fire text-center">
                <p className="text-light">{errIdMsg}</p>
              </div>
            ) : (
              <></>
            )}
            <form className={`form-horizontal`}>
              <div className="form-group">
                <div className="col-xs-6">
                  <label className="form-label">Fackbook</label>
                  <input
                    type="text"
                    required
                    onChange={handleChange}
                    name="fackbook"
                    rows={2}
                    value={headerData && headerData.fackbook}
                    className={`form-control input-lg`}
                    placeholder="Fackbook"
                  />
                </div>
                <div className="col-xs-6">
                  <label className="form-label">LinkedIn</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    name="linkedIn"
                    value={headerData && headerData.linkedIn}
                    className={`form-control input-lg`}
                    placeholder="LinkedIn"
                  />
                </div>
              </div>

           

              <div className="form-group">
                <div className="col-xs-6">
                  <label className="form-label">Youtube</label>
                  <input
                    type="text"
                    name="youtube"
                    rows={2}
                    value={headerData && headerData.youtube}
                    placeholder="Youtube"
                    onChange={handleChange}
                    className={`form-control input-lg`}
                  />
                </div>
                <div className="col-xs-6">
                  <label className="form-label">X</label>
                  <input
                    type="text"
                    name="twitter"
                    rows={2}
                    value={headerData && headerData.twitter}
                    placeholder="X"
                    onChange={handleChange}
                    className={`form-control input-lg`}
                  />
                </div>
              </div>

             

              <div className="form-group">
              <div className="col-xs-6">
                  <label className="form-label">Instagram</label>
                  <input
                    type="text"
                    name="instagram"
                    rows={2}
                    value={headerData && headerData.instagram}
                    placeholder="Instagram"
                    onChange={handleChange}
                    className={`form-control input-lg`}
                  />
                </div>
                <div className="col-xs-6">
                  <label className="form-label">Contact Mail</label>
                  <input
                    type="text"
                    name="mail"
                    rows={2}
                    value={headerData && headerData.mail}
                    placeholder="Contact Mail"
                    onChange={handleChange}
                    className={`form-control input-lg`}
                  />
                </div>
              </div>

             

              <div>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="btn btn-primary"
                >
                  Update Social Data
                </button>
              </div>
            </form>
            {/* <TeamList /> */}
          </div>
        )}
      </div>
    </>
  );
};

export default SocialIcons;
