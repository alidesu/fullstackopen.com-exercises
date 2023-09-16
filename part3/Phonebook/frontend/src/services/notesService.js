import axios from "axios";
const baseURL = "/api/persons";

const getAll = () => {
  return axios.get(baseURL);
};

const create = (newObject) => {
  return axios.post(baseURL, newObject).then((response) => {
    console.log("Create response:", response.data); // Add this line
    return response.data;
  });
};

const update = (id, newObject) => {
  return axios.put(`${baseURL}/${id}`, newObject).then((response) => {
    console.log("Update response:", response.data); // Add this line
    return response.data;
  });
};

const Delete = (id) => {
  const request = axios.delete(`${baseURL}/${id}`);
  return request.then((response) => response.data);
};

export default { getAll, create, update, Delete };
