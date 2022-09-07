import axios from "axios"

const baseURL = "https://631612625b85ba9b11eefeb9.mockapi.io/goit-react-hw-07-phonebook/"



function sendRequest(path, method="GET", body={}){

    const params = {
        method
    }

    if(method === "POST") {
        params.body = JSON.stringify(body)
    }
   
    return fetch(
        baseURL + path, 
        params
    )
    .then(res => res.json())
    .catch(err => err)
}

export const postDBContactAxios =  (path, body) => {
    console.log(body)
    return axios.post(baseURL + path, body);
  };

export function getDBContacts(){
    return sendRequest("contacts/")
}

export function deleteDBContact(id){
    return sendRequest(`contacts/${id}/`, "DELETE")
}

export function postDBContact(contact){
    return postDBContactAxios(`contacts/`, contact)
}