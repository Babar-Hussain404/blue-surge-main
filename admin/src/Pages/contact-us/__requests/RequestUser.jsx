import { ApiFetchReq } from "../../../api/ApiRequest"

export const getContactReq = async (page) => {
  return await ApiFetchReq('GET', `https://web.bluesurge.com.pk/contact?page=${page}`)
}
export const getSingleContactReq = async (id) => {
  return await ApiFetchReq('GET', `https://web.bluesurge.com.pk/contact/${id}`)
}  

export const deleteMessageReq = async (id) => {
  console.log("idL : ", id);
  return await ApiFetchReq('DELETE', `https://web.bluesurge.com.pk/contact/${id}`)
}


//contact-address

//get
export const getContactAddressReq = async (page) => {
  return await ApiFetchReq('GET', `https://web.bluesurge.com.pk/contact/address?page=${page}`)
}

//delete
export const deleteContactAddressReq = async (id) => {
  return await ApiFetchReq('DELETE', `https://web.bluesurge.com.pk/contact/address/${id}`)
}

//post Address
export const postContactAddressReq = async (data) => {
  return await ApiFetchReq(
    "POST",
    `https://web.bluesurge.com.pk/contact/address`,
    data
  );
};

export const putContactAddressReq = async (id,data) => {
  return await ApiFetchReq(
    "PUT",
    `https://web.bluesurge.com.pk/contact/address/${id}`,
    data
  );
};

//single Address
export const getSingleAddressReq = async (id) => {
  return await ApiFetchReq('GET', `https://web.bluesurge.com.pk/contact/address/${id}`)
}  
