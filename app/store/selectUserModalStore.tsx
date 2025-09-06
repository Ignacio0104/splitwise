import { create } from 'zustand';
import { SelectUserModalStoreModel, UserList } from './modalStoreModels';

const selectUserModalStore = create<SelectUserModalStoreModel>((set) => ({
  //Default values
  showModal: false,
  modalInformation: {
    users: [],
  },

  setModalInformation: (value: UserList) => {
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

export default selectUserModalStore;
