import { create } from 'zustand';
import { ModalStoreModel } from './modalStoreModels';

const modalStore = create<ModalStoreModel>((set) => ({
  //Default values
  showModal: false,

  setShowModal: (value: boolean) => {
    set({
      showModal: value,
    });
  },
}));

export default modalStore;
