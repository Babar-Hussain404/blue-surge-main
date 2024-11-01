import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getHeaderToConnectReq,
  postHeaderReq,
} from "./__requests/RequestHeader";

const Header = () => {
  const initialValue = {
    homeHeading: "",
    homeDescription: "",
    homeImage: null,
    aboutHeading: "",
    aboutDescription: "",
    aboutImage: null,
    productHeading: "",
    productDescription: "",
    productImage: null,
    serviceHeading: "",
    serviceDescription: "",
    serviceImage: null,
    researchHeading: "",
    researchDescription: "",
    researchImage: null,
    businessHeading: "",
    businessDescription: "",
    businessImage: null,
    contactHeading: "",
    contactDescription: "",
    contactImage: null,
    // detail

    businessDetailImage: null,
    serviceDetailImage: null,
    productDetailImage: null,
  };
  const [headerData, setHeaderData] = useState({
    ...initialValue,
  });
  const [oldHomeImagePreview, setOldHomeImagePreview] = useState(null);
  const [oldAboutImagePreview, setOldAboutImagePreview] = useState(null);
  const [oldProductImagePreview, setOldProductImagePreview] = useState(null);
  const [oldProductDetailImagePreview, setOldProductDetailImagePreview] =
    useState(null);
  const [oldServiceImagePreview, setOldServiceImagePreview] = useState(null);
  const [oldServiceDetailImagePreview, setOldServiceDetailImagePreview] =
    useState(null);
  const [oldResearchImagePreview, setOldResearchImagePreview] = useState(null);
  const [oldBusinessImagePreview, setOldBusinessImagePreview] = useState(null);
  const [oldBusinessDetailImagePreview, setOldBusinessDetailImagePreview] =
    useState(null);
  const [oldContactImagePreview, setOldContactImagePreview] = useState(null);

  const navigate = useNavigate();
  const [errIdMsg, setErrIdMsg] = useState("");
  const [headerLoading, setHeaderLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getHeaderToConnectReq();
        setHeaderData(response.data.header);
        setHeaderLoading(false);
        if (response.data.header.homeImage) {
          const homeImageUrl = `https://admin.bluesurge.com.pk/uploads/${response.data.header.homeImage}`;
          setOldHomeImagePreview(homeImageUrl);
        }
        if (response.data.header.aboutImage) {
          const aboutImageUrl = `https://admin.bluesurge.com.pk/uploads/${response.data.header.aboutImage}`;
          setOldAboutImagePreview(aboutImageUrl);
        }
        if (response.data.header.productImage) {
          const productImageUrl = `https://admin.bluesurge.com.pk/uploads/${response.data.header.productImage}`;
          setOldProductImagePreview(productImageUrl);
        }
        if (response.data.header.productDetailImage) {
          const productDetailImageUrl = `https://admin.bluesurge.com.pk/uploads/${response.data.header.productDetailImage}`;
          setOldProductDetailImagePreview(productDetailImageUrl);
        }
        if (response.data.header.serviceImage) {
          const serviceImageUrl = `https://admin.bluesurge.com.pk/uploads/${response.data.header.serviceImage}`;
          setOldServiceImagePreview(serviceImageUrl);
        }
        if (response.data.header.serviceDetailImage) {
          const serviceDetailImageUrl = `https://admin.bluesurge.com.pk/uploads/${response.data.header.serviceDetailImage}`;
          setOldServiceDetailImagePreview(serviceDetailImageUrl);
        }
        if (response.data.header.researchImage) {
          const researchImageUrl = `https://admin.bluesurge.com.pk/uploads/${response.data.header.researchImage}`;
          setOldResearchImagePreview(researchImageUrl);
        }
        if (response.data.header.businessImage) {
          const businessImageUrl = `https://admin.bluesurge.com.pk/uploads/${response.data.header.businessImage}`;
          setOldBusinessImagePreview(businessImageUrl);
        }
        if (response.data.header.businessDetailImage) {
          const businessDetailImageUrl = `https://admin.bluesurge.com.pk/uploads/${response.data.header.businessDetailImage}`;
          setOldBusinessDetailImagePreview(businessDetailImageUrl);
        }
        if (response.data.header.contactImage) {
          const contactImageUrl = `https://admin.bluesurge.com.pk/uploads/${response.data.header.contactImage}`;
          setOldContactImagePreview(contactImageUrl);
        }
      } catch (error) {
        setHeaderLoading(false);
        console.log("error", error);
        // Handle error if needed
      }
    };

    fetchData();
  }, [getHeaderToConnectReq]);

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setHeaderData({
        ...headerData,
        [e.target.name]: e.target.files[0],
      });

      // Update image preview if new image selected
      if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        reader.onload = () => {
          if (e.target.name === "homeImage") {
            setOldHomeImagePreview(reader.result);
          } else if (e.target.name === "aboutImage") {
            setOldAboutImagePreview(reader.result);
          } else if (e.target.name === "productImage") {
            setOldProductImagePreview(reader.result);
          } else if (e.target.name === "productDetailImage") {
            setOldProductDetailImagePreview(reader.result);
          } else if (e.target.name === "serviceImage") {
            setOldServiceImagePreview(reader.result);
          } else if (e.target.name === "serviceDetailImage") {
            setOldServiceDetailImagePreview(reader.result);
          } else if (e.target.name === "researchImage") {
            setOldResearchImagePreview(reader.result);
          } else if (e.target.name === "businessImage") {
            setOldBusinessImagePreview(reader.result);
          } else if (e.target.name === "businessDetailImage") {
            setOldBusinessDetailImagePreview(reader.result);
          } else if (e.target.name === "contactImage") {
            setOldContactImagePreview(reader.result);
          }
        };
        reader.readAsDataURL(e.target.files[0]);
      }
    } else {
      setHeaderData({
        ...headerData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Append all text fields to formData
    formData.append("homeHeading", headerData.homeHeading);
    formData.append("homeDescription", headerData.homeDescription);
    formData.append("aboutHeading", headerData.aboutHeading);
    formData.append("aboutDescription", headerData.aboutDescription);
    formData.append("productHeading", headerData.productHeading);
    formData.append("productDescription", headerData.productDescription);
    formData.append("serviceHeading", headerData.serviceHeading);
    formData.append("serviceDescription", headerData.serviceDescription);
    formData.append("researchHeading", headerData.researchHeading);
    formData.append("researchDescription", headerData.researchDescription);
    formData.append("businessHeading", headerData.businessHeading);
    formData.append("businessDescription", headerData.businessDescription);
    formData.append("contactHeading", headerData.contactHeading);
    formData.append("contactDescription", headerData.contactDescription);

    // Append all image files to formData
    if (headerData.homeImage)
      formData.append("homeImage", headerData.homeImage);
    if (headerData.aboutImage)
      formData.append("aboutImage", headerData.aboutImage);
    if (headerData.productImage)
      formData.append("productImage", headerData.productImage);
    if (headerData.productDetailImage)
      formData.append("productDetailImage", headerData.productDetailImage);
    if (headerData.serviceImage)
      formData.append("serviceImage", headerData.serviceImage);
    if (headerData.serviceDetailImage)
      formData.append("serviceDetailImage", headerData.serviceDetailImage);
    if (headerData.researchImage)
      formData.append("researchImage", headerData.researchImage);
    if (headerData.businessImage)
      formData.append("businessImage", headerData.businessImage);
    if (headerData.businessDetailImage)
      formData.append("businessDetailImage", headerData.businessDetailImage);
    if (headerData.contactImage)
      formData.append("contactImage", headerData.contactImage);

    try {
      const response = await postHeaderReq(formData);
      toast.success("Header Updated Successfully");
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
      <div id="page-content" className="add_user_form">
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
                  <label className="form-label">
                    Home Image{" "}
                    <span className="text-danger">(1440px*794px)</span>{" "}
                  </label>
                  <br />

                  <input
                    onChange={handleChange}
                    type="file"
                    name="homeImage"
                    className={` `}
                  />
                  {oldHomeImagePreview && (
                    <img
                      src={oldHomeImagePreview}
                      alt="Home Image"
                      style={{ width: "100px", height: "auto" }}
                    />
                  )}
                </div>

                <div className="col-xs-6">
                  <label className="form-label">Home Heading</label>
                  {headerData && (
                    <CKEditor
                      editor={ClassicEditor}
                      data={headerData && headerData.homeHeading}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setHeaderData({
                          ...headerData,
                          homeHeading: data,
                        });
                      }}
                    />
                  )}
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-12">
                  <label className="form-label">Home Description</label>

                  {headerData && (
                    <CKEditor
                      editor={ClassicEditor}
                      data={headerData && headerData.homeDescription}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setHeaderData({
                          ...headerData,
                          homeDescription: data,
                        });
                      }}
                    />
                  )}
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-6">
                  <label className="form-label">
                    About Image{" "}
                    <span className="text-danger">(1440px*794px)</span>{" "}
                  </label>
                  <br />

                  <input
                    onChange={handleChange}
                    type="file"
                    name="aboutImage"
                    className={` `}
                  />
                  {oldAboutImagePreview && (
                    <img
                      src={oldAboutImagePreview}
                      alt="About Image"
                      style={{ width: "100px", height: "auto" }}
                    />
                  )}
                </div>
                <div className="col-xs-6">
                  <label className="form-label">About Heading</label>

                  {headerData && (
                    <CKEditor
                      editor={ClassicEditor}
                      data={headerData && headerData.aboutHeading}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setHeaderData({
                          ...headerData,
                          aboutHeading: data,
                        });
                      }}
                    />
                  )}
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-12">
                  <label className="form-label">About Description</label>

                  {headerData && (
                    <CKEditor
                      editor={ClassicEditor}
                      data={headerData && headerData.aboutDescription}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setHeaderData({
                          ...headerData,
                          aboutDescription: data,
                        });
                      }}
                    />
                  )}
                  
                </div>
              </div>

              <div className="form-group">
                <div className="col-xs-6">
                  <label className="form-label">
                    Product Image{" "}
                    <span className="text-danger">(1440px*794px)</span>{" "}
                  </label>
                  <br />

                  <input
                    onChange={handleChange}
                    type="file"
                    name="productImage"
                    className={` `}
                  />
                  {oldProductImagePreview && (
                    <img
                      src={oldProductImagePreview}
                      alt="Product Image"
                      style={{ width: "100px", height: "auto" }}
                    />
                  )}
                </div>

                <div className="col-xs-6">
                  <label className="form-label">Product Heading</label>

                  
                  {headerData && (
                    <CKEditor
                      editor={ClassicEditor}
                      data={headerData && headerData.productHeading}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setHeaderData({
                          ...headerData,
                          productHeading: data,
                        });
                      }}
                    />
                  )}
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-12">
                  <label className="form-label">Product Description</label>
 
                  {headerData && (
                    <CKEditor
                      editor={ClassicEditor}
                      data={headerData && headerData.productDescription}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setHeaderData({
                          ...headerData,
                          productDescription: data,
                        });
                      }}
                    />
                  )}
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-6">
                  <label className="form-label">
                    Product Detail Image{" "}
                    <span className="text-danger">(1440px*297px)</span>{" "}
                  </label>
                  <br />

                  <input
                    onChange={handleChange}
                    type="file"
                    name="productDetailImage"
                    className={` `}
                  />
                  {oldProductDetailImagePreview && (
                    <img
                      src={oldProductDetailImagePreview}
                      alt="Product Detail Image"
                      style={{ width: "100px", height: "auto" }}
                    />
                  )}
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-6">
                  <label className="form-label">
                    Service Image{" "}
                    <span className="text-danger">(1440px*794px)</span>{" "}
                  </label>
                  <br />

                  <input
                    onChange={handleChange}
                    type="file"
                    name="serviceImage"
                    className={` `}
                  />
                  {oldServiceImagePreview && (
                    <img
                      src={oldServiceImagePreview}
                      alt="Service Image"
                      style={{ width: "100px", height: "auto" }}
                    />
                  )}
                </div>
                <div className="col-xs-6">
                  <label className="form-label">Service Heading</label>
                  
                  {headerData && (
                    <CKEditor
                      editor={ClassicEditor}
                      data={headerData && headerData.serviceHeading}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setHeaderData({
                          ...headerData,
                          serviceHeading: data,
                        });
                      }}
                    />
                  )}
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-12">
                  <label className="form-label">Service Description</label>

                 
                  {headerData && (
                    <CKEditor
                      editor={ClassicEditor}
                      data={headerData && headerData.serviceDescription}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setHeaderData({
                          ...headerData,
                          serviceDescription: data,
                        });
                      }}
                    />
                  )}
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-6">
                  <label className="form-label">
                    Service Detail Image{" "}
                    <span className="text-danger">(1440px*297px)</span>{" "}
                  </label>
                  <br />

                  <input
                    onChange={handleChange}
                    type="file"
                    name="serviceDetailImage"
                    className={` `}
                  />
                  {oldServiceDetailImagePreview && (
                    <img
                      src={oldServiceDetailImagePreview}
                      alt="Service Detail Image"
                      style={{ width: "100px", height: "auto" }}
                    />
                  )}
                </div>
              </div>

              <div className="form-group">
                <div className="col-xs-6">
                  <label className="form-label">Research Image </label>
                  <br />

                  <input
                    onChange={handleChange}
                    type="file"
                    name="researchImage"
                    className={` `}
                  />
                  {oldResearchImagePreview && (
                    <img
                      src={oldResearchImagePreview}
                      alt="Research Image"
                      style={{ width: "100px", height: "auto" }}
                    />
                  )}
                </div>
                <div className="col-xs-6">
                  <label className="form-label">Research Heading</label>

                  
                   {headerData && (
                    <CKEditor
                      editor={ClassicEditor}
                      data={headerData && headerData.researchHeading}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setHeaderData({
                          ...headerData,
                          researchHeading: data,
                        });
                      }}
                    />
                  )}
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-12">
                  <label className="form-label">Research Description</label>
 
                  {headerData && (
                    <CKEditor
                      editor={ClassicEditor}
                      data={headerData && headerData.researchDescription}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setHeaderData({
                          ...headerData,
                          researchDescription: data,
                        });
                      }}
                    />
                  )}
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-6">
                  <label className="form-label">
                    Business Image{" "}
                    <span className="text-danger">(1440px*794px)</span>{" "}
                  </label>
                  <br />

                  <input
                    onChange={handleChange}
                    type="file"
                    name="businessImage"
                    className={` `}
                  />
                  {oldBusinessImagePreview && (
                    <img
                      src={oldBusinessImagePreview}
                      alt="Business Image"
                      style={{ width: "100px", height: "auto" }}
                    />
                  )}
                </div>
                <div className="col-xs-6">
                  <label className="form-label">Businesses Heading</label>

                  
                  {headerData && (
                    <CKEditor
                      editor={ClassicEditor}
                      data={headerData && headerData.businessHeading}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setHeaderData({
                          ...headerData,
                          businessHeading: data,
                        });
                      }}
                    />
                  )}
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-12">
                  <label className="form-label">Businesses Description</label>
 
                  {headerData && (
                    <CKEditor
                      editor={ClassicEditor}
                      data={headerData && headerData.businessDescription}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setHeaderData({
                          ...headerData,
                          businessDescription: data,
                        });
                      }}
                    />
                  )}
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-6">
                  <label className="form-label">
                    Business Detail Image{" "}
                    <span className="text-danger">(1440px*297px)</span>{" "}
                  </label>
                  <br />

                  <input
                    onChange={handleChange}
                    type="file"
                    name="businessDetailImage"
                    className={` `}
                  />
                  {oldBusinessDetailImagePreview && (
                    <img
                      src={oldBusinessDetailImagePreview}
                      alt="Business Image"
                      style={{ width: "100px", height: "auto" }}
                    />
                  )}
                </div>
              </div>

              <div className="form-group">
                <div className="col-xs-6">
                  <label className="form-label">
                    Contact Image{" "}
                    <span className="text-danger">(1440px*794px)</span>{" "}
                  </label>
                  <br />

                  <input
                    onChange={handleChange}
                    type="file"
                    name="contactImage"
                    className={` `}
                  />
                  {oldContactImagePreview && (
                    <img
                      src={oldContactImagePreview}
                      alt="Contact Image"
                      style={{ width: "100px", height: "auto" }}
                    />
                  )}
                </div>
                <div className="col-xs-6">
                  <label className="form-label">Contact Heading</label>

                
                  {headerData && (
                    <CKEditor
                      editor={ClassicEditor}
                      data={headerData && headerData.contactHeading}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setHeaderData({
                          ...headerData,
                          contactHeading: data,
                        });
                      }}
                    />
                  )}
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-12">
                  <label className="form-label">Contact Description</label>
  
                  {headerData && (
                    <CKEditor
                      editor={ClassicEditor}
                      data={headerData && headerData.contactDescription}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setHeaderData({
                          ...headerData,
                          contactDescription: data,
                        });
                      }}
                    />
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="btn btn-primary"
                >
                  Update Header
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

export default Header;
