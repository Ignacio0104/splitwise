import { firestore } from "@/firebaseConfig";
import {
  collection,
  documentId,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import {
  Contribution,
  Friend,
  MainStoreModel,
  Report,
  ReportUserData,
  UserData,
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

export async function fetchContributionsInformation(contributionIds: string[]) {
  const batchSize = 10; //Max amount of id to get in one call

  const userConnectionRef = collection(firestore, "contributions");

  const contributions: Contribution[] = [];

  for (let i = 0; i < contributionIds.length; i += batchSize) {
    const batchIds = contributionIds.slice(i, i + batchSize);
    const reportQuery = query(
      userConnectionRef,
      where(documentId(), "in", batchIds)
    );

    const contributionsQuerySnapshot = await getDocs(reportQuery);
    contributionsQuerySnapshot.forEach((contributionDoc) => {
      const data = contributionDoc.data() as Contribution;

      contributions.push({
        ...data,
      });
    });
  }

  return contributions;
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

export async function getReportWithFriendsData(
  mainUser: UserData,
  report: Report,
  friends: Friend[]
) {
  const reportData = { ...report };

  if (reportData && reportData.users) {
    const updatedUsersPromises = reportData.users.map(async (user) => {
      if ((!user.name || !user.lastname) && (user as ReportUserData).userId) {
        if ((user as ReportUserData).userId === mainUser.uid) {
          const contributions = await fetchContributionsInformation(
            (user as ReportUserData).contributionsIds
          );

          return {
            ...(user as ReportUserData),
            name: mainUser.name,
            lastname: mainUser.lastname,
            contributions: contributions,
          } as ReportUserData;
        }

        const foundFriend = friends.find(
          (friend) => friend.userId === (user as ReportUserData).userId
        );

        const contributions = await fetchContributionsInformation(
          (user as ReportUserData).contributionsIds
        );

        return {
          ...(user as ReportUserData),
          name: foundFriend?.name ?? "",
          lastname: foundFriend?.lastname ?? "",
          photoUrl: foundFriend?.photoUrl,
          contributions: contributions,
        } as ReportUserData;
      }

      return user;
    });

    const updatedUsers = await Promise.all(updatedUsersPromises);

    const updatedReportData: Report = {
      ...reportData,
      users: updatedUsers,
    };

    return updatedReportData;
  }

  return report;
}
