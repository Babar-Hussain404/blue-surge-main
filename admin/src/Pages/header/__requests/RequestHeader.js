import { ApiFetchReq } from "../../../api/ApiRequest";

export const getHeaderToConnectReq = async () => {
  return await ApiFetchReq("GET", `${process.env.REACT_APP_BASE_URL}/header`);
};
export const getAboutTeamReq = async (page) => {
  return await ApiFetchReq(
    "GET",
    `${process.env.REACT_APP_BASE_URL}/about/team/pagination?page=${page}`
  );
};
export const postHeaderReq = async (data) => {
  return await ApiFetchReq(
    "POST",
    `${process.env.REACT_APP_BASE_URL}/header`,
    data
  );
};

export const postAboutTeamReq = async (data) => {
  return await ApiFetchReq(
    "POST",
    `${process.env.REACT_APP_BASE_URL}/about/team`,
    data
  );
};

export const deleteTeamReq = async (id) => {
  return await ApiFetchReq(
    "DELETE",
    `${process.env.REACT_APP_BASE_URL}/about/team/${id}`
  );
};

export const postAboutTeamMemberReq = async (id,data) => {
  return await ApiFetchReq(
    "PUT",
    `${process.env.REACT_APP_BASE_URL}/about/team/${id}`,
    data
  );
};