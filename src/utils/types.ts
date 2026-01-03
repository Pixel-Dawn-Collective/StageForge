export interface SceneState {
  scene: string;
  files: File[];

  addFiles: (fileArray: File[]) => void;
  getFiles: () => File[];
  removeImage: (index: number) => void;
  setScene: (index: number) => void;
  getScene: () => string;
  reset: () => void;
}

export interface CharacterState {
  characterRightImg: string;
  characterCenterImg: string;
  characterLeftImg: string;
  files: File[];

  addFiles: (fileArray: File[]) => void;
  getFiles: () => File[];
  removeImage: (index: number) => void;
  setCharacterRight: (index: number) => void;
  getCharacterRight: () => string;

  setCharacterCenter: (index: number) => void;
  getCharacterCenter: () => string;

  setCharacterLeft: (index: number) => void;
  getCharacterLeft: () => string;

  reset: () => void;
}
