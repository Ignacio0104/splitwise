import { create } from "zustand";
import { UserStore } from "../models/loginModel";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { auth } from "../../../firebaseConfig";

const userAuthStore = create<{
  user: UserStore | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  getAuthState: () => Promise<void>;
}>((set) => ({
  user: null,
  loading: true,
  error: null,

  getAuthState: async () => {
    set({ loading: true });
    onAuthStateChanged(auth, (user) => {
      if (user) {
        set({
          user: {
            email: auth.currentUser?.email || "",
            id: auth.currentUser?.uid || "",
          },
          loading: false,
        });
      }
    });
    set({ loading: false });
  },

  login: async (email: string, password: string) => {
    try {
      set({ loading: true });
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      set({
        user: {
          email: userCredential.user.email || "",
          id: userCredential.user.uid,
        },
        loading: false,
      });
    } catch (error) {
      set({ error: "Error", loading: false });
    }
  },

  logout: async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      set({ user: null });
    } catch (error) {
      set({ error: "" });
    }
  },

  // updateProfile: async ()=>{
  //   try {
  //     await updateProfile()
  //     set({ user: null });
  //   } catch (error) {
  //     set({ error: "" });
  //   }
  // }
}));

export default userAuthStore;
