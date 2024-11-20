import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getResearchToConnectReq,
  postResearchReq,
} from "./__requests/RequestResearch";
const Research = () => {
  const initialValue = {
    heading: "",
    headingParagraph: "",
    ourTeam: "",
    ourTeamDetail: "",
    ourTeamImage: null,
    research: "",
    researchImage: null,
    technology: "",
    technologyImage: "",
    products: [],
  };
  const [rdData, setRdData] = useState(initialValue);
  const [ourTeamImagePreview, setOurTeamImagePreview] = useState(null);
  const [researchImagePreview, setResearchImagePreview] = useState(null);
  const [technologyImagePreview, setTechnologyImagePreview] = useState(null);
  const navigate = useNavigate();
  const [errIdMsg, setErrIdMsg] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getResearchToConnectReq();
        setRdData(response.data.rd);

        if (response.data.rd.ourTeamImage) {
          const ourTeamImageUrl = `${process.env.REACT_APP_IMAGE_URL}/${response.data.rd.ourTeamImage}`;
          setOurTeamImagePreview(ourTeamImageUrl);
        }
        if (response.data.rd.researchImage) {
          const researchImageUrl = `${process.env.REACT_APP_IMAGE_URL}/${response.data.rd.researchImage}`;
          setResearchImagePreview(researchImageUrl);
        }
        if (response.data.rd.technologyImage) {
          const technologyImageUrl = `${process.env.REACT_APP_IMAGE_URL}/${response.data.rd.technologyImage}`;
          setTechnologyImagePreview(technologyImageUrl);
        }
      } catch (error) {
        console.log("error", error);
        // Handle error if needed
      }
    };

    fetchData();
  }, [getResearchToConnectReq]);

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setRdData({
        ...rdData,
        [e.target.name]: e.target.files[0],
      });

      // Update image preview if new image selected
      if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        reader.onload = () => {
          if (e.target.name === "ourTeamImage") {
            setOurTeamImagePreview(reader.result);
          } else if (e.target.name === "researchImage") {
            setResearchImagePreview(reader.result);
          } else if (e.target.name === "technologyImage") {
            setTechnologyImagePreview(reader.result);
          }
        };
        reader.readAsDataURL(e.target.files[0]);
      }
    } else {
      setRdData({
        ...rdData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("heading", rdData.heading);
    formData.append("headingParagraph", rdData.headingParagraph);
    formData.append("ourTeam", rdData.ourTeam);
    formData.append("ourTeamDetail", rdData.ourTeamDetail);
    formData.append("ourTeamImage", rdData.ourTeamImage);
    formData.append("research", rdData.research);
    formData.append("researchImage", rdData.researchImage);
    formData.append("technology", rdData.technology);
    formData.append("technologyImage", rdData.technologyImage);
    formData.append("products", rdData.products);

    try {
      const response = await postResearchReq(formData);
      toast.success("Research and Development Updated Successfully");
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
      <div
        style={{ paddingBottom: "15rem" }}
        id="page-content"
        className="add_user_form"
      >
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
              <div className="col-xs-4">
                <label className="form-label">Title </label>
                <textarea
                  type="text"
                  required
                  onChange={handleChange}
                  name="heading"
                  value={rdData && rdData.heading}
                  className={`form-control input-lg`}
                  placeholder="Heading"
                />
              </div>
              <div className="col-xs-8">
                <label className="form-label">Description </label>
                <textarea
                  onChange={handleChange}
                  type="text"
                  name="headingParagraph"
                  rows={5}
                  value={rdData && rdData.headingParagraph}
                  className={`form-control input-lg`}
                  placeholder="Heading paragraph"
                />
              </div>
              <div className="col-xs-6">
                <label className="form-label">Team Description</label>
                <textarea
                  type="textarea"
                  name="ourTeam"
                  rows={5}
                  value={rdData && rdData.ourTeam}
                  placeholder="Description"
                  onChange={handleChange}
                  className={`form-control input-lg`}
                />
              </div>
              <div className="col-xs-6">
                <label className="form-label">Team Detail</label>
                <textarea
                  type="textarea"
                  name="ourTeamDetail"
                  rows={5}
                  value={rdData && rdData.ourTeamDetail}
                  placeholder="Detail"
                  onChange={handleChange}
                  className={`form-control input-lg`}
                />  
              </div>
            </div>
            <div className="form-group">
              <div className="col-xs-4">
                <label className="form-label">Our Team Image <span className="text-danger">(549px*476px)</span> </label>
                <br />
                {ourTeamImagePreview && (
                  <img
                    src={ourTeamImagePreview}
                    alt="Our Team Image"
                    style={{ width: "100px", height: "auto" }}
                  />
                )}
                <input
                  onChange={handleChange}
                  type="file"
                  name="ourTeamImage"
                />
              </div>
              <div className="col-xs-4">
                <label className="form-label">Research Image <span className="text-danger">(475px*677.873px)</span> </label>
                <br />
                {researchImagePreview && (
                  <img
                    src={researchImagePreview}
                    alt="Mission Image"
                    style={{ width: "100px", height: "auto" }}
                  />
                )}
                <input
                  onChange={handleChange}
                  type="file"
                  name="researchImage"
                />
              </div>
              <div className="col-xs-4">
                <label className="form-label">Technology Image <span className="text-danger">(522px*745px)</span></label>
                <br />
                {technologyImagePreview && (
                  <img
                    src={technologyImagePreview}
                    alt="Vision Image"
                    style={{ width: "100px", height: "auto" }}
                  />
                )}
                <input
                  onChange={handleChange}
                  type="file"
                  name="technologyImage"
                />
              </div>
            </div>
            <div className="form-group">
              <div className="col-xs-6">
                <label className="form-label">Research</label>
                <textarea
                  onChange={handleChange}
                  className={`form-control input-lg`}
                  type="text"
                  rows={5}
                  name="research"
                  value={rdData && rdData.research}
                  placeholder="Research"
                />
              </div>
              <div className="col-xs-6">
                <label className="form-label">Technology </label>
                <textarea
                  onChange={handleChange}
                  className={`form-control input-lg`}
                  type="textarea"
                  rows={5}
                  name="technology"
                  value={rdData && rdData.technology}
                  placeholder="Technology"
                />
              </div>
              {/* <div className="col-xs-6">
                <label className="form-label">Products </label>
                <textarea
                  onChange={handleChange}
                  type="text"
                  rows={5}
                  name="products"
                  value={rdData && rdData.products}
                  className={`form-control input-lg`}
                  placeholder="Products"
                />
              </div> */}
            </div>
            <div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="btn btn-primary"
              >
                Update R&D
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Research;
