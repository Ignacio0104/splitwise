import { create } from 'zustand';
import { Contribution, Friend, MainStoreModel, Report, UserData, UserDataResponse } from './storeModels';
import { collection, doc, documentId, getDoc, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '@/firebaseConfig';
import {
  fetchContributionsInformation,
  fetchFriendsInformation,
  fetchReportsInformation,
  getReportWithFriendsData,
} from './utils';
import { mockUserData } from './mocks/mockResponses';

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

      set({
        userData: { ...mockUserData },
        loading: false,
        friends: [...mockUserData.friends],
        error: null,
      });

      // //Obtener el documento de Firestore por ID
      // const docRef = doc(firestore, "users", id); // "users" es la colección y id es el documento
      // const docSnap = await getDoc(docRef);

      // if (docSnap.exists()) {
      //   //const documentData = mockFetchData();
      //   const documentData = docSnap.data() as UserDataResponse;

      //   const parsedUserData: UserData = {
      //     ...documentData,
      //     uid: id,
      //     friends: [],
      //     reports: [],
      //   };

      //   parsedUserData.reports = await fetchReportsInformation(
      //     parsedUserData.reportsIds
      //   );

      //   parsedUserData.friends = await fetchFriendsInformation(
      //     parsedUserData.friendsIds
      //   );

      //   if (parsedUserData.reports) {
      //     const reportPromises = parsedUserData.reports.map((report) =>
      //       getReportWithFriendsData({ ...parsedUserData }, report, [
      //         ...parsedUserData.friends,
      //       ])
      //     );

      //     parsedUserData.reports = await Promise.all(reportPromises);
      //   }

      //   set({
      //     userData: { ...parsedUserData },
      //     loading: false,
      //     error: null,
      //   });
      // } else {
      //   set({ error: "No such document!", loading: false });
      // }
    } catch (error) {
      set({ error: 'error', loading: false });
    }
  },

  getReportById: (reportId: string) => {
    const reports: Report[] = store.getState().userData?.reports || [];

    return reports.find((report) => report.id === reportId);
  },

  getUserInformation: (userId: string): Friend | undefined => {
    const { friends, userData } = store.getState();
    let foundUser;
    if (userId === userData?.uid) {
      foundUser = {
        name: userData.name,
        lastname: userData.lastname,
        userId: userData.uid,
        photoUrl: userData.photoUrl,
      };
    } else {
      foundUser = friends.find((friend) => friend.userId === userId);
    }
    return foundUser;
  },
}));

export default store;
