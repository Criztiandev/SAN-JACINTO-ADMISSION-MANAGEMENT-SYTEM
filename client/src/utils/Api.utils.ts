import axios from "axios";

export const fetchAllData = async (path: string) => {
  const { data } = await axios.get(`http://localhost:4000/api/${path}`);
  return data;
};

export const fetchDataByID = async (UID: string | number, path: string) =>
  await axios.get(`http://localhost:4000/api/${path}/${UID}`);

export const updateDataByID = async (
  UID: string | number,
  path: string,
  payload: object
) => await axios.put(`http://localhost:4000/api/${path}/${UID}`, payload);

export const deleteDataByID = async (UID: string | number, path: string) =>
  await axios.delete(`http://localhost:4000/api/${path}/${UID}`);

export const createData = async (path: string, payload: object) =>
  await axios.post(`http://localhost:4000/api/${path}`, payload);
