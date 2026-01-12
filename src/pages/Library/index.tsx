import { useRef } from "react";
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
    typeFolder: "scene" | "character"
  ) => {
    const fileList = e.target.files;

    if (fileList && fileList.length > 0) {
      typeFolder === "scene"
        ? sceneStore.addFiles(Array.from(fileList))
        : characterStore.addFiles(Array.from(fileList));
    } else {
      typeFolder === "scene"
        ? sceneStore.addFiles([])
        : characterStore.addFiles([]);
    }

    e.target.value = "";
  };

  const handleDeleteAllScenes = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete all scenario images?"
    );

    if (confirmDelete) {
      sceneStore.reset();
    }
  };

  const handleDeleteAllCharacters = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete all character images?"
    );

    if (confirmDelete) {
      characterStore.reset();
    }
  };

  return (
    <div className={styles.libraryContainer}>
      <div className={styles.header}>
        <div className={styles.logoContainer}>
          <Logo />
        </div>
        <div className={styles.buttonHeaderContainer}>
          <MenuButton icon="home" to="/" size="small" />
          <MenuButton icon="scene" to="/scene" size="small" />
          <MenuButton
            icon="library"
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
        <div className={styles.headerContainer}>
          <h1 className={styles.sectionTitle}>Scenarios</h1>
          <span
            className={styles.deleteAll}
            role="button"
            tabIndex={0}
            onClick={handleDeleteAllScenes}
          >
            Delete All
          </span>
        </div>
        {sceneFiles.length > 0 ? (
          <ImageFrame
            files={sceneFiles}
            onRemove={(file) => sceneStore.removeFile(file.name)}
          />
        ) : (
          <h1 className={styles.sectionInfo}>
            Select a folder with images to render here...
          </h1>
        )}
      </div>
      <div className={styles.sectionContainer}>
        <div className={styles.headerContainer}>
          <h1 className={styles.sectionTitle}>Characters</h1>
          <span
            className={styles.deleteAll}
            role="button"
            tabIndex={0}
            onClick={handleDeleteAllCharacters}
          >
            Delete All
          </span>
        </div>
        {characterFiles.length > 0 ? (
          <ImageFrame
            files={characterFiles}
            onRemove={(file) => characterStore.removeFile(file.name)}
          />
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
