import axios from "axios";
const baseURL = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(baseURL);
};

const create = (newObject) => {
  return axios.post(baseURL, newObject);
};

const update = (id, newObject) => {
  return axios.put(`${baseURL}/${id}`, newObject);
};

const Delete = (id) => {
  const request = axios.delete(`${baseURL}/${id}`);
  return request.then(response => response.data)
};

export default { getAll, create, update, Delete };

