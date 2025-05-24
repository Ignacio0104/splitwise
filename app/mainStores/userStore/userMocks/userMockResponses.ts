import { UserData, Report } from "../userStoreModels";

export const mockUserData = {
  friendsIds: [],
  lastname: "Smirlian",
  name: "Nacho",
  reports: [],
  uid: "21341414",
  reportsIds: [],
  photoUrl: "",
} as UserData;

export const mockReports = [
  {
    id: "12345",
    type: "dinner",
    percentages: [
      {
        name: "Anto",
        percentage: 50,
      },
      {
        name: "Nacho",
        percentage: 50,
      },
    ],
    users: [
      {
        contributions: [],
        name: "Anto",
        reportId: "1234",
      },
      {
        contributions: [],
        name: "Nacho",
        reportId: "1234",
      },
    ],
  },
  {
    id: "1234",
    type: "household",
    percentages: [
      {
        name: "Anto",
        percentage: 50,
      },
      {
        name: "Nacho",
        percentage: 50,
      },
    ],
    users: [
      {
        contributions: [],
        name: "Anto",
        reportId: "1234",
      },
      {
        contributions: [],
        name: "Nacho",
        reportId: "1234",
      },
    ],
  },
] as Report[];
