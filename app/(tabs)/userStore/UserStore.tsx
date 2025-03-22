import { create } from "zustand";
import { firestore } from "../../../firebaseConfig";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

const userDataStore = create<{
  data: any[];
  loading: boolean;
  error: string | null;
  fetchData: (id: string) => Promise<void>;
  saveData: (email: string) => Promise<void>;
}>((set) => ({
  data: [],
  loading: false,
  error: null,

  fetchData: async (id: string) => {
    try {
      set({ loading: true });

      // Obtener el documento de Firestore por ID
      const docRef = doc(firestore, "users", id); // "users" es la colección y id es el documento
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // Si el documento existe, actualiza el estado con los datos
        set({ data: [docSnap.data()], loading: false, error: null });
      } else {
        set({ error: "No such document!", loading: false });
      }
    } catch (error) {
      set({ error: "error", loading: false });
    }
  },

  saveData: async (email: string) => {
    try {
      set({ loading: true });

      const docRef = doc(firestore, "users", email);
      await setDoc(docRef, { email });

      set({ loading: false, error: null });
    } catch (error) {
      set({ error: "Error", loading: false });
    }
  },
}));

export default userDataStore;
