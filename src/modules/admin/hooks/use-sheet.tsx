import {create} from "zustand";

export type SheetType = "user-favorite-list" | "user-cart-list" | "user-course-list";

type SheetStore = {
  sheetId?: SheetType;
  parentId?: string;
  addSheet: (dialogId: SheetType, parentId: string) => void;
  removeSheet: () => void;
};

export const useSheet = create<SheetStore>((set) => ({
  sheetId: undefined,
  parentId: undefined,
  addSheet: (sheetId: SheetType, parentId: string) =>
    set((state) => ({
      ...state,
      sheetId,
      parentId,
    })),
  removeSheet: () => {
    set((state) => ({
      ...state,
      sheetId: undefined,
      parentId: undefined,
    }));
  },
}));
