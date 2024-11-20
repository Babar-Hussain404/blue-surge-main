import { ApiFetchReq } from "../../../api/ApiRequest"

// user Request
// http://localhost:8888/user?page=1
export const getResearchToConnectReq = async () => {
  return await ApiFetchReq('GET', `${process.env.REACT_APP_BASE_URL}/rd`)
} 
export const postResearchReq = async (data) => {
  return await ApiFetchReq('POST', `${process.env.REACT_APP_BASE_URL}/rd`, data)
}
