import React from 'react';
import { renderHTML } from '../../utility/Helper';
// import who_we_are from "../../../../src/assets/imgs/Blue surge_About Us_Icons_Images/images/image1.png";

const AboutWhoWeAre = ({aboutData}) => {
  return (
    <>
    {aboutData && aboutData.whoWeAre && (
      <div className="who_we_are">
        <div>
          {aboutData &&( <div className="about_heading">
            <div className="first_heading">
              <h2 className="first_title">
                <span className="underline-part">Who </span>we are
              </h2>
            </div>
          </div>)
}
          <div className="who_we_are_left">
              <p>{aboutData && (<div
              dangerouslySetInnerHTML={renderHTML(aboutData.whoWeAre)}
            />)}</p>
          </div>
        </div>
        <div className="who_we_are_right">
          <div className="who_we_are_right_img">

          <img
            className="img_heightwidth"
            src={
              aboutData &&
              `https://admin.bluesurge.com.pk/uploads/${aboutData.whoWeAreImage}`
              }
              />
              </div>
        </div>
      </div>)}
    </>
  );
};

export default AboutWhoWeAre;
