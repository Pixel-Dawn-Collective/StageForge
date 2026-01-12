import { create } from "zustand";
import type { SceneState } from "./types";
import defaultImage from "../assets/scene/default.png";

export const useSceneStore = create<SceneState>((set, get) => ({
  scene: { imgCode: defaultImage, index: -1 },
  files: [],

  addFiles: (fileArray: File[]) => set({ files: fileArray }),

  getFiles: () => get().files,

  removeFile: (fileName: string) =>
    set((state) => ({
      files: state.files.filter((file) => file.name !== fileName),
    })),

  removeImage: (index: number) =>
    set((state) => ({
      files: state.files.filter((_, i) => i !== index),
    })),

  setScene: (index: number) =>
    set((state) => ({
      scene: {
        imgCode: URL.createObjectURL(state.files[index]),
        index,
      },
    })),

  clearScene: () =>
    set({
      scene: { imgCode: defaultImage, index: -1 },
    }),

  getScene: () => get().scene,

  reset: () =>
    set({
      scene: { imgCode: defaultImage, index: -1 },
      files: [],
    }),
}));
