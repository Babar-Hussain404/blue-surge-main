import { ApiFetchReq } from "../../../api/ApiRequest"

export const getIndustryReq = async (page) => {
  return await ApiFetchReq('GET', `https://web.bluesurge.com.pk/industry?page=${page}`)
}
export const getSingleIndustryReq = async (id) => {
  return await ApiFetchReq('GET', `https://web.bluesurge.com.pk/industry/${id}`)
}

export const geIndustryOptionsReq = async (id) => {
  return await ApiFetchReq('GET', `https://web.bluesurge.com.pk/industry/options`)
}

export const postIndustryReq = async (data) => {
  return await ApiFetchReq('POST', `https://web.bluesurge.com.pk/industry`, data)
}
export const putIndustryReq = async (id, data) => {
  return await ApiFetchReq('PUT', `https://web.bluesurge.com.pk/industry/${id}`, data)
}

export const deleteIndustryReq = async (id) => {
  return await ApiFetchReq('DELETE', `https://web.bluesurge.com.pk/industry/${id}`)
}

