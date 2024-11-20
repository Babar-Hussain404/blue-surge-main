import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
// import img3 from "../../assets/imgs/melt2.jpg";
import arrowImage from "../../assets/icons/arrowImage.png";
import Modal from "../utility/Modal";
import PaginationMain from "../utility/PaginationMain";
import { renderHTML } from "../utility/Helper";

const ProductCard2 = ({ service, totalPages, serviceLoading }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const handleShowModal = (card) => {
    setShowModal(true);
    setSelectedServiceId(card.detail);
  };

  const handleCloseModal = (card) => {
    setShowModal(false);
  };

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <div
          className="card-width"
          style={{
            width: "90%",
            margin: "0 auto",
            marginTop: "40px",
            marginBottom: "20px",
          }}
        >
          <div className="card_container">
            {serviceLoading ? (
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
            ) : service?.length === 0 ? (
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
            ) : (
              <>
                <div
                  className="card-padding"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    gap: "40px",
                    padding: "20px",
                  }}
                >
                  {service?.map((card) => {
                    return (
                      <>
                        <Link to={`/service-details/${card._id}`}>
                          <Card
                            className="service-card-size"
                            style={{
                              backgroundColor: "#137bf0",
                              borderRadius: "0",
                              width: "500px",
                              marginTop: "0",
                              border: "0",
                            }}
                          >
                            <Card.Img
                              variant="top"
                              src={`${process.env.REACT_APP_IMAGE_URL}/${
                                card && card.thumbnailImage
                              }`}
                              className="img_heightwidth"
                              style={{
                                backgroundColor: "#00183c",
                                width: "100%",
                                height: "250px",
                                objectFit: "cover",
                              }}
                            />
                            <Card.Body className="card_body">
                              <Card.Title
                                className="fontfamily text-margin"
                                style={{ fontSize: "2.5rem" }}
                              >
                                {card.name}
                              </Card.Title>
                              <Card.Text
                                className="cardtext"
                                style={{
                                  fontSize: "1.5rem",
                                  marginBottom: "1rem",
                                }}
                              >
                                <div
                                  dangerouslySetInnerHTML={renderHTML(
                                    card.detail.split(" ").slice(0, 35).join(" ")
                                  )}
                                />
                                {card?.detail.split(" ")?.length > 35 && (
                                  <Link
                                    to={`/service-details/${card._id}`}
                                    style={{
                                      color: "#137BF0",
                                      fontWeight: "bold",
                                      fontSize: "2rem",
                                    }}
                                    className="read-more-link"
                                  >
                                    Read more
                                  </Link>
                                )}
                              </Card.Text>
                              <Link
                                to={`/service-details/${card._id}`}
                                className="arrow-position"
                              >
                                <img src={arrowImage} />
                              </Link>
                            </Card.Body>
                          </Card>
                        </Link>
                      </>
                    );
                  })}
                </div>
              </>
            )}

            <Modal
              selectedServiceId={selectedServiceId}
              show={showModal}
              handleClose={handleCloseModal}
            />
          </div>
        </div>

        <div className="">
          <ul>
            <PaginationMain totalPages={totalPages} />
          </ul>
        </div>
      </div>
    </>
  );
};

export default ProductCard2;
