import React, { useEffect, useState } from "react";
import "../../../src/assets/css/style.css";  
import img from "../../../src/assets/solarImages/solar3.jpeg";
import Header from "../sections/Header"; 

import ContactMap from "../sections/ContactMap";
import Navbar3 from "../Navbar/Navbar3";
function ContactForm() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {isMobile && <Navbar3 />}
      <Header backgroundImage={img} />

      <div className="contact-us-section">
        <div className="">
          <div className="row">
            <div className="col-lg-4 col-12">
              <div className="img-box" />
            </div>
            <div className="col-lg-7 col-12">
              <div
                className="contact-responsive"
                style={{
                  backgroundColor: "#137bf0",
                  marginRight: "-45px",
                  padding: "10px",
                }}
              >
                <form
                  className="theme-form-one form-validation"
                  autoComplete="off"
                >
                  <div className="">
                    <div className=" col-12">
                      <input type="text" placeholder="Name " name="name" />
                    </div>
                    <div className=" col-12">
                      <input type="text" placeholder="Phone " name="phone" />
                    </div>
                    <div className="col-12">
                      <input type="email" placeholder="Email " name="email" />
                    </div>
                    <div className="col-12">
                      <textarea
                        placeholder="Message"
                        name="message"
                        defaultValue={""}
                      />
                    </div>
                  </div>{" "}
                  <button
                    className="theme-button-one"
                    style={{
                      margin: "5rem 2.3rem",
                      backgroundColor: "#fff",
                      color: "#137bf0",
                      fontSize: "10px",
                    }}
                  >
                    SEND MESSAGE
                  </button>
                </form>
              </div>{" "}
            </div>{" "}
          </div>
        </div>
      </div>

      <br />
      <br />
      <div className="row">
        <div className="branch-address" style={{ padding: "3rem" }}>
          <div className="">
            <div className="">
              <div className="  row">
                <div className="item col-lg-3">
                  <div className="wrapper">
                    <h3>Head Office</h3>
                    <p>
                      <i className="fa fa-address-book-o" aria-hidden="true" />
                      173, Street 11, Phase I, Bahria Town, Rawalpindi
                    </p>
                  </div>{" "}
                  {/* /.wrapper */}
                </div>
                <div className="item col-lg-3">
                  <div className="wrapper">
                    <h3>Factory Address</h3>
                    <p>
                      <i className="fa fa-address-book-o" aria-hidden="true" />{" "}
                      Plot # 51, S 9, RCCI Industrial Estate, Rawalpindi
                    </p>
                  </div>{" "}
                  {/* /.wrapper */}
                </div>
                <div className="item col-lg-3">
                  <div className="wrapper">
                    <h3>Europe Office</h3>
                    <p>
                      <i className="fa fa-address-book-o" aria-hidden="true" />{" "}
                      1407 Sofia City, Sofia District <br /> Metropolitan
                      Muncipility, Lozenets Region, <br /> 19 Lyubata Str,
                      Bulgaria
                    </p>
                  </div>{" "}
                  {/* /.wrapper */}
                </div>
                <div className="item col-lg-2">
                  <div className="wrapper">
                    <h3>Email</h3>
                    <p>
                      <i className="fa fa-address-book-o" aria-hidden="true" />{" "}
                      info@bluesurge.com.pk
                    </p>
                  </div>{" "}
                  {/* /.wrapper */}
                </div>
              </div>{" "}
              {/* /.address-slider */}
            </div>
          </div>{" "}
          {/* /.container */}
        </div>

        <ContactMap />
      </div>
    </>
  );
}

export default ContactForm;
