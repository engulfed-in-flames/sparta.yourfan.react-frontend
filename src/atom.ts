import { atom } from "recoil";
import { IBoard, IMe } from "./type";

export const isUserLoadingAtom = atom({
  key: "isUserLoading",
  default: false,
});

export const userAtom = atom<IMe | undefined>({
  key: "user",
  default: undefined,
});

export const createForumBtnAtom = atom({
  key: "createForumBtn",
  default: false,
});

export const boardListAtom = atom<IBoard[]>({
  key: "boardList",
  default: [],
});
