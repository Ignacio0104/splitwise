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
    type: "shopping",
    name: "Compras Agosto",
    active: false,
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
        reportId: "123412131",
      },
      {
        contributions: [],
        name: "Anto",
        reportId: "1234666",
      },
      // {
      //   contributions: [],
      //   name: "Nacho",
      //   reportId: "123433",
      // },
      // {
      //   contributions: [],
      //   name: "Anto",
      //   reportId: "1234222",
      // },
      // {
      //   contributions: [],
      //   name: "Nacho",
      //   reportId: "123411",
      // },
      // {
      //   contributions: [],
      //   name: "Anto",
      //   reportId: "12346",
      // },
      // {
      //   contributions: [],
      //   name: "Nacho",
      //   reportId: "12345",
      // },
    ],
  },
  {
    id: "1234",
    type: "household",
    name: "Gastos Septiembre",
    active: true,
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
    id: "122",
    type: "party",
    name: "Cumpleaños Anto",
    active: false,
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
    id: "123456",
    type: "dinner",
    name: "Cena Kiddos",
    active: true,
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
    id: "123",
    type: "trip",
    name: "Viaje a Europa",
    active: true,
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
    id: "111",
    type: "other",
    name: "Flores",
    active: false,
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
