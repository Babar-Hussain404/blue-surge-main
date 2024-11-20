import React from 'react';
import { renderHTML } from '../../utility/Helper';

const AboutMission = ({aboutData}) => {
  return (
    <>
    {aboutData && aboutData.mission && (
      <div className="mission">
          <div>
          {aboutData &&(<div className="about_heading">
              <div className="first_heading">
                <h2 className="first_title">
                  <span className="underline-part">Missi</span>on
                </h2>
              </div>
            </div>)}

            <div className="who_we_are_left">
              <p>{aboutData && (<div
            dangerouslySetInnerHTML={renderHTML(aboutData.mission)}
          />)}</p>
              <br />
              {/* <div className="">
                <Link to="/contact" className="mission_btn  ">
                  <div className="mission_btn_text">Learn More</div>
                </Link>
              </div> */}
            </div>
          </div>
          <div className="who_we_are_right-vission">
            <div className='mission_right_img'>

            <img
              className="img_heightwidth"
              src={
                aboutData &&
                `${process.env.REACT_APP_IMAGE_URL}/${aboutData.missionImage}`
                }
                />
                </div>
          </div>
        </div>)}
    </>
  )
}

export default AboutMission
