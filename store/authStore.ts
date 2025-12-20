import { create } from "zustand";

type User = {
  id: string;
  username: string;
  email: string;
  password?: string;
  avatar: string | null;
  sentMessages?: [];
  receivedMessages?: [];
  updatedAt?: string;
  createdAt?: string;
};

interface AuthState {
  authUser: User | null;
  setAuthUser: (user: User | null) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  authUser: null,
  setAuthUser: (user) => {
    set({ authUser: user });
  },
}));

export default useAuthStore;
