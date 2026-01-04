import { create } from "zustand";
import type { CharacterState } from "./types";

export const useCharacterStore = create<CharacterState>((set, get) => ({
  characterRight: { imgCode: "", isflipped: false, index: -1 },
  characterCenter: { imgCode: "", isflipped: false, index: -1 },
  characterLeft: { imgCode: "", isflipped: false, index: -1 },
  files: [],

  addFiles: (fileArray: File[]) => set({ files: fileArray }),

  getFiles: () => get().files,

  removeImage: (index: number) =>
    set((state) => ({ files: state.files.slice(index) })),

  setCharacterRight: (index: number) =>
    set((state) => ({
      characterRight: {
        imgCode: URL.createObjectURL(state.files[index]),
        isflipped: state.characterRight.isflipped,
        index: index,
      },
    })),
  flipCharacterRight: () =>
    set((state) => ({
      characterRight: {
        imgCode: state.characterRight.imgCode,
        isflipped: !state.characterRight.isflipped,
        index: state.characterRight.index,
      },
    })),
  getCharacterRight: () => get().characterRight,
  clearCharacterRight: () =>
    set({ characterRight: { imgCode: "", isflipped: false, index: -1 } }),

  setCharacterCenter: (index: number) =>
    set((state) => ({
      characterCenter: {
        imgCode: URL.createObjectURL(state.files[index]),
        isflipped: state.characterCenter.isflipped,
        index: index,
      },
    })),
  flipCharacterCenter: () =>
    set((state) => ({
      characterCenter: {
        imgCode: state.characterCenter.imgCode,
        isflipped: !state.characterCenter.isflipped,
        index: state.characterCenter.index,
      },
    })),
  getCharacterCenter: () => get().characterCenter,
  clearCharacterCenter: () =>
    set({ characterCenter: { imgCode: "", isflipped: false, index: -1 } }),

  setCharacterLeft: (index: number) =>
    set((state) => ({
      characterLeft: {
        imgCode: URL.createObjectURL(state.files[index]),
        isflipped: state.characterLeft.isflipped,
        index: index,
      },
    })),
  flipCharacterLeft: () =>
    set((state) => ({
      characterLeft: {
        imgCode: state.characterLeft.imgCode,
        isflipped: !state.characterLeft.isflipped,
        index: state.characterLeft.index,
      },
    })),
  getCharacterLeft: () => get().characterLeft,
  clearCharacterLeft: () =>
    set({ characterLeft: { imgCode: "", isflipped: false, index: -1 } }),

  reset: () => set({ files: [] }),
}));
