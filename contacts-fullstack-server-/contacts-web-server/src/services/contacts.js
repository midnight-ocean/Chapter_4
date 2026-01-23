import axios from "axios";

const base_URL = "/api/contacts";

const getContacts = () => {
    return axios.get(base_URL).then((res) => res.data)
}

const addContacts = (contact) => {
    return axios.post(base_URL, contact).then((res) => res.data)
}

const updateContacts = (contact) => {
    return axios.put(`${base_URL}/${contact.id}`, contact).then((res) => res.data);
}

const removeContacts = (contact) => {
    return axios.delete(`${base_URL}/${contact.id}`);
}

export default { getContacts, addContacts, updateContacts, removeContacts };