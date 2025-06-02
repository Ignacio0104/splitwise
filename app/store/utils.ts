import { firestore } from "@/firebaseConfig";
import {
  collection,
  documentId,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import {
  Friend,
  MainStoreModel,
  Report,
  ReportUserData,
  UserDataResponse,
} from "./storeModels";
import store from "./mainStore";

export async function fetchReportsInformation(reportsIds: string[]) {
  const batchSize = 10; //Max amount of id to get in one call

  const reportsConnectionRef = collection(firestore, "reports");

  const reportsWithData: Report[] = [];

  for (let i = 0; i < reportsIds.length; i += batchSize) {
    const batchIds = reportsIds.slice(i, i + batchSize);
    const reportQuery = query(
      reportsConnectionRef,
      where(documentId(), "in", batchIds)
    );

    const reportQuerySnapshot = await getDocs(reportQuery);
    reportQuerySnapshot.forEach((reportDoc) => {
      reportsWithData.push({
        ...(reportDoc.data() as Report),
        id: reportDoc.id,
      });
    });
  }

  return reportsWithData;
}

export async function fetchFriendsInformation(friendsIds: string[]) {
  const batchSize = 10; //Max amount of id to get in one call

  const userConnectionRef = collection(firestore, "users");

  const friendsWithData: Friend[] = [];

  for (let i = 0; i < friendsIds.length; i += batchSize) {
    const batchIds = friendsIds.slice(i, i + batchSize);
    const reportQuery = query(
      userConnectionRef,
      where(documentId(), "in", batchIds)
    );

    const friendsQuerySnapshot = await getDocs(reportQuery);
    friendsQuerySnapshot.forEach((friendDoc) => {
      const data = friendDoc.data() as UserDataResponse;
      friendsWithData.push({
        name: data.name,
        lastname: data.lastname,
        userId: friendDoc.id,
        photoUrl: data.photoUrl,
      });
    });
  }

  return friendsWithData;
}

export function getReportWithFriendsData(report: Report, friends: Friend[]) {
  const reportData = { ...report };

  if (reportData) {
    const updatedReportData: Report = {
      ...reportData,
      users: reportData.users.map((user) => {
        console.log(user);
        console.log(friends);
        if ((!user.name || !user.lastname) && (user as ReportUserData).userId) {
          const foundFriend = friends.find(
            (friend) => friend.userId === (user as ReportUserData).userId
          );
          return {
            ...user,
            name: foundFriend?.name ?? "",
            lastname: foundFriend?.lastname ?? "",
          };
        }
        return user;
      }),
    };

    return updatedReportData;
  }

  return report;
}
