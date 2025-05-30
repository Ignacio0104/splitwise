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
  name: string;
  type: string;
  active: boolean;
  users: ReportUserData[];
  total?: number;
}

export interface ReportUserData {
  reportId: string;
  name: string;
  contributions: Contributions[];
  percentage: number;
}

export interface Contributions {
  userId: string;
  name: string;
  description?: string;
  amount: number;
  date: Datetime | string;
  receiptPhotoUrl?: string;
}
