import { create } from "zustand";
import type { CharacterState } from "./types";

export const useCharacterStore = create<CharacterState>((set, get) => ({
  characterRightImg: "",
  characterCenterImg: "",
  characterLeftImg: "",
  files: [],

  addFiles: (fileArray: File[]) => set({ files: fileArray }),

  getFiles: () => get().files,

  removeImage: (index: number) =>
    set((state) => ({ files: state.files.slice(index) })),

  setCharacterRight: (index: number) =>
    set((state) => ({
      characterRightImg: URL.createObjectURL(state.files[index]),
    })),
  getCharacterRight: () => get().characterRightImg,

  setCharacterCenter: (index: number) =>
    set((state) => ({
      characterCenterImg: URL.createObjectURL(state.files[index]),
    })),
  getCharacterCenter: () => get().characterCenterImg,

  setCharacterLeft: (index: number) =>
    set((state) => ({
      characterLeftImg: URL.createObjectURL(state.files[index]),
    })),
  getCharacterLeft: () => get().characterLeftImg,

  reset: () => set({ files: [] }),
}));
