import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getMetaTagsReq, postMetaTagsReq } from "./__requests/Request";

const MetaTags = () => {
  const initialValue = {
    homeTitle: "",
    homeDescription: "",
    homeKeywords: "",

    aboutTitle: "",
    aboutDescription: "",
    aboutKeywords: "",

    productTitle: "",
    productDescription: "",
    productKeywords: "",

    serviceTitle: "",
    serviceDescription: "",
    serviceKeywords: "",

    researchTitle: "",
    researchDescription: "",
    researchKeywords: "",
    industryTitle: "",
    industryDescription: "",
    industryKeywords: "",
    contactTitle: "",
    contactDescription: "",
    contactKeywords: "",
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
        const response = await getMetaTagsReq();
        setHeaderData(response.data.metaTags);
        setHeaderLoading(false);
      } catch (error) {
        setHeaderLoading(false);
        console.log("error", error); 
      }
    };
    fetchData();
  }, [getMetaTagsReq]);

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
    formData.append("homeTitle", headerData.homeTitle);
    formData.append("homeDescription", headerData.homeDescription);
    formData.append("homeKeywords", headerData.homeKeywords);
    formData.append("aboutTitle", headerData.aboutTitle);
    formData.append("aboutDescription", headerData.aboutDescription);
    formData.append("aboutKeywords", headerData.aboutKeywords);
    formData.append("productTitle", headerData.productTitle);
    formData.append("productDescription", headerData.productDescription);
    formData.append("productKeywords", headerData.productKeywords);
    formData.append("serviceTitle", headerData.serviceTitle);
    formData.append("serviceDescription", headerData.serviceDescription);
    formData.append("serviceKeywords", headerData.serviceKeywords);
    formData.append("researchTitle", headerData.researchTitle);
    formData.append("researchDescription", headerData.researchDescription);
    formData.append("researchKeywords", headerData.researchKeywords);
    formData.append("industryTitle", headerData.industryTitle);
    formData.append("industryDescription", headerData.industryDescription);
    formData.append("industryKeywords", headerData.industryKeywords);
    formData.append("contactTitle", headerData.contactTitle);
    formData.append("contactDescription", headerData.contactDescription);
    formData.append("contactKeywords", headerData.contactKeywords);

    try {
      const response = await postMetaTagsReq(formData);
      toast.success("Meta Tags Updated Successfully");
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
      <div id="page-content" className="">
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
                  <label className="form-label">Home Title</label>
                  <input
                    type="text"
                    required
                    onChange={handleChange}
                    name="homeTitle"
                    rows={2}
                    value={headerData && headerData.homeTitle}
                    className={`form-control input-lg`}
                    placeholder="Home Title"
                  />
                </div>
                <div className="col-xs-6">
                  <label className="form-label">Home Description</label>
                  <textarea
                    type="text"
                    required
                    onChange={handleChange}
                    name="homeDescription"
                    rows={5}
                    value={headerData && headerData.homeDescription}
                    className={`form-control input-lg`}
                    placeholder="Home Description"
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-12">
                  <label className="form-label">Home Keywords</label>
                  <textarea
                    type="text"
                    required
                    onChange={handleChange}
                    name="homeKeywords"
                    rows={5}
                    value={headerData && headerData.homeKeywords}
                    className={`form-control input-lg`}
                    placeholder="Home Keywords"
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-6">
                  <label className="form-label">About Title</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    name="aboutTitle" 
                    value={headerData && headerData.aboutTitle}
                    className={`form-control input-lg`}
                    placeholder="About Title"
                  />
                </div>
                <div className="col-xs-6">
                  <label className="form-label">About Description</label>
                  <textarea
                    onChange={handleChange}
                    type="text"
                    name="aboutDescription"
                    rows={5}
                    value={headerData && headerData.aboutDescription}
                    className={`form-control input-lg`}
                    placeholder="About Description"
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-12">
                  <label className="form-label">About Keywords</label>
                  <textarea
                    onChange={handleChange}
                    type="text"
                    name="aboutKeywords"
                    rows={5}
                    value={headerData && headerData.aboutKeywords}
                    className={`form-control input-lg`}
                    placeholder="About Keywords"
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="col-xs-6">
                  <label className="form-label">Product Title</label>
                  <input
                    type="text"
                    name="productTitle"
                    rows={2}
                    value={headerData && headerData.productTitle}
                    placeholder="Product Title"
                    onChange={handleChange}
                    className={`form-control input-lg`}
                  />
                </div>
                <div className="col-xs-6">
                  <label className="form-label">Product Description</label>
                  <textarea
                    type="text"
                    name="productDescription"
                    rows={5}
                    value={headerData && headerData.productDescription}
                    placeholder="Product Description"
                    onChange={handleChange}
                    className={`form-control input-lg`}
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-12">
                  <label className="form-label">Product Keywords</label>
                  <textarea
                    type="text"
                    name="productKeywords"
                    rows={5}
                    value={headerData && headerData.productKeywords}
                    placeholder="Product Keywords"
                    onChange={handleChange}
                    className={`form-control input-lg`}
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="col-xs-6">
                  <label className="form-label">Service Title</label>
                  <input
                    type="text"
                    name="serviceTitle"
                    rows={2}
                    value={headerData && headerData.serviceTitle}
                    placeholder="Service Title"
                    onChange={handleChange}
                    className={`form-control input-lg`}
                  />
                </div>
                <div className="col-xs-6">
                  <label className="form-label">Service Description</label>
                  <textarea
                    type="text"
                    name="serviceDescription"
                    rows={5}
                    value={headerData && headerData.serviceDescription}
                    placeholder="Service Description"
                    onChange={handleChange}
                    className={`form-control input-lg`}
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-12">
                  <label className="form-label">Service Keywords</label>
                  <textarea
                    type="text"
                    name="serviceKeywords"
                    rows={5}
                    value={headerData && headerData.serviceKeywords}
                    placeholder="Service Keywords"
                    onChange={handleChange}
                    className={`form-control input-lg`}
                  />
                </div>
              </div>


              <div className="form-group">
                <div className="col-xs-6">
                  <label className="form-label">Businesses Title</label>
                  <input
                    type="text"
                    name="industryTitle"
                    rows={2}
                    value={headerData && headerData.industryTitle}
                    placeholder="Business Title"
                    onChange={handleChange}
                    className={`form-control input-lg`}
                  />
                </div>
                <div className="col-xs-6">
                  <label className="form-label">Businesses Description</label>
                  <textarea
                    type="text"
                    name="industryDescription"
                    rows={5}
                    value={headerData && headerData.industryDescription}
                    placeholder="Business Description"
                    onChange={handleChange}
                    className={`form-control input-lg`}
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-12">
                  <label className="form-label">Businesses Keywords</label>
                  <textarea
                    type="text"
                    name="industryKeywords"
                    rows={5}
                    value={headerData && headerData.industryKeywords}
                    placeholder="Business Keywords"
                    onChange={handleChange}
                    className={`form-control input-lg`}
                  />
                </div>
              </div>


              <div className="form-group">
                <div className="col-xs-6">
                  <label className="form-label">Research Title</label>
                  <input
                    type="text"
                    name="researchTitle"
                    rows={2}
                    value={headerData && headerData.researchTitle}
                    placeholder="Research Title"
                    onChange={handleChange}
                    className={`form-control input-lg`}
                  />
                </div>
                <div className="col-xs-6">
                  <label className="form-label">Research Description</label>
                  <textarea
                    type="text"
                    name="researchDescription"
                    rows={5}
                    value={headerData && headerData.researchDescription}
                    placeholder="Research Description"
                    onChange={handleChange}
                    className={`form-control input-lg`}
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-12">
                  <label className="form-label">Research Keywords</label>
                  <textarea
                    type="text"
                    name="researchKeywords"
                    rows={5}
                    value={headerData && headerData.researchKeywords}
                    placeholder="Research Keywords"
                    onChange={handleChange}
                    className={`form-control input-lg`}
                  />
                </div>
              </div>
              

              <div className="form-group">
                <div className="col-xs-6">
                  <label className="form-label">Contact Title</label>
                  <input
                    type="text"
                    name="contactTitle"
                    rows={2}
                    value={headerData && headerData.contactTitle}
                    placeholder="Contact Title"
                    onChange={handleChange}
                    className={`form-control input-lg`}
                  />
                </div>
                <div className="col-xs-6">
                  <label className="form-label">Contact Description</label>
                  <textarea
                    type="text"
                    name="contactDescription"
                    rows={5}
                    value={headerData && headerData.contactDescription}
                    placeholder="Contact Description"
                    onChange={handleChange}
                    className={`form-control input-lg`}
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-12">
                  <label className="form-label">Contact Keywords</label>
                  <textarea
                    type="text"
                    name="contactKeywords"
                    rows={5}
                    value={headerData && headerData.contactKeywords}
                    placeholder="Contact Keywords"
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
                  Update Meta Tags
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

export default MetaTags;
