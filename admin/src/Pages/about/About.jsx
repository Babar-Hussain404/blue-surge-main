import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TeamList from "./TeamList";
import { getAboutToConnectReq, postAboutReq } from "./__requests/RequestAbout";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const About = () => {
  const initialValue = {
    whoWeAre: "",
    whoWeAreImage: null,
    mission: "",
    missionImage: null,
    vision: "",
    visionImage: null,
    team: [],
    history: "",
    leaderShip: "",
    governance: "",
  };

  const [aboutUsData, setAboutUsData] = useState({
    ...initialValue,
    team: [],
  });

  const [oldWhoImagePreview, setOldWhoImagePreview] = useState(null);
  const [oldMissionImagePreview, setOldMissionImagePreview] = useState(null);
  const [oldVisionImagePreview, setOldVisionImagePreview] = useState(null);
  const navigate = useNavigate();
  const [errIdMsg, setErrIdMsg] = useState("");
  const [aboutLoading, setAboutLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAboutToConnectReq();
        setAboutUsData(response.data.about);
        setAboutLoading(false);
        if (response.data.about.whoWeAreImage) {
          const whoWeAreImageUrl = `https://admin.bluesurge.com.pk/uploads/${response.data.about.whoWeAreImage}`;
          setOldWhoImagePreview(whoWeAreImageUrl);
        }
        if (response.data.about.missionImage) {
          const missionImageUrl = `https://admin.bluesurge.com.pk/uploads/${response.data.about.missionImage}`;
          setOldMissionImagePreview(missionImageUrl);
        }
        if (response.data.about.visionImage) {
          const visionImageUrl = `https://admin.bluesurge.com.pk/uploads/${response.data.about.visionImage}`;
          setOldVisionImagePreview(visionImageUrl);
        }
      } catch (error) {
        setAboutLoading(false);
        console.log("error", error);
        // Handle error if needed
      }
    };

    fetchData();
  }, [getAboutToConnectReq]);

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setAboutUsData({
        ...aboutUsData,
        [e.target.name]: e.target.files[0],
      });

      // Update image preview if new image selected
      if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        reader.onload = () => {
          if (e.target.name === "whoWeAreImage") {
            setOldWhoImagePreview(reader.result);
          } else if (e.target.name === "missionImage") {
            setOldMissionImagePreview(reader.result);
          } else if (e.target.name === "visionImage") {
            setOldVisionImagePreview(reader.result);
          }
        };
        reader.readAsDataURL(e.target.files[0]);
      }
    } else {
      setAboutUsData({
        ...aboutUsData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("whoWeAre", aboutUsData.whoWeAre);
    formData.append("mission", aboutUsData.mission);
    formData.append("vision", aboutUsData.vision);
    formData.append("history", aboutUsData.history);
    formData.append("leaderShip", aboutUsData.leaderShip);
    formData.append("governance", aboutUsData.governance);
    formData.append("whoWeAreImage", aboutUsData.whoWeAreImage);
    formData.append("missionImage", aboutUsData.missionImage);
    formData.append("visionImage", aboutUsData.visionImage);

    try {
      const response = await postAboutReq(formData);
      toast.success("About Us Updated Successfully");
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
        {aboutLoading ? (
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
            ) : null}
            <form className={`form-horizontal`}>
              <div className="form-group">
                <div className="col-xs-6">
                  <label className="form-label">Who We Are Description</label>
                  {/* <textarea
                    onChange={handleChange}
                    type="text"
                    name="whoWeAre"
                    rows={5}
                    value={aboutUsData && aboutUsData.whoWeAre}
                    className={`form-control input-lg`}
                    placeholder="Who We Are Description"
                  /> */}
                   <CKEditor
                    editor={ClassicEditor}
                    data={aboutUsData.whoWeAre}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setAboutUsData({
                        ...aboutUsData,
                        whoWeAre: data,
                      });
                    }}
                  />
                </div>
                <div className="col-xs-6">
                  <label className="form-label">Mission Description</label>
                  {/* <textarea
                    onChange={handleChange}
                    type="text"
                    name="mission"
                    rows={5}
                    value={aboutUsData && aboutUsData.mission}
                    className={`form-control input-lg`}
                    placeholder="Mission"
                  />    */}
                  <CKEditor
                    editor={ClassicEditor}
                    data={aboutUsData.mission}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setAboutUsData({
                        ...aboutUsData,
                        mission: data,
                      });
                    }}
                  />
                </div>
                <div className="col-xs-12">
                  <label className="form-label">Vision Description</label>
                  <CKEditor
                    editor={ClassicEditor}
                    data={aboutUsData.vision}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setAboutUsData({
                        ...aboutUsData,
                        vision: data,
                      });
                    }}
                  />
                </div>
              </div>
              {/* Other form fields go here */}

              <div>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="btn btn-primary"
                >
                  Update About Us
                </button>
              </div>
            </form>
            <TeamList />
          </div>
        )}
      </div>
    </>
  );
};

export default About;
