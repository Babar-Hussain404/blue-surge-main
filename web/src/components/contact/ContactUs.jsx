import axios from "axios";
import React, { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar3 from "../Navbar/Navbar3";
import "../contact/contactstyle.css";
import "../pages/about/about.css";
import ContactMap from "../sections/ContactMap";
import Header from "../sections/Header";
import { renderHTML } from "../utility/Helper";
import { ContactAddressCard } from "./ContactAddressCard";
const ContactUs = ({ headertData, metaTagsData }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = ({ headertData }) => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const mail = useSelector((state) => state.mailReducer);
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    street: "",
    country: "",
    postalCode: "",
    city: "",
    phone: "",
    message: "",
  };
  const [formData, setFormData] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCaptchaChange = (value) => { 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(formData.email)) {
      toast.error("Invalid email format");
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/contactus`,
        formData
      );
      setFormData(initialValues);
      toast.success("Data Submitted Successfully");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <Helmet>
        <title>
          {metaTagsData && metaTagsData.contactTitle
            ? metaTagsData.contactTitle
            : "Blue Surge"}
        </title>
        <meta
          name="description"
          content={
            metaTagsData && metaTagsData.contactDescription
              ? metaTagsData.contactDescription
              : "Blue Surge Description"
          }
        />
        <meta
          name="keywords"
          content={
            metaTagsData && metaTagsData.contactKeywords
              ? metaTagsData.contactKeywords
              : "Blue, Surge, keywords"
          }
        />
      </Helmet>
      <Navbar3 isMobile={isMobile} />

      <Header
        title={
          headertData &&
          headertData.contactHeading !== "undefined" && (
            <div
              dangerouslySetInnerHTML={renderHTML(headertData.contactHeading)}
            />
          )
        }
        description={
          headertData &&
          headertData.contactDescription &&
          headertData.contactDescription !== "undefined" && (
            <div
              dangerouslySetInnerHTML={renderHTML(
                headertData.contactDescription
              )}
            />
          )
        }
        backgroundImage={
          headertData && headertData.contactImage
            ? `${process.env.REACT_APP_IMAGE_URL}/${headertData.contactImage}`
            : ""
        }
        showButton={false}
        height="62vh"
      />

      <div className="">
        <div className="first_heading contactheading">
          <h2 className="first_title heading-margin">
            <span className="underline-part">Gene</span>ral Contact
          </h2>
        </div>
        <p className="cotact-text">
          <div className="mt-5 fs-2 text-light">
            <a href={`mailto:${mail}`} className="text-light">
              Email Address : {mail}
            </a>
          </div>
          {/* <br/> */}
          <div className="text-light fs-2">OR</div>
          Fill form to contact Us{" "}
        </p>

        <form onSubmit={handleSubmit}>
          <div className="" autoComplete="off">
            <div className="fiels-position">
              <div className="contact-field">
                <input
                  className="field-color"
                  type="text"
                  placeholder="first Name*"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="contact-field">
                <input
                  className="field-color"
                  type="text"
                  placeholder="Last Name *"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="fiels-position">
              <div className="contact-field">
                <input
                  className="field-color"
                  type="email"
                  placeholder="Email "
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="contact-field">
                <input
                  className="field-color"
                  type="text"
                  placeholder="Company Name * "
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="fiels-position">
              <div className="contact-field">
                <input
                  className="field-color"
                  type="text"
                  placeholder="Street and Number "
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                />
              </div>
              <div className="contact-field">
                <input
                  className="field-color"
                  type="text"
                  placeholder="Country / Region * "
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="fiels-position">
              <div className="contact-field">
                <input
                  className="field-color"
                  type="text"
                  placeholder="Postal Code "
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                />
              </div>
              <div className="contact-field">
                <input
                  className="field-color"
                  type="text"
                  placeholder="City "
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="fiels-position">
              <div className="contact-field">
                <input
                  className="field-color"
                  type="text"
                  placeholder="Phone (+49 123 456-78) "
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              {/* <di */}
              <div className="contact-field full-width">
                <textarea
                  className="field-color"
                  placeholder="Message *"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="fiels-position">
              <div className="contact-field">
                <Link
                  // to={"/about"}
                  className="btn main_btn "
                  onClick={handleSubmit}
                >
                  Submit
                </Link>
              </div>
              <div className="contact-field">
                <ReCAPTCHA
                  className="d-flex justify-content-center"
                  sitekey={process.env.REACT_APP_RECAPTCHA}
                  onChange={handleCaptchaChange}
                />
              </div>
            </div>

            <div className="fiels-position">
              <div className="contact-field"></div>
            </div>
          </div>
        </form>

        <ContactAddressCard />

        <ContactMap />
        <div style={{ marginBottom: "10rem" }}></div>
      </div>
    </>
  );
};

export default ContactUs;
