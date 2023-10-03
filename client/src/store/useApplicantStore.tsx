import { create } from "zustand";

interface ApplicantStoreState {
  search: string | number;
  filter: string | number;
  setSearch: (value: string | number) => void;
  setFilter: (value: string | number) => void;
}

const useApplicantStore = create<ApplicantStoreState>(set => ({
  search: "",
  filter: "",
  setSearch: value => set({ search: value }),
  setFilter: value => set({ filter: value }),
}));

export default useApplicantStore;
