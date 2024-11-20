import axios from "axios";
import { useEffect, useState } from "react";
import img2 from "../../assets/imgs/contactImgs/contactcardimg.png";
import img1 from "../../assets/imgs/contactImgs/fill.png";
import locationimg from "../../assets/imgs/contactImgs/locationimg.png";
const ContactAddressCard = () => {
  const [contactData, setContactData] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  const getContactsData = async () => {
    try {
      setDataLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/contact/address`
      );
      setContactData(response.data.address);
      setDataLoading(false);
    } catch (error) {
      console.log("Error fetching: ", error);
      setDataLoading(false);
    }
  };

  useEffect(() => {
    if (dataLoading) {
      getContactsData();
    }
  }, [dataLoading]);
  return (
    <div className="contact_address">
      {contactData.map((address, key) => (
        // <div className="image-container">
        //   <div className="background-wrapper">
        //     <img
        //       className="background-image"
        //       src={img1}
        //       alt="Background"
        //       style={{ minHeight: "215px", width: "260px" }}
        //     />
        //   </div>
        //   <img src={img2} alt="Overlay" className="overlay-image" />
        //   <img
        //     src={locationimg}
        //     style={{ width: "80px", height: "75px" }}
        //     alt="Overlay"
        //     className="overlay-image2"
        //   />
        //   <h2 className="overlay-heading overlay-text">{address.name}</h2>
        //   <p className="overlay-para-text overlay-para">
        //     {address.street} {address.city} {address.state} {address.country}{" "}
        //     {address.zipCode}
        //   </p>
        // </div>

        <div className="image-container">
          <div className="background-wrapper">
            <img
              className="background-image"
              src={img1}
              alt="Background"
              style={{ minHeight: "235px", width: "100%" }}
            />
          </div>
          <img src={img2} alt="Overlay" className="overlay-image"/>
          <img
            src={locationimg}
            style={{ width: "80px", height: "75px" }}
            alt="Overlay"
            className="overlay-image2"
          />
          <h2 className="overlay-heading overlay-text">{address.name}</h2>
          <p className="overlay-para-text overlay-para">
            {address.street} {address.city} {address.state} {address.country}{" "}
            {address.zipCode}
          </p>
        </div>
      ))}
    </div>
  );
};

export { ContactAddressCard };

