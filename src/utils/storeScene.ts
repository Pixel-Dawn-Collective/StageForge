import { create } from "zustand";
import type { SceneState } from "./types";
import defaultImage from "../assets/scene/default.png";

export const useSceneStore = create<SceneState>((set, get) => ({
  scene: defaultImage,
  files: [],

  addFiles: (fileArray: File[]) => set({ files: fileArray }),

  getFiles: () => get().files,

  removeImage: (index: number) =>
    set((state) => ({ files: state.files.slice(index) })),

  setScene: (index: number) =>
    set((state) => ({ scene: URL.createObjectURL(state.files[index]) })),

  getScene: () => get().scene,

  reset: () => set({ scene: undefined, files: [] }),
}));
