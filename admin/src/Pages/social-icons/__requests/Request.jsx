import { ApiFetchReq } from "../../../api/ApiRequest";

export const getIconsReq = async () => {
  return await ApiFetchReq("GET", `${process.env.REACT_APP_BASE_URL}/icons`);
};
 
export const postIconsReq = async (data) => {
  return await ApiFetchReq(
    "POST",
    `${process.env.REACT_APP_BASE_URL}/icons`,
    data
  );
};