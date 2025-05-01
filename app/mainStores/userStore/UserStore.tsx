import { create } from "zustand";
import { firestore } from "../../../firebaseConfig";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { UserData } from "./userStoreModels";

const userDataStore = create<{
  userData: UserData | null;
  loading: boolean;
  error: string | null;
  fetchData: (id: string) => Promise<void>;
  saveData: (email: string) => Promise<void>;
}>((set) => ({
  userData: null,
  loading: true,
  error: null,

  fetchData: async (id: string) => {
    try {
      set({ loading: true });

      // Obtener el documento de Firestore por ID
      const docRef = doc(firestore, "users", id); // "users" es la colección y id es el documento
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        //const documentData = docSnap.data() as UserData;
        const documentData = mockFetchData();
        //TODO: Hacer fetch de todos los reports en base al ID
        set({
          userData: { ...documentData, uid: id },
          loading: false,
          error: null,
        });
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

export function mockFetchData(): UserData {
  return {
    uid: "234252552",
    friendsIds: [],
    lastname: "Smirlian",
    name: "Nacho",
    photoUrl:
      "https://postercity.com.ar/wp-content/uploads/2022/07/Darth-Vader-Illustration-Profile-60x80-1.jpg",
    reportsIds: [],
    reports: [],
  };
}
