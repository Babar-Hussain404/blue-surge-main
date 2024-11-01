import { ApiFetchReq } from "../../../api/ApiRequest";

export const getAboutToConnectReq = async (id) => {
  return await ApiFetchReq("GET", `https://web.bluesurge.com.pk/partners/${id}`);
};

export const getAboutTeamReq = async (page) => {
  return await ApiFetchReq(
    "GET",
    `https://web.bluesurge.com.pk/partners/pagination?page=${page}`
  );
};

export const postAboutTeamReq = async (data) => {
  return await ApiFetchReq(
    "POST",
    `https://web.bluesurge.com.pk/partners`,
    data
  );
};

export const deleteTeamReq = async (id) => {
  return await ApiFetchReq(
    "DELETE",
    `https://web.bluesurge.com.pk/partners/${id}`
  );
};

export const postAboutTeamMemberReq = async (id,data) => {
  return await ApiFetchReq(
    "PUT",
    `https://web.bluesurge.com.pk/partners/${id}`,
    data
  );
};