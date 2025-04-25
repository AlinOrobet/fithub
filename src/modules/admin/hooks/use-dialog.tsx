import {create} from "zustand";

export type DialogType = "create-image" | "create-video";

type DialogStore = {
  dialogId?: DialogType;
  addDialog: (dialogId: DialogType) => void;
  removeDialog: () => void;
};

export const useDialog = create<DialogStore>((set) => ({
  dialogId: undefined,
  addDialog: (dialogId: DialogType) =>
    set((state) => ({
      ...state,
      dialogId,
    })),
  removeDialog: () => {
    set((state) => ({
      ...state,
      dialogId: undefined,
    }));
  },
}));
