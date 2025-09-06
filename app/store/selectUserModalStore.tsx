import { create } from 'zustand';
import { SelectionFriend, SelectUserModalStoreModel } from './modalStoreModels';

const selectUserModalStore = create<SelectUserModalStoreModel>((set) => ({
  //Default values
  showModal: true,
  modalInformation: [],
  setModalInformation: (value: SelectionFriend[]) => {
    set({
      modalInformation: value,
    });
  },

  setShowModal: (value: boolean) => {
    set({
      showModal: value,
    });
  },
}));

export default selectUserModalStore;
