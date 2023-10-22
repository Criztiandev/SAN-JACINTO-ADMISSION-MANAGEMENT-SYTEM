import axios from "axios";

export const createApplicant = async data => {
  const res = await axios.post(
    "http://localhost:4000/api/applicant/create",
    data
  );
  return res.data;
};
export const fetchApplicants = async () => {
  const result = await axios.get("http://localhost:4000/api/applicant");
  return result.data;
};
export const updateApplicants = () => {};
export const deleteApplicants = () => {};
