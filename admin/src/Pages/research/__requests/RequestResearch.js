import { ApiFetchReq } from "../../../api/ApiRequest"

// user Request
// http://localhost:8888/user?page=1
export const getResearchToConnectReq = async () => {
  return await ApiFetchReq('GET', `https://web.bluesurge.com.pk/rd`)
} 
export const postResearchReq = async (data) => {
  return await ApiFetchReq('POST', `https://web.bluesurge.com.pk/rd`, data)
}
