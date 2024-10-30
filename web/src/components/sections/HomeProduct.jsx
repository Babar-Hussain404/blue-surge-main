import React from "react";
import { Link } from "react-router-dom";

const HomeProduct = () => {
  return (
    <div className="our-case section-spacing">
      <div className="container">
        <div className="theme-title-one">
          <h2>Our PRODUCTS</h2>
          <p>
            A tale of a fateful trip that started from this tropic port aboard
            this tiny ship today stillers
          </p>
        </div>{" "}
        {/* /.theme-title-one */}
        <div className="wrapper">
          <div className="row">
            <div className="col-lg-4 col-sm-6 col-12">
              <div className="single-case-block">
                <img src="images/portfolio/1.jpg" alt="" />
                <div className="hover-content">
                  <div className="text clearfix">
                    <div className="float-left">
                      <h5>
                        <a href="project-details.html">Business Meeting</a>
                      </h5>
                      <p>Explore strange new worlds</p>
                    </div>
                    <a
                      href="project-details.html"
                      className="details float-right"
                    >
                      <i
                        className="fa fa-long-arrow-right"
                        aria-hidden="true"
                      />
                    </a>
                  </div>{" "}
                  {/* /.text */}
                </div>{" "}
                {/* /.hover-content */}
              </div>{" "}
              {/* /.single-case-block */}
            </div>{" "}
            {/* /.col- */}
            <div className="col-lg-4 col-sm-6 col-12">
              <div className="single-case-block">
                <img src="images/portfolio/2.jpg" alt="" />
                <div className="hover-content">
                  <div className="text clearfix">
                    <div className="float-left">
                      <h5>
                        <a href="project-details.html">Business Meeting</a>
                      </h5>
                      <p>Explore strange new worlds</p>
                    </div>
                    <a
                      href="project-details.html"
                      className="details float-right"
                    >
                      <i
                        className="fa fa-long-arrow-right"
                        aria-hidden="true"
                      />
                    </a>
                  </div>{" "}
                  {/* /.text */}
                </div>{" "}
                {/* /.hover-content */}
              </div>{" "}
              {/* /.single-case-block */}
            </div>{" "}
            {/* /.col- */}
            <div className="col-lg-4 col-sm-6 col-12">
              <div className="single-case-block">
                <img src="images/portfolio/3.jpg" alt="" />
                <div className="hover-content">
                  <div className="text clearfix">
                    <div className="float-left">
                      <h5>
                        <a href="project-details.html">Business Meeting</a>
                      </h5>
                      <p>Explore strange new worlds</p>
                    </div>
                    <a
                      href="project-details.html"
                      className="details float-right"
                    >
                      <i
                        className="fa fa-long-arrow-right"
                        aria-hidden="true"
                      />
                    </a>
                  </div>{" "}
                  {/* /.text */}
                </div>{" "}
                {/* /.hover-content */}
              </div>{" "}
              {/* /.single-case-block */}
            </div>{" "}
            {/* /.col- */}
            {/* /.col- */}
          </div>{" "}
          {/* /.row */}
        </div>{" "}
        {/* /.wrapper */}
        <div className="view-all">
          <Link to="/products" className="theme-button-one">
            VIEW ALL
          </Link>
        </div>
      </div>{" "}
      {/* /.container */}
    </div>
  );
};

export default HomeProduct;
