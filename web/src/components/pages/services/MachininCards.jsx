import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import arrowImage from "../../../assets/icons/arrowImage.png";
import image4 from '../../../assets/imgs/servicesimgs/image4.png';
import image5 from '../../../assets/imgs/servicesimgs/image5.png';

const MachininCards = () => {
  const [card, setCard] = useState([
    {
      img: image4,
      title: "Sand Casting",
      Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pulvinar at leo venenatis tincidunt. Alidiam, ac molestie leo lacus ut mauris. Praesent ut sem non mauris feugiat finibus a in nibh."
    },
    {
      img: image5,
      title: "Sand Casting",
      Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pulvinar at leo venenatis tincidunt. Alidiam, ac molestie leo lacus ut mauris. Praesent ut sem non mauris feugiat finibus a in nibh."
    },

  ])
  return (
    <>
      <div style={{ textAlign: 'center', }}>
        <div
         className="card-width"
          style={{ width: "90%", margin: "0 auto", marginTop: "120px", marginBottom: "20px" }}
        >


          <div className="card_container">
            <div className="card_name">
              <span>Machining</span>
            </div>
            <div 
             className="card-padding"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: "40px", padding: "20px" }}>
              {
                card.map((card) => {
                  return (
                    <>
                      <Card
                      className="service-card-size card-padding"
                        style={{
                          backgroundColor: "#137bf0",
                          borderRadius: "0",
                          width: "550px",
                          marginTop: "0",
                          border: "0"
                        }}
                      >
                        <Card.Img
                          variant="top"
                          src={card.img}
                          className="card_img"
                          style={{
                            backgroundColor: "#00183c",
                            height: "250px",
                            objectFit: "cover",
                          }}
                        />
                        <Card.Body className="card_body" >
                          <Card.Title className="fontfamily text-margin" style={{ fontSize: "2.5rem" }}>
                            {card.title}
                          </Card.Title>
                          <Card.Text
                            className="cardtext text-margin"
                            style={{ fontSize: "1.5rem", marginBottom: "4rem" }}
                          >
                            {card.Description}
                          </Card.Text>
                          <div className="arrow-position">
                            <img src={arrowImage} />
                          </div>
                        </Card.Body>
                      </Card>
                    </>
                  )
                })
              }
            </div >
          </div>
        </div >
      </div >
    </>
  )
}

export default MachininCards
