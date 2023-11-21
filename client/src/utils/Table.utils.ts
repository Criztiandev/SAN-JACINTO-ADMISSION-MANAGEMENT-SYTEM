import { toast } from "react-toastify";

export const handleAccept = (id: string) => {
  toast.success(`Applicant is Accepted Successfully ${id}`);
};

export const handleDelete = (id: string) => {
  toast.success(`${id} is successfully Deleted`);
};

export const handleUpdate = (id: string, status: string) => {
  toast.success(`${id} is successfully updated to ${status}`);
};

export const handleEdit = (id: string) => {
  toast.success(`${id} is successfully edited`);
};
