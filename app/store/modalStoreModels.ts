import { Contribution, Friend } from './storeModels';

export interface ContributioModalStoreModel {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  setModalInformation: (value: ContributionModalObject) => void;
  modalInformation?: ContributionModalObject;
}

export interface ContributionModalObject {
  name: string;
  lastname: string;
  photoUrl?: string;
  contributionData: Contribution;
}

export interface SelectUserModalStoreModel {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  setModalInformation: (value: UserList) => void;
  modalInformation?: UserList;
}

export interface UserList {
  users: Friend[];
}
