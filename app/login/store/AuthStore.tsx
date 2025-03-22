import { create } from "zustand";
import { UserStore } from "../models/loginModel";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { auth } from "../../../firebaseConfig";

const useAuthStore = create<{
  user: UserStore | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
}>((set) => ({
  user: null,
  loading: false,
  error: null,

  login: async (email: string, password: string) => {
    try {
      set({ loading: true });
      console.log(auth);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log(userCredential);
    } catch (error) {
      set({ error: "Error", loading: false });
    }
  },

  logout: async () => {
    try {
      //   const auth = getAuth();
      //   await signOut(auth);
      set({ user: null });
    } catch (error) {
      set({ error: "" });
    }
  },
}));

export default useAuthStore;
