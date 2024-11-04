import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import headerImg from "../../../assets/icons/homeImage/reasechdevimg.png";
import { technologyData } from "../../../redux/action";
import Navbar3 from "../../Navbar/Navbar3";
import Header from "../../sections/Header";
import { renderHTML } from "../../utility/Helper";
import ResearchProducts from "./ResearchProducts";

const ResearchandDevelopment2 = ({ headertData, metaTagsData }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [RDData, setRDData] = useState({ heading: "", test: "", technology: "" });
  const [categoriesData, setcategoriesData] = useState(null);
  const [RDLoading, setRDLoading] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getRDData = async () => {
    try {
      const response = await axios.get(`https://web.bluesurge.com.pk/rd`);
      setRDData(response.data.rd || {});
      setcategoriesData(response.data.rd.categories || {});

      dispatch(technologyData(response.data.rd || {}));
      setRDLoading(false);
    } catch (error) {
      console.log("Error fetching R&D data:", error);
      setRDLoading(false);
    }
  };

  useEffect(() => {
    if (RDLoading) getRDData();
  }, [RDLoading]);

  const toggleCategoryVisibility = (index) => {
    setExpandedCategories((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <>
      <Helmet>
        <title>{metaTagsData?.researchTitle || "Blue Surge"}</title>
        <meta name="description" content={metaTagsData?.researchDescription || "Blue Surge Description"} />
        <meta name="keywords" content={metaTagsData?.researchKeywords || "Blue, Surge, keywords"} />
      </Helmet>

      <Navbar3 isMobile={isMobile} />
      <Header
        title={headertData?.researchHeading !== "undefined" && (
          <div dangerouslySetInnerHTML={renderHTML(headertData.researchHeading)} />
        )}
        description={headertData?.researchDescription !== "undefined" && (
          <div dangerouslySetInnerHTML={renderHTML(headertData.researchDescription)} />
        )}
        backgroundImage={
          headertData?.researchImage === "undefined"
            ? `https://admin.bluesurge.com.pk/uploads/${headertData.researchImage}`
            : headerImg
        }
        showButton={false}
      />

      <div className="research2-products">
        {RDLoading ? (
          <div className="loading-spinner">
            <i className="fa fa-spinner fa-5x fa-spin"></i>
          </div>
        ) : (
          <>
            {RDData.technology && (
              <div>
                <div className="first_heading center_heading">
                  <h2 className="first_title">
                    {RDData.heading && (
                      <span>
                        <div className="custom-text-style" style={{ color: "#137bf0", padding: "20px 0px" }} dangerouslySetInnerHTML={renderHTML(RDData.heading)} />
                        <div className="underline-part" style={{ width: "20%" }}></div>
                      </span>
                    )}
                  </h2>
                </div>

                <p className="research-development-section additional-width-class">
                  <div dangerouslySetInnerHTML={renderHTML(RDData.ourTeamDetail)} />
                </p>

                <div className="categories-section">
                  <style>
                    {`
                      .category-title {
                        background-color: #01295B;
                        padding: 5px 8px;
                        width: fit-content;
                        border-radius: 10px;
                        margin: 5px;
                        cursor: pointer;
                      }
                    `}
                  </style>
                  {/* <h3 className="section-title">Explore Our R&D</h3> */}
                  {categoriesData && categoriesData.map((category, index) => (
                    <div key={index} className="category">
                      <h3 onClick={() => toggleCategoryVisibility(index)} className="category-title">{category.title}</h3>
                      {expandedCategories[index] && (
                        <div className="category-details">
                          <div dangerouslySetInnerHTML={renderHTML(category.description)} />
                          <img src={category.image} alt={`${category.title} image`} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <p className="research-development-section additional-width-class">
                  <div dangerouslySetInnerHTML={renderHTML(RDData.technology)} />
                </p>
              </div>
            )}
          </>
        )}
        <ResearchProducts />
      </div>
    </>
  );
};

export default ResearchandDevelopment2;