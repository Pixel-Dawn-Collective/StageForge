import { useEffect, useRef } from "react";
import Button from "../../components/Button";
import Logo from "../../components/Logo";
import MenuButton from "../../components/MenuButton";
import styles from "./library.module.scss";
import { useSceneStore } from "../../utils/storeScene";
import { useCharacterStore } from "../../utils/storeCharacter";
import ImageFrame from "./ImageFrame";

const Library = () => {
  const inputRefScene = useRef<HTMLInputElement>(null);
  const inputRefCharacter = useRef<HTMLInputElement>(null);

  const sceneStore = useSceneStore.getState();
  const characterStore = useCharacterStore.getState();
  const sceneFiles = useSceneStore((state) => state.files);
  const characterFiles = useCharacterStore((state) => state.files);

  const pickSceneFolder = () => inputRefScene.current?.click();
  const pickCharacterFolder = () => inputRefCharacter.current?.click();

  const handleFolderSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    typeFolder: `scene` | "character"
  ) => {
    const fileList = e.target.files;

    if (fileList && fileList.length > 0) {
      typeFolder === "scene"
        ? sceneStore.addFiles(Array.from(fileList))
        : characterStore.addFiles(Array.from(fileList));

      console.log("Oh as cenas aqui mané!", sceneStore.getFiles());
      console.log("Oh os personagens aqui mané!", characterStore.getFiles());
    } else {
      typeFolder === "scene"
        ? sceneStore.addFiles([])
        : characterStore.addFiles([]);
      console.log("Please select a valid folder...");
    }

    e.target.value = "";
  };

  useEffect(() => {
    sceneStore;
  }, [useSceneStore]);

  return (
    <div className={styles.libraryContainer}>
      <div className={styles.header}>
        <Logo size={{ width: "580px", height: "85/px" }} />
        <div className={styles.buttonHeaderContainer}>
          <MenuButton logo="scene" to="/scene" size="small" />
          <MenuButton
            logo="library"
            appearance="selected"
            to="/library"
            size="small"
          />
        </div>
      </div>
      <div className={styles.folderButtons}>
        <Button
          appearance="primary"
          text="Upload Scenario Folder"
          onClick={pickSceneFolder}
        />
        <input
          ref={(node) => {
            if (node) {
              inputRefScene.current = node;
              node.setAttribute("webkitdirectory", "");
              node.setAttribute("directory", "");
            }
          }}
          accept="image/*"
          type="file"
          style={{ display: "none" }}
          onChange={(e) => handleFolderSelect(e, "scene")}
        />
        <Button
          appearance="primary"
          text="Upload Character Folder"
          onClick={pickCharacterFolder}
        />
        <input
          ref={(node) => {
            if (node) {
              inputRefCharacter.current = node;
              node.setAttribute("webkitdirectory", "");
              node.setAttribute("directory", "");
            }
          }}
          accept="image/*"
          type="file"
          style={{ display: "none" }}
          onChange={(e) => handleFolderSelect(e, "character")}
        />
      </div>
      <div className={styles.sectionContainer}>
        <h1 className={styles.sectionTitle}>Scenarios</h1>
        {sceneFiles.length > 0 ? (
          <ImageFrame files={sceneFiles} />
        ) : (
          <h1 className={styles.sectionInfo}>
            Select a folder with images to render here...
          </h1>
        )}
      </div>
      <div className={styles.sectionContainer}>
        <h1 className={styles.sectionTitle}>Characters</h1>
        {characterFiles.length > 0 ? (
          <ImageFrame files={characterFiles} />
        ) : (
          <h1 className={styles.sectionInfo}>
            Select a folder with images to render here...
          </h1>
        )}
      </div>
    </div>
  );
};

export default Library;
