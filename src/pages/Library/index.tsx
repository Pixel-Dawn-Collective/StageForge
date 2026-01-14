import { useRef, useState } from "react";
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

  const [showCategories, setShowCategories] = useState(false);

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
      const files = Array.from(fileList);
      typeFolder === "scene"
        ? sceneStore.addFiles(files)
        : characterStore.addFiles(files);
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

  // 🔹 AGRUPAMENTO DINÂMICO
  const groupFilesByName = (files: File[]) => {
    const ungrouped: File[] = [];
    const groups: Record<string, File[]> = {};

    files.forEach((file) => {
      const nameWithoutExt = file.name.includes(".")
        ? file.name.slice(0, file.name.lastIndexOf("."))
        : file.name;

      const separator = " - ";

      if (!nameWithoutExt.includes(separator)) {
        ungrouped.push(file);
        return;
      }

      const groupName = nameWithoutExt.split(separator)[0].trim();

      if (!groups[groupName]) {
        groups[groupName] = [];
      }

      groups[groupName].push(file);
    });

    // 🔤 ordenação
    ungrouped.sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
    );

    Object.values(groups).forEach((groupFiles) =>
      groupFiles.sort((a, b) =>
        a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
      )
    );

    const sortedGroups = Object.fromEntries(
      Object.entries(groups).sort(([a], [b]) =>
        a.localeCompare(b, undefined, { sensitivity: "base" })
      )
    );

    return {
      ungrouped,
      groups: sortedGroups,
    };
  };

  const groupedScenes = groupFilesByName(sceneFiles);
  const groupedCharacters = groupFilesByName(characterFiles);

  return (
    <div className={styles.libraryContainer}>
      {/* HEADER */}
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

      {/* UPLOAD BUTTONS */}
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

          <div className={styles.headerActions}>
            <span
              className={styles.toggleCategories}
              role="button"
              tabIndex={0}
              onClick={() => setShowCategories((prev) => !prev)}
            >
              {showCategories ? "Hide Categories" : "Show Categories"}
            </span>

            <span
              className={styles.deleteAll}
              role="button"
              tabIndex={0}
              onClick={handleDeleteAllScenes}
            >
              Delete All
            </span>
          </div>
        </div>

        {sceneFiles.length > 0 ? (
          showCategories ? (
            <>
              {groupedScenes.ungrouped.length > 0 && (
                <div>
                  <h3 className={styles.groupTitle}>No Category</h3>
                  <ImageFrame
                    files={groupedScenes.ungrouped}
                    onRemove={(file) => sceneStore.removeFile(file.name)}
                  />
                </div>
              )}

              {Object.entries(groupedScenes.groups).map(
                ([groupName, files]) => (
                  <div key={groupName}>
                    <h3 className={styles.groupTitle}>{groupName}</h3>
                    <ImageFrame
                      files={files}
                      onRemove={(file) => sceneStore.removeFile(file.name)}
                    />
                  </div>
                )
              )}
            </>
          ) : (
            <ImageFrame
              files={sceneFiles}
              onRemove={(file) => sceneStore.removeFile(file.name)}
            />
          )
        ) : (
          <h1 className={styles.sectionInfo}>
            Select a folder with images to render here...
          </h1>
        )}
      </div>

      {/* CHARACTERS */}
      <div className={styles.sectionContainer}>
        <div className={styles.headerContainer}>
          <h1 className={styles.sectionTitle}>Characters</h1>

          <div className={styles.headerActions}>
            <span
              className={styles.toggleCategories}
              role="button"
              tabIndex={0}
              onClick={() => setShowCategories((prev) => !prev)}
            >
              {showCategories ? "Hide Categories" : "Show Categories"}
            </span>

            <span
              className={styles.deleteAll}
              role="button"
              tabIndex={0}
              onClick={handleDeleteAllCharacters}
            >
              Delete All
            </span>
          </div>
        </div>

        {characterFiles.length > 0 ? (
          showCategories ? (
            <>
              {groupedCharacters.ungrouped.length > 0 && (
                <div>
                  <h3 className={styles.groupTitle}>No Category</h3>
                  <ImageFrame
                    files={groupedCharacters.ungrouped}
                    onRemove={(file) => characterStore.removeFile(file.name)}
                  />
                </div>
              )}

              {Object.entries(groupedCharacters.groups).map(
                ([groupName, files]) => (
                  <div key={groupName}>
                    <h3 className={styles.groupTitle}>{groupName}</h3>
                    <ImageFrame
                      files={files}
                      onRemove={(file) => characterStore.removeFile(file.name)}
                    />
                  </div>
                )
              )}
            </>
          ) : (
            <ImageFrame
              files={characterFiles}
              onRemove={(file) => characterStore.removeFile(file.name)}
            />
          )
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
