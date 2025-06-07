import { create } from "zustand";
import {
  Contribution,
  MainStoreModel,
  Report,
  UserData,
  UserDataResponse,
} from "./storeModels";
import {
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { firestore } from "@/firebaseConfig";
import {
  fetchContributionsInformation,
  fetchFriendsInformation,
  fetchReportsInformation,
  getReportWithFriendsData,
} from "./utils";

const store = create<MainStoreModel>((set) => ({
  //Default values
  userData: null,
  loading: false,
  error: null,
  friends: [],

  //Methods
  fetchData: async (id: string) => {
    try {
      set({ loading: true });
      // Obtener el documento de Firestore por ID
      const docRef = doc(firestore, "users", id); // "users" es la colección y id es el documento
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        //const documentData = mockFetchData();
        const documentData = docSnap.data() as UserDataResponse;

        const parsedUserData: UserData = {
          ...documentData,
          uid: id,
          friends: [],
          reports: [],
        };

        parsedUserData.reports = await fetchReportsInformation(
          parsedUserData.reportsIds
        );

        parsedUserData.friends = await fetchFriendsInformation(
          parsedUserData.friendsIds
        );

        if (parsedUserData.reports) {
          const reportPromises = parsedUserData.reports.map((report) =>
            getReportWithFriendsData({ ...parsedUserData }, report, [
              ...parsedUserData.friends,
            ])
          );

          parsedUserData.reports = await Promise.all(reportPromises);
        }

        console.log(parsedUserData.reports);
        set({
          userData: { ...parsedUserData },
          loading: false,
          error: null,
        });
      } else {
        set({ error: "No such document!", loading: false });
      }

      //   set({
      //     userData: { ...mockUserData, uid: id },
      //     loading: false,
      //     error: null,
      //   });

      //   userDataStore.getState().fetchReports(["12234"]);
    } catch (error) {
      set({ error: "error", loading: false });
    }
  },

  getReportById: (reportId: string) => {
    const reports: Report[] = store.getState().userData?.reports || [];

    return reports.find((report) => report.id === reportId);
  },
}));

export default store;
