const ProductDetails = () => {
  return (
    <>
      <div className="theme-inner-banner section-spacing">
        <div className="overlay">
          <div className="container">
            <h2>Product Details</h2>
          </div>
        </div>
      </div>
      <div className="project-details section-spacing">
        <div className="container">
          <div className="row">
            <div className="col-xl-4 col-lg-5 col-md-6 col-12 project-details-sidebar order-md-last">
              <div className="strategies">
                <h3 className="main-title">Marketing Strategies</h3>
                <p>
                  A tale of a fateful trip that started from this tropic port
                  aboard this tiny ship today still wanted by the government
                  apartment in the sky moving on up to the east side a family to
                  explore strange to seek out new life and new civilizations.
                </p>
                <p>
                  Boldly go where no man has gone before you would see the
                  biggest gift would be from me and the card attached would say
                  thank you.
                </p>
                <ul className="project-history clearfix">
                  <li>
                    <h6>Client :</h6>
                    <span>James Morgan</span>
                  </li>
                  <li>
                    <h6>Date :</h6>
                    <span>25/Jan/2018</span>
                  </li>
                  <li>
                    <h6>Budget :</h6>
                    <span>$3,450</span>
                  </li>
                  <li>
                    <h6>Category :</h6>
                    <span>Business Consulting</span>
                  </li>
                </ul>
                <h6>Share us on :</h6>
                <ul className="social-icon">
                  <li>
                    <a href="#">
                      <i className="fa fa-facebook" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-twitter" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-linkedin" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-pinterest" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-google-plus" aria-hidden="true" />
                    </a>
                  </li>
                </ul>
              </div>
              <div className="charts">
                <h3 className="main-title">Improvement Charts</h3>
                <p>
                  The man has gone before you would see the biggest gift would
                  be from me and the card attached.
                </p>
                <div id="chartContainer" />
              </div>
            </div>
            <div className="col-xl-8 col-lg-7 col-md-6 col-12 order-md-first image-col">
              <img src="images/portfolio/16.jpg" alt="" />
              <img src="images/portfolio/17.jpg" alt="" />
              <img src="images/portfolio/18.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
