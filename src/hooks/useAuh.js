import { create } from "zustand";

const useAUthStore = create((set) => ({
  fullName: "nnnn",
  role: "",
  id: "",
  locationId: "",
  setFullName: (name) => set({ fullName: name }),
  setRole: (userRole) => set({ role: userRole }),
  setId: (userId) => set({ id: userId }),
  setLocationId: (id) => set({ locationId: id }),
  logout: () => set({ role: "" }),
}));

export default useAUthStore;
