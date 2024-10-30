import { ApiFetchReq } from "../../../api/ApiRequest"

export const getContactReq = async (page) => {
  return await ApiFetchReq('GET', `${process.env.REACT_APP_BASE_URL}/contact?page=${page}`)
}
export const getSingleContactReq = async (id) => {
  return await ApiFetchReq('GET', `${process.env.REACT_APP_BASE_URL}/contact/${id}`)
}  

export const deleteMessageReq = async (id) => {
  console.log("idL : ", id);
  return await ApiFetchReq('DELETE', `${process.env.REACT_APP_BASE_URL}/contact/${id}`)
}


//contact-address

//get
export const getContactAddressReq = async (page) => {
  return await ApiFetchReq('GET', `${process.env.REACT_APP_BASE_URL}/contact/address?page=${page}`)
}

//delete
export const deleteContactAddressReq = async (id) => {
  return await ApiFetchReq('DELETE', `${process.env.REACT_APP_BASE_URL}/contact/address/${id}`)
}

//post Address
export const postContactAddressReq = async (data) => {
  return await ApiFetchReq(
    "POST",
    `${process.env.REACT_APP_BASE_URL}/contact/address`,
    data
  );
};

export const putContactAddressReq = async (id,data) => {
  return await ApiFetchReq(
    "PUT",
    `${process.env.REACT_APP_BASE_URL}/contact/address/${id}`,
    data
  );
};

//single Address
export const getSingleAddressReq = async (id) => {
  return await ApiFetchReq('GET', `${process.env.REACT_APP_BASE_URL}/contact/address/${id}`)
}  
