import { renderHTML } from "../../utility/Helper";

const IndustryDetailItem = ({ partnerData }) => {
  return (
    <div className={`industry_detail_body`}>
      <p className="industry_detail_body_items contactdetails">
        {/* {partnerData && formatText(partnerData.detail)} */}
        {
          <div
            dangerouslySetInnerHTML={renderHTML(
              partnerData && partnerData.detail
            )}
          />
        }
      </p>
      {partnerData &&
      (partnerData.address_street || partnerData.address_city,
      partnerData.address_state,
      partnerData.address_country ||
        partnerData.email ||
        partnerData.website) ? (
        <p className="industry_detail_body_item1 contactdetails bold_cls">
          Contact Details
        </p>
      ) : (
        <></>
      )}
      {partnerData &&
      (partnerData.address_street || partnerData.address_city,
      partnerData.address_state,
      partnerData.address_country) ? (
        <>
          <p className="industry_detail_body_item2 contactdetails bold_cls">
            Address:{" "}
          </p>
          <p className="industry_detail_body_item3 contactdetails">
            {" "}
            {partnerData && partnerData.address_street},{" "}
            {partnerData && partnerData.address_city},{" "}
            {partnerData && partnerData.address_state},{" "}
            {partnerData && partnerData.address_country}
          </p>
        </>
      ) : (
        <></>
      )}

      <p className="industry_detail_body_item4 contactdetails">
        {" "}
        {partnerData && partnerData.email ? (
          <span className="bold_cls">Email: </span>
        ) : (
          <></>
        )}{" "}
        {partnerData && partnerData.email}{" "}
      </p>
      <p className="industry_detail_body_item5 contactdetails">
        {" "}
        {partnerData && partnerData.website ? (
          <span className="bold_cls">Web: </span>
        ) : (
          <></>
        )}{" "}
        {partnerData && partnerData.website}{" "}
      </p>
    </div>
  );
};

export default IndustryDetailItem;
