import { create } from "zustand";

const useTableStore = create(set => ({
  data: null,
  search: "",
  filter: "",
  rowSelected: null,

  setFilter: (filter: string) => set({ filter }),
  setSearch: (search: string) => set({ search }),
  setRowSelected: (rowSelected: string) => set({ rowSelected }),
}));

export default useTableStore;
