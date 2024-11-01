import { ApiFetchReq } from "../../../api/ApiRequest";

export const getIconsReq = async () => {
  return await ApiFetchReq("GET", `https://web.bluesurge.com.pk/icons`);
};
 
export const postIconsReq = async (data) => {
  return await ApiFetchReq(
    "POST",
    `https://web.bluesurge.com.pk/icons`,
    data
  );
};