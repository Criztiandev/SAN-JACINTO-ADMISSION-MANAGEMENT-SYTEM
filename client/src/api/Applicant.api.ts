import axios from "axios";
import { ApplicantModelProps } from "../interface/ApplicantMode.Type";

const BASE_URL = "http://localhost:4000/api";

export const createApplicant = async (data: ApplicantModelProps) => {
  const res = await axios.post(`${BASE_URL}/applicant/create`, data);
  return res.data;
};
export const fetchApplicants = async () => {
  return await axios.get(`${BASE_URL}/applicant`);
};

export const fetchApplicantByID = async (id: string) => {
  const res = await axios.get(`${BASE_URL}/applicant/${id}`);
  return res.data;
};
