import { DateTime } from "luxon";
import { ReportType } from "./models";

export interface MainStoreModel {
  userData: UserData | null;
  loading: boolean;
  friends: Friend[];
  error: string | null;
  fetchData: (id: string) => Promise<void>;
  getReportById: (reportId: string) => Report | undefined;
}

export interface UserData {
  uid: string;
  name: string;
  lastname: string;
  photoUrl?: string;
  reportsIds: string[];
  reports: Report[];
  friendsIds: string[];
  friends: Friend[];
}

export interface UserDataResponse {
  uid: string;
  name: string;
  lastname: string;
  photoUrl?: string;
  reportsIds: string[];
  friendsIds: string[];
}

export interface Report {
  id: string;
  name: string;
  type: ReportType;
  active: boolean;
  users: ReportUserData[];
  total?: number;
}

export interface ReportUserData {
  userId: string;
  name: string;
  lastname: string;
  contributionsIds: string[];
  contributions: Contribution[];
  fixedPercentage?: number;
  photoUrl?: string;
}

export interface Contribution {
  id: string;
  userId: string;
  reportId: string;
  description?: string;
  amount: number;
  date: DateTime | string;
  receiptPhotoUrl?: string;
}

export interface Friend {
  userId: string;
  name: string;
  lastname: string;
  photoUrl?: string;
}
