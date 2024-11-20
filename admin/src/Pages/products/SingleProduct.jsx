// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { getSingleProductReq } from "./__requests/RequestUser";

// const SingleProduct = ({ singleContactLoading, setSingleContactLoading }) => {
//   const singleContactState = useSelector((state) => state.singleContactReducer);
//   const [contactData, setContactData] = useState([]);
//   const getContactsData = async () => {
//     try {
//       setSingleContactLoading(true);
//       const response = await getSingleProductReq(singleContactState);
//       setContactData(response.data.product);
//       setSingleContactLoading(false);
//     } catch (error) {
//       toast.error("Whoops! something wrong");
//       setSingleContactLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (singleContactLoading) {
//       getContactsData();
//     }
//   }, [singleContactLoading]);

//   return (
//     <div
//       id="singleProduct-modal-terms"
//       className="modal"
//       tabIndex={-1}
//       role="dialog"
//       aria-hidden="true"
//     >
//       <div className="modal-dialog">
//         <div className="modal-content">
//           <div className="modal-header">
//             <button
//               type="button"
//               className="close"
//               data-dismiss="modal"
//               aria-hidden="true"
//             >
//               ×
//             </button>
//             <h4 className="modal-title">
//               <strong>Products Detail</strong>{" "}
//             </h4>
//           </div>
//           {singleContactLoading ? (
//             <div
//               style={{
//                 textAlign: "center",
//                 height: "30vh",
//                 width: "100%",
//               }}
//               className="modal-body"
//             >
//               <i className="fa fa-spinner fa-4x fa-spin"></i>
//             </div>
//           ) : (
//             <div className="modal-body">
//               <div className="contact_single_data">
//                 <h4 className="modal-title">
//                   <strong>Name:</strong>{" "}
//                 </h4>
//                 <h5>{contactData && contactData?.name}</h5>
//               </div>

//               <div className="contact_single_data">
//                 <h4 className="modal-title">
//                   <strong>Industry Name:</strong>{" "}
//                 </h4>
//                 <h5>{contactData && contactData?.industry_data[0]?.name}</h5>
//               </div>
//               <div className="contact_single_data">
//                 <h4 className="modal-title">
//                   <strong>Service Name:</strong>{" "}
//                 </h4>
//                 <h5>{contactData && contactData?.service_data[0]?.name}</h5>
//               </div>
//               <div className="contact_single_data">
//                 <h4 className="modal-title">
//                   <strong>Industry Email:</strong>{" "}
//                 </h4>
//                 <h5>{contactData && contactData?.industry_data[0]?.email}</h5>
//               </div>
//               <div className="contact_single_data">
//                 <h4 className="modal-title">
//                   <strong>Features: </strong>{" "}
//                 </h4>
//                 <h5>{contactData && contactData?.features?.length}</h5>
//               </div>

//               <div className="contact_single_data">
//                 <h4 className="modal-title">
//                   <strong>Detail:</strong>{" "}
//                 </h4>
//                 <h5>{contactData && contactData?.detail}</h5>
//               </div>
//               <div className="contact_single_data">
//                 <h4 className="modal-title">
//                   <strong>Video Description:</strong>{" "}
//                 </h4>
//                 <h5>{contactData && contactData?.video_description}</h5>
//               </div>

//               <div className="text-center ">
//                 <h4 className="modal-title">
//                   <strong>Thumbnail Image:</strong>{" "}
//                 </h4>
//                 <br />
//                 <img
//                   style={{ width: "400px" }}
//                   src={`${process.env.REACT_APP_IMAGE_URL}/${
//                     contactData && contactData?.thumbnailImage
//                   }`}
//                 />
//               </div>
//               <br />
//               <div className="text-center ">
//                 <h4 className="modal-title">
//                   <strong>Detail Image:</strong>{" "}
//                 </h4>
//                 <br />
//                 <img
//                   style={{ width: "200px" }}
//                   src={`${process.env.REACT_APP_IMAGE_URL}/${
//                     contactData && contactData?.detailImage
//                   }`}
//                 />
//               </div>
//               {contactData && contactData?.video && (
//                 <div className="text-center">
//                   <h4 className="modal-title">
//                     <strong>Product Video:</strong>{" "}
//                   </h4>
//                   <br />
//                   {contactData && contactData?.video && (
//                     <video controls style={{ maxWidth: "70%" }}>
//                       <source
//                         src={`${process.env.REACT_APP_IMAGE_URL}/${contactData?.video}`}
//                         type="video/mp4"
//                       />
//                       Your browser does not support the video tag.
//                     </video>
//                   )}
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SingleProduct;



import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getSingleProductReq } from "./__requests/RequestUser";

const SingleProduct = ({ singleContactLoading, setSingleContactLoading }) => {
  const singleContactState = useSelector((state) => state.singleContactReducer);
  const [contactData, setContactData] = useState({});
  
  const getContactsData = async () => {
    try {
      setSingleContactLoading(true);
      const response = await getSingleProductReq(singleContactState);
      setContactData(response.data.product || {});
      setSingleContactLoading(false);
    } catch (error) {
      toast.error("Whoops! something went wrong");
      setSingleContactLoading(false);
    }
  };

  useEffect(() => {
    if (singleContactLoading) {
      getContactsData();
    }
  }, [singleContactLoading]);

  return (
    <div
      id="singleProduct-modal-terms"
      className="modal"
      tabIndex={-1}
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-hidden="true"
            >
              ×
            </button>
            <h4 className="modal-title">
              <strong>Products Detail</strong>
            </h4>
          </div>
          {singleContactLoading ? (
            <div
              style={{
                textAlign: "center",
                height: "30vh",
                width: "100%",
              }}
              className="modal-body"
            >
              <i className="fa fa-spinner fa-4x fa-spin"></i>
            </div>
          ) : (
            <div className="modal-body">
              <div className="contact_single_data">
                <h4 className="modal-title">
                  <strong>Name:</strong>
                </h4>
                <h5>{contactData?.name || "N/A"}</h5>
              </div>

              <div className="contact_single_data">
                <h4 className="modal-title">
                  <strong>Industry Name:</strong>
                </h4>
                <h5>{contactData?.industry_data?.[0]?.name || "N/A"}</h5>
              </div>
              <div className="contact_single_data">
                <h4 className="modal-title">
                  <strong>Service Name:</strong>
                </h4>
                <h5>{contactData?.service_data?.[0]?.name || "N/A"}</h5>
              </div>
              <div className="contact_single_data">
                <h4 className="modal-title">
                  <strong>Industry Email:</strong>
                </h4>
                <h5>{contactData?.industry_data?.[0]?.email || "N/A"}</h5>
              </div>
              <div className="contact_single_data">
                <h4 className="modal-title">
                  <strong>Features:</strong>
                </h4>
                <h5>{contactData?.features?.length || 0}</h5>
              </div>

              <div className="contact_single_data">
                <h4 className="modal-title">
                  <strong>Detail:</strong>
                </h4>
                <h5>{contactData?.detail || "N/A"}</h5>
              </div>
              <div className="contact_single_data">
                <h4 className="modal-title">
                  <strong>Video Description:</strong>
                </h4>
                <h5>{contactData?.video_description || "N/A"}</h5>
              </div>

              <div className="text-center">
                <h4 className="modal-title">
                  <strong>Thumbnail Image:</strong>
                </h4>
                <br />
                {contactData?.thumbnailImage ? (
                  <img
                    style={{ width: "400px" }}
                    src={`${process.env.REACT_APP_IMAGE_URL}/${contactData.thumbnailImage}`}
                    alt="Thumbnail"
                  />
                ) : (
                  <p>No Thumbnail Image Available</p>
                )}
              </div>
              <br />
              <div className="text-center">
                <h4 className="modal-title">
                  <strong>Detail Image:</strong>
                </h4>
                <br />
                {contactData?.detailImage ? (
                  <img
                    style={{ width: "200px" }}
                    src={`${process.env.REACT_APP_IMAGE_URL}/${contactData.detailImage}`}
                    alt="Detail"
                  />
                ) : (
                  <p>No Detail Image Available</p>
                )}
              </div>
              {contactData?.video && (
                <div className="text-center">
                  <h4 className="modal-title">
                    <strong>Product Video:</strong>
                  </h4>
                  <br />
                  <video controls style={{ maxWidth: "70%" }}>
                    <source
                      src={`${process.env.REACT_APP_IMAGE_URL}/${contactData.video}`}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
