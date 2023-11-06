/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { loginCredentialsParams } from "../interface/Auth.Types";

const baseURL = import.meta.env.VITE_SERVER_URL;

export const loginAdmin = async (credentials: loginCredentialsParams) => {
  return axios.post(`${baseURL}/auth/login`, credentials);
};
