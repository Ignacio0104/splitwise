import Datetime from "luxon";

export interface UserData {
  uid: string;
  name: string;
  lastname: string;
  photoUrl?: string;
  reportsIds: string[];
  reports: Report[];
  friendsIds: string[];
}

export interface Report {
  id: string;
  users: ReportUserData[];
}

export interface ReportUserData {
  reportId: string;
  name: string;
  contributions: Contributions[];
}

export interface Contributions {
  name: string;
  description?: string;
  amount: number;
  date: Datetime | string;
  receiptPhotoUrl?: string;
}

export interface UserPercentage {
  name: string;
  percentage: number;
}
