import { ApiFetchReq } from "../../../api/ApiRequest";

export const getMetaTagsReq = async () => {
  return await ApiFetchReq("GET", `https://web.bluesurge.com.pk/metatags`);
};
 
export const postMetaTagsReq = async (data) => {
  return await ApiFetchReq(
    "POST",
    `https://web.bluesurge.com.pk/metatags`,
    data
  );
};