import { Contribution } from './storeModels';

export interface ModalStoreModel {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  setModalInformation: (value: ModalInformationObject) => void;
  modalInformation?: ModalInformationObject;
}

export interface ModalInformationObject {
  name: string;
  lastname: string;
  photoUrl?: string;
  contributionData: Contribution;
}
