import { ApiFetchReq } from "../../../api/ApiRequest";

export const getAboutToConnectReq = async () => {
  return await ApiFetchReq("GET", `https://web.bluesurge.com.pk/aboutus`);
};
export const getAboutTeamReq = async (page) => {
  return await ApiFetchReq(
    "GET",
    `https://web.bluesurge.com.pk/about/team/pagination?page=${page}`
  );
};
export const postAboutReq = async (data) => {
  return await ApiFetchReq(
    "POST",
    `https://web.bluesurge.com.pk/aboutus`,
    data
  );
};

export const postAboutTeamReq = async (data) => {
  return await ApiFetchReq(
    "POST",
    `https://web.bluesurge.com.pk/about/team`,
    data
  );
};

export const deleteTeamReq = async (id) => {
  return await ApiFetchReq(
    "DELETE",
    `https://web.bluesurge.com.pk/about/team/${id}`
  );
};

export const postAboutTeamMemberReq = async (id,data) => {
  return await ApiFetchReq(
    "PUT",
    `https://web.bluesurge.com.pk/about/team/${id}`,
    data
  );
};