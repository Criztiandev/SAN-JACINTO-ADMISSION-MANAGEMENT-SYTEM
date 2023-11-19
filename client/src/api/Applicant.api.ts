/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from "axios";
import { ApplicantModelProps } from "../interface/ApplicantMode.Type";
import { toast } from "react-toastify";

const BASE_URL = "http://localhost:4000/api";

export const createApplicant = async (data: ApplicantModelProps) => {
  const res = await axios.post(`${BASE_URL}/applicant/create`, data);
  return res.data;
};
export const fetchApplicants = async () => {
  return await axios.get(`${BASE_URL}/applicant`);
};

export const fetchApplicantByID = async (id: string) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/applicant/${id}`);
    return data;
  } catch (e: AxiosError | any) {
    if (!e.response) {
      toast.error("Something went wrong");
      return;
    }
    const { message } = e.response.data;
    toast.error(message);
  }
};

export const updateApplicantByID = async (
  id: string | object,
  payload: Array<object> | object
) => {
  const { data } = await axios.put(`${BASE_URL}/applicant/${id}`, payload);
  return data;
};

export const updateStatusApplicant = async (id: string, status: string) => {
  const { data } = await axios.put(`${BASE_URL}/applicant/${id}`, {
    status: status?.toLowerCase(),
  });
  return data;
};

export const deleteApplicantByID = async (id: string) => {
  const { data } = await axios.delete(`${BASE_URL}/applicant/${id}`);
  return data;
};
