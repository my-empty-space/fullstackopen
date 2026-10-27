import axios from "axios";
const API = "/api/persons";

const getAll = () => {
  const req = axios.get(API);
  return req.then((res) => res.data);
};

const create = (newPerson) => {
  const req = axios.post(API, newPerson);
  return req.then((res) => res.data);
};

const update = (id, updatedPerson) => {
  const req = axios.put(`${API}/${id}`, updatedPerson);
  return req.then((res) => res.data);
};

const deleteOne = (id) => {
  const req = axios.delete(`${API}/${id}`);
  return req.then((res) => res.data);
};

export default { getAll, create, update, deleteOne };
