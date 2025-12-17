import { create } from "zustand";

type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  avatar: string | null;
  updatedAt?: string;
  createdAt?: string;
};

interface AuthState {
  authUser: User | null;
  setAuthUser: (user: User) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  authUser: null,
  setAuthUser: (user: User) => {
    set({ authUser: user });
  },
}));

export default useAuthStore;
