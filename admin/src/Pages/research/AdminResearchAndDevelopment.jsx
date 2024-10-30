import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getResearchToConnectReq,
  postResearchReq,
} from "./__requests/RequestResearch";

const AdminResearchAndDevelopment = () => {
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
      <div style={{ height: "100vh" }} id="page-content" className="">
        <div>
          {errIdMsg ? (
            <div className="error_messages login-title themed-background-fire text-center">
              <p className="text-light">{errIdMsg}</p>
            </div>
          ) : (
            <></>
          )}
          <form className={`form-horizontal`}>
            <div className=" ">
              <div className="col-xs-4">
                <label className="form-label">Title </label>
                {/* <textarea
                  type="text"
                  required
                  onChange={handleChange}
                  name="heading"
                  value={rdData && rdData.heading}
                  className={`form-control input-lg`}
                  placeholder="Heading"
                /> */}
                <CKEditor
                  editor={ClassicEditor}
                  data={rdData.heading}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setRdData({
                      ...rdData,
                      heading: data,
                    });
                  }}
                />
              </div>

              <div className="col-xs-8">
                <label className="form-label">Research And Development </label>
                {/* <textarea
                  onChange={handleChange}
                  className={`form-control input-lg`}
                  type="textarea"
                  rows={5}
                  name="technology"
                  value={rdData && rdData.technology}
                  placeholder="Technology"
                /> */}
                <CKEditor
                  editor={ClassicEditor}
                  data={rdData.technology}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setRdData({
                      ...rdData,
                      technology: data,
                    });
                  }}
                />
                
              </div>
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

export default AdminResearchAndDevelopment;
