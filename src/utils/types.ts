export interface FolderState {
  files: File[];
  isLoading: boolean;
  error: string | null;

  addFiles: (fileArray: File[]) => void;
  getFiles: () => File[];
  removeImage: (index: number) => void;
  setLoading: (loading: boolean) => void;
  reset: () => void;
}
