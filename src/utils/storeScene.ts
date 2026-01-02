import { create } from "zustand";
import type { FolderState } from "./types";

export const useSceneStore = create<FolderState>((set, get) => ({
  files: [],
  isLoading: false,
  error: null,

  addFiles: (fileArray: File[]) => set({ files: fileArray }),

  getFiles: () => get().files,

  removeImage: (index: number) =>
    set((state) => ({ files: state.files.slice(index) })),

  setLoading: (loading: boolean) => set({ isLoading: loading }),

  reset: () => set({ files: [], isLoading: false, error: null }),
}));
