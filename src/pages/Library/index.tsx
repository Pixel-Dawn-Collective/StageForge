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
    if (
      window.confirm("Are you sure you want to delete all scenario images?")
    ) {
      sceneStore.reset();
    }
  };

  const handleDeleteAllCharacters = () => {
    if (
      window.confirm("Are you sure you want to delete all character images?")
    ) {
      characterStore.reset();
    }
  };

  // 🔹 AGRUPAMENTO COM HIERARQUIA
  const groupFilesByName = (files: File[]) => {
    const ungrouped: File[] = [];
    const groups: Record<
      string,
      {
        ungrouped: File[];
        subgroups: Record<string, File[]>;
      }
    > = {};

    files.forEach((file) => {
      const baseName = file.name.includes(".")
        ? file.name.slice(0, file.name.lastIndexOf("."))
        : file.name;

      const parts = baseName
        .split(/\s*[-–—]\s*/)
        .map((p) => p.trim())
        .filter(Boolean);

      // Sem categoria
      if (parts.length === 1) {
        ungrouped.push(file);
        return;
      }

      const mainGroup = parts[0];

      if (!groups[mainGroup]) {
        groups[mainGroup] = {
          ungrouped: [],
          subgroups: {},
        };
      }

      // Apenas um traço → direto no grupo
      if (parts.length === 2) {
        groups[mainGroup].ungrouped.push(file);
        return;
      }

      // Dois ou mais traços → subgrupo
      const subGroup = parts[1];

      if (!groups[mainGroup].subgroups[subGroup]) {
        groups[mainGroup].subgroups[subGroup] = [];
      }

      groups[mainGroup].subgroups[subGroup].push(file);
    });

    const sortFiles = (a: File, b: File) =>
      a.name.localeCompare(b.name, undefined, { sensitivity: "base" });

    ungrouped.sort(sortFiles);

    Object.values(groups).forEach((group) => {
      group.ungrouped.sort(sortFiles);
      Object.values(group.subgroups).forEach((files) => files.sort(sortFiles));
    });

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

      {/* SCENARIOS */}
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
                <div className={styles.groupContainer}>
                  <h2 className={styles.groupTitle}>No Category</h2>
                  <ImageFrame
                    files={groupedScenes.ungrouped}
                    onRemove={(file) => sceneStore.removeFile(file.name)}
                  />
                </div>
              )}

              {Object.entries(groupedScenes.groups).map(
                ([groupName, group]) => (
                  <div className={styles.groupContainer} key={groupName}>
                    <h2 className={styles.groupTitle}>{groupName}</h2>

                    {group.ungrouped.length > 0 &&
                      (Object.keys(group.subgroups).length > 0 ? (
                        <div className={styles.subGroupContainer}>
                          <h3 className={styles.subGroupTitle}>No Category</h3>
                          <ImageFrame
                            files={group.ungrouped}
                            onRemove={(file) =>
                              sceneStore.removeFile(file.name)
                            }
                          />
                        </div>
                      ) : (
                        <ImageFrame
                          files={group.ungrouped}
                          onRemove={(file) => sceneStore.removeFile(file.name)}
                        />
                      ))}

                    {Object.entries(group.subgroups).map(
                      ([subGroupName, files]) => (
                        <div
                          className={styles.subGroupContainer}
                          key={subGroupName}
                        >
                          <h3 className={styles.subGroupTitle}>
                            {groupName} - {subGroupName}
                          </h3>
                          <ImageFrame
                            files={files}
                            onRemove={(file) =>
                              sceneStore.removeFile(file.name)
                            }
                          />
                        </div>
                      )
                    )}
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
                <div className={styles.groupContainer}>
                  <h2 className={styles.groupTitle}>No Category</h2>
                  <ImageFrame
                    files={groupedCharacters.ungrouped}
                    onRemove={(file) => characterStore.removeFile(file.name)}
                  />
                </div>
              )}

              {Object.entries(groupedCharacters.groups).map(
                ([groupName, group]) => (
                  <div className={styles.groupContainer} key={groupName}>
                    <h2 className={styles.groupTitle}>{groupName}</h2>

                    {group.ungrouped.length > 0 &&
                      (Object.keys(group.subgroups).length > 0 ? (
                        <div className={styles.subGroupContainer}>
                          <h3 className={styles.subGroupTitle}>No Category</h3>
                          <ImageFrame
                            files={group.ungrouped}
                            onRemove={(file) =>
                              sceneStore.removeFile(file.name)
                            }
                          />
                        </div>
                      ) : (
                        <ImageFrame
                          files={group.ungrouped}
                          onRemove={(file) => sceneStore.removeFile(file.name)}
                        />
                      ))}

                    {Object.entries(group.subgroups).map(
                      ([subGroupName, files]) => (
                        <div
                          className={styles.subGroupContainer}
                          key={subGroupName}
                        >
                          <h3 className={styles.subGroupTitle}>
                            {groupName} - {subGroupName}
                          </h3>
                          <ImageFrame
                            files={files}
                            onRemove={(file) =>
                              characterStore.removeFile(file.name)
                            }
                          />
                        </div>
                      )
                    )}
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
