import { ApiFetchReq } from "../../../api/ApiRequest"

export const getIndustryReq = async (page) => {
  return await ApiFetchReq('GET', `https://web.bluesurge.com.pk/service?page=${page}`)
}
export const getSingleServiceReq = async (id) => {
  return await ApiFetchReq('GET', `https://web.bluesurge.com.pk/service/${id}`)
}
export const getServiceOptionReq = async (id) => {
  return await ApiFetchReq('GET', `https://web.bluesurge.com.pk/service/option/${id}`)
}

export const postServiceReq = async (data) => {
  return await ApiFetchReq('POST', `https://web.bluesurge.com.pk/service`, data)
}

export const putServiceReq = async (id, data) => {
  return await ApiFetchReq('PUT', `https://web.bluesurge.com.pk/service/${id}`, data)
}

export const deleteIndustryReq = async (id) => {
  return await ApiFetchReq('DELETE', `https://web.bluesurge.com.pk/service/${id}`)
}