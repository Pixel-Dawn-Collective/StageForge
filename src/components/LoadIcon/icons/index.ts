import HomeIcon from "./../icons/home";
import LibraryIcon from "./../icons/library";
import SceneIcon from "./../icons/scene";

export const icons = {
  home: HomeIcon,
  library: LibraryIcon,
  scene: SceneIcon,
};

export type IconName = keyof typeof icons;
