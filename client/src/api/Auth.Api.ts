/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from "axios";
import { loginCredentialsParams } from "../interface/Auth.Types";
import { toast } from "react-toastify";

const baseURL = import.meta.env.VITE_SERVER_URL;

export const loginAdmin = async (credentials: loginCredentialsParams) => {
  return axios.post(`${baseURL}/auth/login`, credentials);
};

export const fetchAdminById = async (UID: string) => {
  try {
    const { data } = await axios.get(`${baseURL}/admin/${UID}`);
    return data;
  } catch (error: AxiosError | any) {
    if (!error.response) {
      toast.error("Something went wrong, Please try again later");
    }
    const { message } = error.response.data as { message: string };
    toast.error(message);
    return message;
  }
};
