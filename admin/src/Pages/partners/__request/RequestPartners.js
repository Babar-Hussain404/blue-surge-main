import { ApiFetchReq } from "../../../api/ApiRequest";

export const getAboutToConnectReq = async (id) => {
  return await ApiFetchReq("GET", `${process.env.REACT_APP_BASE_URL}/partners/${id}`);
};

export const getAboutTeamReq = async (page) => {
  return await ApiFetchReq(
    "GET",
    `${process.env.REACT_APP_BASE_URL}/partners/pagination?page=${page}`
  );
};

export const postAboutTeamReq = async (data) => {
  return await ApiFetchReq(
    "POST",
    `${process.env.REACT_APP_BASE_URL}/partners`,
    data
  );
};

export const deleteTeamReq = async (id) => {
  return await ApiFetchReq(
    "DELETE",
    `${process.env.REACT_APP_BASE_URL}/partners/${id}`
  );
};

export const postAboutTeamMemberReq = async (id,data) => {
  return await ApiFetchReq(
    "PUT",
    `${process.env.REACT_APP_BASE_URL}/partners/${id}`,
    data
  );
};