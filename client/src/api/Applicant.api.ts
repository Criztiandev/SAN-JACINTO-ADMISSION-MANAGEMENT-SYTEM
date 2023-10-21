import axios from "axios";
import { toast } from "react-toastify";

export const createApplicant = async () => {};
export const fetchApplicants = async () => {
  const result = await axios.get("http://localhost:4000/api/applicant");
  return result.data;
};
export const updateApplicants = () => {};
export const deleteApplicants = () => {};
