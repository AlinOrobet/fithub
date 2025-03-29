import {create} from "zustand";

import {AUTH_TYPE} from "@/modules/auth/types";

type AuthModalState = {
  id?: AUTH_TYPE;
  isOpen: boolean;
  onOpen: (id: AUTH_TYPE) => void;
  onClose: VoidFunction;
};

export const useAuthModal = create<AuthModalState>((set) => ({
  id: undefined,
  isOpen: false,
  onOpen: (id: AUTH_TYPE) => set({isOpen: true, id}),
  onClose: () => set({isOpen: false, id: undefined}),
}));
