import { create } from "zustand";
import type { CharacterState } from "./types";

export const useCharacterStore = create<CharacterState>((set, get) => ({
  characterRight: { imgCode: "", isflipped: false, index: -1 },
  characterCenter: { imgCode: "", isflipped: false, index: -1 },
  characterLeft: { imgCode: "", isflipped: false, index: -1 },
  files: [],

  // Substitui todos os arquivos (upload de pasta)
  addFiles: (fileArray: File[]) => set({ files: fileArray }),

  getFiles: () => get().files,

  // ✅ NOVO — remove por nome (usado pela Library)
  removeFile: (fileName: string) =>
    set((state) => {
      const newFiles = state.files.filter((file) => file.name !== fileName);

      // Se algum personagem usava esse arquivo, limpa
      const resetIfRemoved = (character: {
        index: number;
        imgCode: string;
        isflipped: boolean;
      }) => {
        if (character.index === -1) return character;

        const fileAtIndex = state.files[character.index];
        if (!fileAtIndex || fileAtIndex.name === fileName) {
          return { imgCode: "", isflipped: false, index: -1 };
        }

        return character;
      };

      return {
        files: newFiles,
        characterLeft: resetIfRemoved(state.characterLeft),
        characterCenter: resetIfRemoved(state.characterCenter),
        characterRight: resetIfRemoved(state.characterRight),
      };
    }),

  // ✅ CORRIGIDO — remove UM arquivo pelo índice
  removeImage: (index: number) =>
    set((state) => {
      const fileToRemove = state.files[index];
      if (!fileToRemove) return state;

      const newFiles = state.files.filter((_, i) => i !== index);

      const resetIfRemoved = (character: {
        index: number;
        imgCode: string;
        isflipped: boolean;
      }) => {
        if (character.index === index) {
          return { imgCode: "", isflipped: false, index: -1 };
        }

        // Ajusta índice se necessário
        if (character.index > index) {
          return {
            ...character,
            index: character.index - 1,
          };
        }

        return character;
      };

      return {
        files: newFiles,
        characterLeft: resetIfRemoved(state.characterLeft),
        characterCenter: resetIfRemoved(state.characterCenter),
        characterRight: resetIfRemoved(state.characterRight),
      };
    }),

  setCharacterRight: (index: number) =>
    set((state) => ({
      characterRight: {
        imgCode: URL.createObjectURL(state.files[index]),
        isflipped: state.characterRight.isflipped,
        index,
      },
    })),

  flipCharacterRight: () =>
    set((state) => ({
      characterRight: {
        ...state.characterRight,
        isflipped: !state.characterRight.isflipped,
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
        index,
      },
    })),

  flipCharacterCenter: () =>
    set((state) => ({
      characterCenter: {
        ...state.characterCenter,
        isflipped: !state.characterCenter.isflipped,
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
        index,
      },
    })),

  flipCharacterLeft: () =>
    set((state) => ({
      characterLeft: {
        ...state.characterLeft,
        isflipped: !state.characterLeft.isflipped,
      },
    })),

  getCharacterLeft: () => get().characterLeft,

  clearCharacterLeft: () =>
    set({ characterLeft: { imgCode: "", isflipped: false, index: -1 } }),

  reset: () =>
    set({
      files: [],
      characterLeft: { imgCode: "", isflipped: false, index: -1 },
      characterCenter: { imgCode: "", isflipped: false, index: -1 },
      characterRight: { imgCode: "", isflipped: false, index: -1 },
    }),
}));
