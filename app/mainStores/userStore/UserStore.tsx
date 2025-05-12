import { create } from "zustand";
import { firestore } from "../../../firebaseConfig";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { UserData } from "./userStoreModels";
import { mockUserData } from "./userMocks/userMockResponses";

const userDataStore = create<{
  userData: UserData | null;
  loading: boolean;
  error: string | null;
  fetchData: (id: string) => Promise<void>;
  saveData: (email: string) => Promise<void>;
  fetchReports: (reportsIds: string[]) => Promise<Report[]>;
}>((set) => ({
  userData: null,
  loading: true,
  error: null,

  fetchData: async (id: string) => {
    try {
      set({ loading: true });

      set({
        userData: { ...mockUserData, uid: id },
        loading: false,
        error: null,
      });

      // // Obtener el documento de Firestore por ID
      // const docRef = doc(firestore, "users", id); // "users" es la colección y id es el documento
      // const docSnap = await getDoc(docRef);

      // if (docSnap.exists()) {
      //   //const documentData = mockFetchData();
      //   const documentData = docSnap.data() as UserData;

      //   //TODO: Hacer fetch de todos los reports en base al ID
      //   const reportsDB: Report[] = await userDataStore
      //     .getState()
      //     .fetchReports(documentData.reportsIds);

      //   set({
      //     userData: { ...documentData, uid: id },
      //     loading: false,
      //     error: null,
      //   });
      // } else {
      //   set({ error: "No such document!", loading: false });
      // }
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

  fetchReports: async (reportsIds: string[]) => {
    try {
      const reportsDB: Report[] = await Promise.all(
        (reportsIds || []).map(async (reportId) => {
          const docRef = doc(firestore, "reports", reportId); // "users" es la colección y id es el documento
          const reportSnap = await getDoc(docRef);
          const reportData = reportSnap.data();
          return reportData as Report;
        })
      );
      set({ loading: false, error: null });
      return reportsDB;
    } catch (error) {
      set({ error: "Error", loading: false });
    }
    return [];
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
    reportsIds: ["aNYwxcb08jECDlkxnUmu"],
    reports: [],
  };
}
