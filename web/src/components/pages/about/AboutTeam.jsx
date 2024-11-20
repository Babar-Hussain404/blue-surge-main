import axios from "axios";
import React, { useEffect, useState } from "react";


const AboutTeam = () => {
  const [aboutTeamData, setAboutTeamData] = useState();
  const [aboutTeamLoading, setAboutTeamLoading] = useState(true);
  const getAboutTeamData = async (page) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/about/team`
      );
      setAboutTeamData(response.data.team);
      setAboutTeamLoading(false);
    } catch (error) {
      console.log("Error fetching:", error);
      setAboutTeamLoading(false);
    }
  };
  useEffect(() => {
    if (aboutTeamLoading) {
      getAboutTeamData();
    }
  }, [aboutTeamLoading]);

  return (
    <>
    
      <>
      {aboutTeamData && aboutTeamData?.length > 0 && (
      <div className="first_heading center_heading ">
        <h2 className="first_title about_team_size">
          <span className="underline-part">Team</span> Members
        </h2>
      </div>)}

      <div className="about_team">
        {aboutTeamData &&
          aboutTeamData.map((team, index) => {
            return (
              <>
                <div key={index} className="team_box">
                  <div className="">
                  <img
                  className='team-image'
                    src={
                      team && `${process.env.REACT_APP_IMAGE_URL}/${team.image}`
                      
                    }
                    // style={{width:'100%',height:'200px'}}
                  />
                  </div>
                  <div className="team_box_text">
                    <p className="team_box_heading">{team.title}</p>
                    <p className="team_box_designation">{team.designation}</p>
                  </div>
                </div>
              </>
            );
          })}
      </div>
      </>
    </>
  );
};

export default AboutTeam;
