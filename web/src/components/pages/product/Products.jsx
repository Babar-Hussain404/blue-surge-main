import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import headerImg from "../../../../src/assets/productImages/Banner.png";
import arrowImage from "../../../assets/icons/arrowImage.png";
import cross from "../../../assets/imgs/aboutimgs/pastcross.png";
import { pageNumberRefresh } from "../../../redux/action";
import Navbar3 from "../../Navbar/Navbar3";
import Header from "../../sections/Header";
import { renderHTML } from "../../utility/Helper";
import PaginationMain from "../../utility/PaginationMain";
import "./product.css";

const Products = ({ headertData, metaTagsData }) => {
  const limitToTwoWords = (text) => {
    const words = text.split(" ");
    return words.slice(0, 2).join(" ");
  };

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

  const [dropDown, setDropDown] = useState(false);
  const [industriesDropdown, setIndustriesDropdown] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [typesDropdown, setTypesDropdown] = useState(false);

  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const pageNumber = useSelector((state) => state.PageNumberReducer);
  const pageNumberRefreshReducer = useSelector(
    (state) => state.PageNumberRefreshReducer
  );
  const dispatch = useDispatch();
  const [productLoading, setProductLoading] = useState(true);
  const getProductsData = async () => {
    setProductLoading(true);
    try {
      //  ? await axios.get(`${process.env.REACT_APP_BASE_URL}/product/filter/${selectedIds.join(',')}/${serviceSelectedIds.join(',')}`)

      let response;
      if (selectedIds?.length > 0 && serviceSelectedIds?.length > 0) {
        response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/product/filter/${selectedIds.join(
            ","
          )}/${serviceSelectedIds.join(",")}`
        );
      } else if (selectedIds?.length > 0) {
        response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/product/industry/filter/${selectedIds}`
        );
      } else {
        response = await axios.get(`${process.env.REACT_APP_BASE_URL}/product`);
      }
      setProducts(response.data.products);
      setTotalPages(response.data.meta.totalPages);
      dispatch(pageNumberRefresh(false));
      setProductLoading(false);
    } catch (error) {
      console.log("Error fetching:", error);
      setProductLoading(false);
      dispatch(pageNumberRefresh(false));
    }
  };

  const [selectedIds, setSelectedIds] = useState([]);
  const [serviceSelectedIds, setServiceSelectedIds] = useState([]);

  useEffect(() => {
    if (selectedIds || serviceSelectedIds) {
      getProductsData(selectedIds, serviceSelectedIds);
    }
  }, [selectedIds, serviceSelectedIds]);

  const handleLearnMoreClick = () => {
    getProductsData();
    setIndustriesDropdown(false);
  };

  const handleCheckboxChange = (id) => {
    setSelectedIds((prevSelectedIds) => {
      const newSelectedIds = prevSelectedIds.includes(id)
        ? prevSelectedIds.filter((selectedId) => selectedId !== id)
        : [...prevSelectedIds, id];

      // getProductsData(newSelectedIds);
      return newSelectedIds;
    });
  };

  const handleServiceCheckboxChange = (id) => {
    setServiceSelectedIds((prevSelectedIds) => {
      const newSelectedIds = prevSelectedIds.includes(id)
        ? prevSelectedIds.filter((selectedId) => selectedId !== id)
        : [...prevSelectedIds, id];

      return newSelectedIds;
    });
  };
  const [service, setService] = useState([]);
  const [serviceLoading, setServiceLoading] = useState(true);
  const getServiceData = async (page) => {
    setServiceLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/service?page=${page}`
      );
      setService(response.data.services);
      setTotalPages(response.data.meta.totalPages);
      dispatch(pageNumberRefresh(false));
      setServiceLoading(false);
    } catch (error) {
      console.log("Error fetching:", error);
      setServiceLoading(false);
      dispatch(pageNumberRefresh(false));
    }
  };
  useEffect(() => {
    if (serviceLoading) {
      getServiceData();
    }
  }, [serviceLoading]);

  const [industryProducts, setIndustryProducts] = useState([]);

  const [industryLoading, setIndustryLoading] = useState(true);
  const getIndustryProductsData = async (page) => {
    setIndustryLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/industry?page=${page}`
      );
      setIndustryProducts(response.data.industrys);
      setIndustryLoading(false);
    } catch (error) {
      console.log("Error fetching:", error);
      setIndustryLoading(false);
    }
  };
  useEffect(() => {
    if (industryLoading) {
      getIndustryProductsData();
    }
  }, [industryLoading]);

  const toggleDropdown = (dropdown) => {
    if (dropdown === "industries") {
      setIndustriesDropdown(!industriesDropdown);
      setServicesDropdown(false);
      setTypesDropdown(false);
    } else if (dropdown === "services") {
      setIndustriesDropdown(false);
      setServicesDropdown(!servicesDropdown);
      setTypesDropdown(false);
    } else if (dropdown === "types") {
      setIndustriesDropdown(false);
      setServicesDropdown(false);
      setTypesDropdown(!typesDropdown);
    }
  };

  return (
    <>
      <Helmet>
        <title>
          {metaTagsData && metaTagsData.productTitle
            ? metaTagsData.productTitle
            : "Blue Surge"}
        </title>
        <meta
          name="description"
          content={
            metaTagsData && metaTagsData.productDescription
              ? metaTagsData.productDescription
              : "Blue Surge Description"
          }
        />
        <meta
          name="keywords"
          content={
            metaTagsData && metaTagsData.productKeywords
              ? metaTagsData.productKeywords
              : "Blue, Surge, keywords"
          }
        />
      </Helmet>
      <Navbar3 isMobile={isMobile} />
      <Header
        title={
          headertData &&
          headertData.productHeading !== "undefined" && (
            <div
              dangerouslySetInnerHTML={renderHTML(headertData.productHeading)}
            />
          )
        }
        description={
          headertData &&
          headertData.productDescription !== "undefined" && (
            <div
              dangerouslySetInnerHTML={renderHTML(
                headertData.productDescription
              )}
            />
          )
        }
        backgroundImage={
          headertData && headertData.productImage
            ? `${process.env.REACT_APP_IMAGE_URL}/${headertData.productImage}`
            : headerImg
        }
        showButton={false}
        height="62vh"
      />

      <div className="first_heading ">
        <h2 className="first_title heading-margin">
          <span style={{ marginLeft: "7rem" }} className="underline-part">
            Our P
          </span>
          roducts
        </h2>
      </div>
      {products.length > 0 && (
        <div className="buttonsMain d-flex gap-5">
          <button onClick={() => toggleDropdown("industries")}>
            <div className=" btn1  rounded-0">
              <h3 style={{ fontFamily: "Inter" }}>Industries</h3>
            </div>
          </button>
          <button onClick={() => toggleDropdown("services")}>
            <div className=" btn1  rounded-0">
              <h3 style={{ fontFamily: "Inter" }}>Services</h3>
            </div>
          </button>
        </div>
      )}

      {industriesDropdown && (
        <div
          className="dropDown"
          style={{
            overflowY: "scroll",
            overflowX: "hidden",
            height: "260px",
            scrollbarWidth: "thin",
          }}
        >
          <div className="sfi">
            <h3
              className="mr-5"
              style={{ fontFamily: "Inter", padding: "10px" }}
            >
              Industries
            </h3>
            <span>
              <img
                className="mr-3"
                onClick={() => toggleDropdown("industries")}
                width={20}
                src={cross}
              />
            </span>
          </div>
          <div className="" style={{ color: "#fff", marginTop: "15px" }}>
            {industryProducts.map((industry) => (
              <div
                className="il"
                style={{ marginBottom: "10px" }}
                key={industry.id}
              >
                <input
                  type="checkbox"
                  style={{ width: "40px" }}
                  id={`industry-${industry._id}`}
                  checked={selectedIds.includes(industry._id)}
                  onChange={() => handleCheckboxChange(industry._id)}
                />
                <label
                  style={{ padding: "4px" }}
                  htmlFor={`industry-${industry._id}`}
                >
                  {limitToTwoWords(industry.name)}
                  {/* {industry.name} */}
                </label>
                <br />
              </div>
            ))}
          </div>
          <div></div>
        </div>
      )}
      {servicesDropdown && (
        <div
          className="dropDown2"
          style={{
            overflowY: "scroll",
            overflowX: "hidden",
            height: "260px",
            scrollbarWidth: "thin",
          }}
        >
          <div className="sfi">
            <h3
              className="mr-5"
              style={{ fontFamily: "Inter", padding: "10px" }}
            >
              Services
            </h3>
            <span>
              <img
                className="mr-3"
                onClick={() => toggleDropdown("services")}
                width={20}
                src={cross}
              />
            </span>
          </div>
          <div className="checkbox2">
            {service.map((industry) => (
              <div
                className="il margin-dropdown2"
                style={{ marginLeft: "30px" }}
                key={industry.id}
              >
                <input
                  type="checkbox"
                  style={{ width: "40px" }}
                  id={`industry-${industry._id}`}
                  checked={serviceSelectedIds.includes(industry._id)}
                  onChange={() => handleServiceCheckboxChange(industry._id)}
                />
                <label htmlFor={`industry-${industry._id}`}>
                  {/* {industry.name} */}
                  {limitToTwoWords(industry.name)}
                </label>
                <br />
              </div>
            ))}
          </div>
          <div></div>
        </div>
      )}

      {productLoading ? (
        <div
          style={{
            textAlign: "center",
            height: "30vh",
            width: "100%",
          }}
          className="visible-lg"
        >
          <i className="fa fa-spinner fa-4x fa-spin"></i>
        </div>
      ) : ( 
        <>
          {products?.length > 0 ? (
            <div style={{ width: "100%" }}>
              <div
                className=""
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  marginTop: "60px",
                }}
              >
                {products?.length > 0 &&
                  products.map((product, index) => (
                    <div key={index} className=" ">
                      <Link to={`/products-details/${product._id}`}>
                        <Card
                          className="product-card"
                          style={{
                            backgroundColor: "#00193C",
                            height: "600px",
                            marginTop: "70px",
                            borderRadius: "0",
                            border: "none",
                          }}
                        >
                          <Card.Img
                            variant="top"
                            src={`${process.env.REACT_APP_IMAGE_URL}/${
                              product && product.thumbnailImage
                            }`}
                            style={{ height: "200px" }}
                          />
                          <Card.Body
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <Card.Title
                              className="fontfamily"
                              style={{ fontSize: "2.5rem" }}
                            >
                              {product.name}
                            </Card.Title>
                            <Card.Text
                              className="cardtext"
                              style={{
                                fontSize: "1.5rem",
                                marginBottom: "1rem",
                              }}
                            >
                              {/* {formatText(product.detail)} */}
                              {/* {product.detail
                            .split(" ")
                            .slice(0, 45)
                            .join(" ")}{" "} */}
                              <div
                                dangerouslySetInnerHTML={renderHTML(
                                  product.detail
                                    .split(" ")
                                    .slice(0, 45)
                                    .join(" ")
                                )}
                              />
                              {product?.detail?.split(" ")?.length > 5}{" "}
                            </Card.Text>

                            <div
                              style={{ marginTop: "auto", textAlign: "end" }}
                            >
                              <Link
                                to={`/products-details/${product._id}`}
                                className="arrow-position"
                              >
                                <img src={arrowImage} />
                              </Link>
                            </div>
                          </Card.Body>
                        </Card>
                      </Link>
                    </div>
                  ))}
              </div>
              <div className=" text-center">
                <ul>
                  <PaginationMain totalPages={totalPages} />
                </ul>
              </div>
            </div>
          ) : (
            <div
              style={{
                textAlign: "center",
                height: "30vh",
                width: "100%",
              }}
              className="visible-lg"
            >
              <h3 style={{ color: "white" }}>Oops! No Data Found</h3>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Products;
