import { ApiFetchReq } from "../../../api/ApiRequest";

export const getMetaTagsReq = async () => {
  return await ApiFetchReq("GET", `${process.env.REACT_APP_BASE_URL}/metatags`);
};
 
export const postMetaTagsReq = async (data) => {
  return await ApiFetchReq(
    "POST",
    `${process.env.REACT_APP_BASE_URL}/metatags`,
    data
  );
};