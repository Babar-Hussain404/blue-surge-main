import { ApiFetchReq } from "../../../api/ApiRequest"

// user Request
// http://localhost:8888/user?page=1
export const getUserToConnectReq = async () => {
  return await ApiFetchReq('GET', `${process.env.REACT_APP_BASE_URL}/user`)
}
export const getSingleUserReq = async (id) => {
  return await ApiFetchReq('GET', `${process.env.REACT_APP_BASE_URL}/user/${id}`)
} 

export const updateUserReq = async (id, data) => {
  return await ApiFetchReq('PUT', `${process.env.REACT_APP_BASE_URL}/user/update/${id}`, data)
}
export const postUserReq = async (data) => {
  return await ApiFetchReq('POST', `${process.env.REACT_APP_BASE_URL}/user`, data)
}

export const deleteUserReq = async (user_id) => {
  return await ApiFetchReq('DELETE', `${process.env.REACT_APP_BASE_URL}/user/${user_id}`)
}

 
// http://localhost:5000/social/contacts/add/:user_id/:created_by
export const postFollowPersonReq = async (user_id, created_by) => {
  return await ApiFetchReq('POST', `${process.env.REACT_APP_BASE_URL}/social/contacts/add/${user_id}/${created_by}`)
}