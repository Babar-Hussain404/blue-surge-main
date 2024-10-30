import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { homeServicesData } from "../../redux/action";

const HomeServices = ({ industryProducts, industryLoading }) => {
  const [activeProduct, setActiveProduct] = useState(null);

  const dispatch = useDispatch();
  // homeServicesReducer
  const industryServiceId = useSelector((state) => state.homeServicesReducer);
  const handleProductClick = (product) => {
    setActiveProduct(product);
    dispatch(homeServicesData(product._id));
  };

  const handleShowAll = () => {
    setActiveProduct(null);
  };

  return (
    <div
      className="service-style-one section-spacing"
      style={{ marginTop: "60px" }}
    >
      {industryProducts && industryProducts.length > 0 && (
        <div className="home_service_heading text-dark">
          <h2 className="home_service_heading_h2">Explore Our Services</h2>
          <p className="home_service_heading_p">
            Browse Our Services : Tailor-Made Solutions Await Your Discovery
          </p>
        </div>
      )}
      <div className="home_service_heading">
        <div className="">
          <div className="service_list">
            {industryLoading ? (
              <div
                style={{ textAlign: "center", height: "30vh", width: "100%" }}
                className="visible-lg"
              >
                <i className="fa fa-spinner fa-4x fa-spin"></i>
              </div>
            ) : (
              <div>
                {activeProduct ? (
                  <div className="active_product">
                    <button
                      className="service_list_btn"
                      onClick={handleShowAll}
                    >
                      {activeProduct.name} <span className="cross">×</span>
                    </button>
                  </div>
                ) : (
                  industryProducts &&
                  industryProducts?.map((product, index) => (
                    <button
                      key={index}
                      onClick={() => handleProductClick(product)}
                      className="service_list_btn"
                    >
                      {product.name}
                    </button>
                  ))
                )}
                <Link to={"/businesses"} className="service_list_btn">
                  See All
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeServices;
