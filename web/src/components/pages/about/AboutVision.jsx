import React from 'react';
import { formatText, renderHTML } from '../../utility/Helper';

const AboutVision = ({aboutData}) => {
  return (
    <>
    {aboutData && aboutData.vision && (
      <div className="vision">
          <div>
          {aboutData  &&(
            <div className="about_heading">
              <div className="first_heading">
                <h2 className="first_title">
                  <span className="underline-part">Visio</span>n
                </h2>
              </div>
            </div>)}

            <div className="who_we_are_left">
              <p>{aboutData && (<div
            dangerouslySetInnerHTML={renderHTML(aboutData.vision)}
          />)}</p>
              <br />
              {/* <div className="">
                <Link to="/contact" className="mission_btn  ">
                  <div className="mission_btn_text">Learn More</div>
                </Link>
              </div> */}
            </div>
          </div>
          <div className="who_we_are_right">
            <div className='vision_right_img '>

            <img
              className="img_heightwidth"
              src={
                aboutData &&
                `${process.env.REACT_APP_IMAGE_URL}/${aboutData.visionImage}`
                }
                />
                </div>
          </div>
        </div>
        )}
    </>
  )
}

export default AboutVision
