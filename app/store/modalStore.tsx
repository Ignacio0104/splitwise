import { create } from 'zustand';
import { ModalInformationObject, ModalStoreModel } from './modalStoreModels';

const modalStore = create<ModalStoreModel>((set) => ({
  //Default values
  showModal: false,
  modalInformation: {
    contributionData: {
      id: '1234',
      reportId: 'KwV07xt8yzkHZf58G5nk',
      amount: 50000,
      receiptPhotoUrl: 'https://www.docuclipper.com/wp-content/uploads/Receipt-Example-1018x1440.jpg',
      description: 'Test contribution',
      date: '2025-10-10T09:00:00-03:00',
      userId: 'lIFIUWmdefPH53nFLq1KUSukNkV2',
    },
    lastname: 'Smirlian',
    name: 'Nacho',
    photoUrl: 'https://i.pinimg.com/736x/f6/aa/24/f6aa2407d3ca6532e0304d6cd0e9291d.jpg',
  },

  setModalInformation: (value: ModalInformationObject) => {
    set({
      modalInformation: value,
    });
  },

  setShowModal: (value: boolean) => {
    set({
      showModal: value,
    });
  },

  set,
}));

export default modalStore;
