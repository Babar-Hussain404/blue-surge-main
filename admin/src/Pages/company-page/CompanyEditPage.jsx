import React, { useState } from "react";
import Building_Logo_Green from "../../assets/imgs/Building_Logo_Green.svg";
import picture from "../../assets/imgs/post/picture.svg";

const CompanyEditPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    CompanyName: "",
    Website: "",
    Phone: "",
    Category: "",
    CompanySize: "",
    CompanyType: "",
    Founded: "",
    Headquarter: "",
    Logo: "",
    Tagline: "",
    Select_Location: "",
  });

  const {
    name,
    CompanyName,
    Website,
    Phone,
    Category,
    CompanySize,
    CompanyType,
    Founded,
    Headquarter,
    Logo,
    Tagline,
    Select_Location,
  } = formData;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const [isEmpty, setIsEmpty] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === "") {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
      // Continue with form submission logic
    }
  };
  return (
    <>
      <form onSubmit={onSubmit} className="col-lg-9">
        <div className="Company_Edit_Page_Container">
          <span className="company_Edit_Page_Name">Edit Page</span>

          <div className="Company_Edit_Page_Topbar">
            <img src={Building_Logo_Green} alt="" />
            <span>Update basic information to increase Page Discovery</span>
          </div>

          <div className="Company_Edit_Img_Container">
            <a
              href="page_ready_user_profile.html"
              class="widget-image-container animation-hatch pull-left position_home_left_img img_circle_border  company_user_img_Container"
            >
              <img
                // img/placeholders/avatars/avatar2.jpg
                src="https://s3-alpha-sig.figma.com/img/0d23/5692/e735a28fd34c9306c227064033c1b8fc?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=GtxB7JF7yhfuvMOFrlg4Bq4PQCqaMT-a7JQShvzJX5qnFeFr1qa0y8YMSaikCh5380BYWsW5SWUX8EuTgHzpDDXtmMPWwhCs4pMXP5TXc0gOia4tiK8TTlBdRwymeLON960QCBabvH5AXv-OPDSeMV66mRzzSRbZ6G0TNc8uRmUhqLZ9kSlip4aN8ZK8DHMI8AOcSFoIBEm2AwOnbUZmRZnh2VWOWSbHEmvWl0Mw0HkM6k3EvFG-O2M3ZzhEvLCyI7ZX0gm3bTX3by3dxe5LYd0OMZJ2FsnaG6z2DEwaT~MiJp~9Tjm8117-bj5Xi5GM42SHpniKfCdisHqr75UbXw__"
                alt="avatar"
                class="widget-image img-circle Profile_User_Img"
              />
            </a>
          </div>

          <div
            className={isEmpty ? "Company_Input_lable2" : "Company_Input_lable"}
          >
            <label htmlFor="nameInput">
              Name<span style={{ color: "red" }}>*</span>
            </label>
            <input
              className={isEmpty ? "Company_Inputs2" : "Company_Inputs"}
              type="text"
              id="nameInput"
              value={name}
              name="name"
              onChange={handleChange}
              placeholder="Please enter your full name"
            />
          </div>

          <div
            className={isEmpty ? "Company_Input_lable2" : "Company_Input_lable"}
          >
            <label htmlFor="nameInput">
            Headline<span style={{ color: "red" }}>*</span>
            </label>
            <input
              className={isEmpty ? "Company_Inputs2" : "Company_Inputs"}
              type="text"
              id="nameInput"
              value={name}
              name="name"
              onChange={handleChange}
              placeholder="Please enter your full name"
            />
          </div>

          <div className="Company_Input_lable">
            <label htmlFor="nameInput">
              Fruitychat.com/Company/<span style={{ color: "red" }}>*</span>
            </label>
            <input
              className="Company_Inputs"
              type="text"
              id="nameInput"
              value={CompanyName}
              name="CompanyName"
              onChange={handleChange}
              placeholder="Enter your unique united agro address"
            />
          </div>

          <div className="Company_Input_lable">
            <label htmlFor="nameInput">Website</label>
            <input
              className="Company_Inputs"
              type="text"
              id="nameInput"
              value={Website}
              name="Website"
              onChange={handleChange}
              placeholder="Enter your unique united agro address"
            />
          </div>

          <div className="Company_Input_lable">
            <label htmlFor="nameInput">
              Phone Number<span style={{ color: "red" }}>*</span>
            </label>
            <input
              className="Company_Inputs"
              type="number"
              id="nameInput"
              value={Phone}
              name="Phone"
              onChange={handleChange}
              placeholder="Enter your Phone Number"
            />
          </div>

          <div className="Company_Input_lable">
            <label htmlFor="selector">
              Category<span style={{ color: "red" }}>*</span>
            </label>
            <select
              id="selector"
              className="Company_Inputs"
              value={Category}
              onChange={handleChange}
            >
              <option value=""></option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
              {/* Add more options as needed */}
            </select>
          </div>

          <div className="Company_Input_lable">
            <label htmlFor="selector">Company Size</label>
            <select
              id="selector"
              className="Company_Inputs"
              name="CompanySize"
              value={CompanySize}
              onChange={handleChange}
            >
              <option value=""></option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
              {/* Add more options as needed */}
            </select>
          </div>

          <div className="Company_Input_lable">
            <label htmlFor="nameInput">Company Type</label>
            <input
              className="Company_Inputs"
              type="text"
              id="nameInput"
              value={CompanyType}
              name="CompanyType"
              onChange={handleChange}
              placeholder="Select Type"
            />
          </div>

          <div className="Company_Input_lable">
            <label htmlFor="nameInput">Founded</label>
            <input
              className="Company_Inputs"
              type="date"
              id="nameInput"
              value={Founded}
              name="Founded"
              onChange={handleChange}
              placeholder="Enter your Founded year"
            />
          </div>

          <div className="Company_Input_lable">
            <label htmlFor="nameInput">Headquarter</label>
            <input
              className="Company_Inputs"
              type="text"
              id="nameInput"
              value={Headquarter}
              name="Headquarter"
              onChange={handleChange}
              placeholder="Enter your Phone Number"
            />
          </div>

          <div className="Company_Input_lable">
            <label htmlFor="nameInput">Logo</label>
            <div className="company_File_Input_Container">
              <div className="file_input">
                <span className="img_logo"></span>
                <span className="file_input_Text">Upload your logo</span>
              </div>
            </div>
          </div>
          <span className="company_File_Detail">
            300 x 300px recommended. JPGs, JPEGs, and PNGs supported
          </span>

          <div className="Company_Input_lable">
            <label htmlFor="nameInput">Tagline</label>
            <input
              className="Company_Inputs"
              type="text"
              id="nameInput"
              value={Tagline}
              name="Tagline"
              onChange={handleChange}
              placeholder="e.g: Write your tagline about your company"
            />
          </div>
          <span className="company_File_Detail">
            Use your tagline to briefly describe what your organization does.
            This can be changed later.
          </span>

          <div className="Company_Input_lable">
            <label htmlFor="selector">Select Location</label>
            <select
              id="selector"
              className="Company_Inputs"
              name="Select_Location"
              value={Select_Location}
              onChange={handleChange}
            >
              <option value=""></option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
              {/* Add more options as needed */}
            </select>
          </div>

          <div className="form-group Company_Input_lable">
            <label htmlFor="nameInput">About</label>
            <div className="col-xs-12">
              <textarea
                id="widget-post3"
                name="widget-post3"
                rows={3}
                className="form-control addpost-center"
                placeholder="What’s on your mind?"
              />
            </div>
          </div>

          <div className="Company_checkbox_Container">
            <input
              className="checkbox"
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <span className="Company_checkbox_Text">
              I verify that I am an authorized representative of this
              organization and have the right to act on its behalf in the
              creation and management of this page. The organization and I agree
              to the additional terms for Pages.
            </span>
          </div>

          <span className="Company_Read_the_united">
            Read the united agro Pages Terms
          </span>
          <div className="Company_Edet_Save_BTN_Container">
            <button className="Company_Edet_Save_BTN">Save</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CompanyEditPage;
