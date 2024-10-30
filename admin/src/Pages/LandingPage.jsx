import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import MainContainer from "../Component/MainContainer";
import SideBar from "../Component/SideBar";
import Header from "../Component/main-container/Header";
import PrivateRoutes from "./PrivateRoutes";
import About from "./about/About";
import ContactList from "./contact-us/ContactList";
import { MasterLayout } from "./core/MasterLayout";
import AddIndustry from "./industries/AddIndustry";
import EditIndustry from "./industries/EditIndustry";
import IndustriesList from "./industries/IndustriesList";
import AddUser from "./my-connects/AddUser";
import EditUser from "./my-connects/EditUser";
import MyConnects from "./my-connects/MyConnects";
import Research from "./research/Research";
import AddService from "./services/AddService";
import ServicesList from "./services/ServicesList";
import EditServices from "./services/EditServices";
import ProductsList from "./products/ProductsList";
import AddProduct from "./products/AddProduct";
import EditProducts from "./products/EditProducts";
import HeaderAdmin from "./header/Header"
import MetaTags from "./meta-tags/MetaTags";
import SocialIcons from "./social-icons/SocialIcons";
import Footer from "../Component/main-container/Footer";
import AdminResearchAndDevelopment from "./research/AdminResearchAndDevelopment";
import PartnerList from "./partners/PartnerList";

const LandingPage = () => {
  const background_color = useSelector(
    (state) => state.changeBackgroundColorReducer
  );
  const sidebarState = useSelector((state) => state.sidebarReducer);

  return (
    <div id="page-wrapper">
      <div
        id="page-container"
        className={`${sidebarState
            ? "sidebar-partial sidebar-visible-lg sidebar-visible-sm"
            : ""
          } `}
      >
        <div style={{ display: sidebarState ? "block" : "none" }}>
          <SideBar />
        </div>
        <MasterLayout />

        <Header />
        <br />
        <div className={`${background_color}`} id="main-container">
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/admin" element={<MainContainer />} />
              {/* industry  */}
              <Route path="/admin-industries" element={<IndustriesList />} />
              <Route path="/admin-add-industry" element={<AddIndustry />} />
              <Route path="/admin-edit-industry" element={<EditIndustry />} />
              {/* industry  */}
              {/* products  */}
              <Route path="/admin-products" element={<ProductsList />} />
              <Route path="/admin-add-product" element={<AddProduct />} />
              <Route path="/admin-edit-product" element={<EditProducts />} />
              {/* products  */}
              {/* services  */}
              <Route path="/admin-services" element={<ServicesList />} />
              <Route path="/admin-add-service" element={<AddService />} />
              <Route path="/admin-edit-service" element={<EditServices />} />
              {/* services  */}
              {/* users  */}
              <Route path="/admin-users" element={<MyConnects />} />
              <Route path="/admin-add-user" element={<AddUser />} />
              <Route path="/admin-edit-user" element={<EditUser />} />
              {/* users  */}
              {/* messages  */}
              <Route path="/admin-messages" element={<ContactList />} />
              <Route path="/admin-partners" element={<PartnerList />} />
              {/* messages  */}
              {/* research and development  */}
              <Route
                path="/admin-add-update-research-and-development"
                // element={<Research />}
                element={<AdminResearchAndDevelopment />}
              />
              {/* research and development  */}
              {/* about  */}
              <Route path="/admin-add-update-about" element={<About />} />
              {/* header  */}
              <Route path="/admin-add-update-header" element={<HeaderAdmin />} />
              {/* meta tags  */}
              <Route path="/admin-add-update-meta-tags" element={<MetaTags />} />
              {/* Social Icons  */}
              <Route path="/admin-add-update-social-icons" element={<SocialIcons />} />

            </Route>

          </Routes>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
