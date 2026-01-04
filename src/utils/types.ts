export interface SceneState {
  scene: SceneImage;
  files: File[];

  addFiles: (fileArray: File[]) => void;
  getFiles: () => File[];
  removeImage: (index: number) => void;

  setScene: (index: number) => void;
  clearScene: () => void;

  getScene: () => { imgCode: string; index: number };
  reset: () => void;
}

export interface CharacterState {
  characterRight: CharImage;
  characterCenter: CharImage;
  characterLeft: CharImage;
  files: File[];

  addFiles: (fileArray: File[]) => void;
  getFiles: () => File[];

  setCharacterRight: (index: number) => void;
  getCharacterRight: () => CharImage;
  flipCharacterRight: () => void;
  clearCharacterRight: () => void;

  setCharacterCenter: (index: number) => void;
  getCharacterCenter: () => CharImage;
  flipCharacterCenter: () => void;
  clearCharacterCenter: () => void;

  setCharacterLeft: (index: number) => void;
  getCharacterLeft: () => CharImage;
  flipCharacterLeft: () => void;
  clearCharacterLeft: () => void;

  reset: () => void;
}

export type SceneImage = {
  imgCode: string;
  index: number;
};

export type CharImage = {
  imgCode: string;
  isflipped: boolean;
  index: number;
};
