import { Repeat } from "feather-icons-react";
import styles from "./select.module.scss";
import {
  useEffect,
  useState,
  type ChangeEvent,
  type SetStateAction,
} from "react";
import { useSceneStore } from "../../../../utils/storeScene";
import { useCharacterStore } from "../../../../utils/storeCharacter";

interface SelectProps {
  data: File[];
  title: string;
  hasFlipButton?: boolean;
  selectType: "scene" | "charLeft" | "charCenter" | "charRight";
  isReset: boolean;
  setIsReset: React.Dispatch<SetStateAction<boolean>>;
  isSidebarOpen: boolean;
}

const Select: React.FC<SelectProps> = ({
  selectType,
  hasFlipButton,
  title,
  data,
  isReset,
  setIsReset,
  isSidebarOpen,
}) => {
  const [value, setValue] = useState<number>();

  const sceneStore = useSceneStore();
  const characterStore = useCharacterStore();

  const parseFileName = (fileName: string) => {
    const baseName = fileName.includes(".")
      ? fileName.slice(0, fileName.lastIndexOf("."))
      : fileName;

    const parts = baseName.split(" - ").map((p) => p.trim());

    if (parts.length === 1) {
      return {
        group: null,
        label: parts[0],
      };
    }

    if (parts.length === 2) {
      return {
        group: parts[0],
        label: parts[1],
      };
    }

    return {
      group: `${parts[0]} - ${parts[1]}`,
      label: parts.slice(2).join(" - "),
    };
  };

  const handleData = () => {
    if (data.length === 0) {
      return <option value={-1}>Select a folder in the library first</option>;
    }

    type Item = {
      type: "option" | "group";
      sortKey: string;
      file?: File;
      index?: number;
      label?: string;
      group?: string;
      items?: { file: File; index: number; label: string }[];
    };

    const parsed = data.map((file, index) => {
      const { group, label } = parseFileName(file.name);

      return {
        group,
        label,
        file,
        index,
      };
    });

    const groupedMap: Record<
      string,
      { file: File; index: number; label: string }[]
    > = {};

    parsed.forEach(({ group, file, index, label }) => {
      const key = group ?? "__ungrouped__";
      if (!groupedMap[key]) groupedMap[key] = [];
      groupedMap[key].push({ file, index, label });
    });

    const sortable: Item[] = [];

    Object.entries(groupedMap).forEach(([group, items]) => {
      items.sort((a, b) =>
        a.label.localeCompare(b.label, undefined, { sensitivity: "base" })
      );

      if (group === "__ungrouped__") {
        items.forEach(({ file, index, label }) => {
          sortable.push({
            type: "option",
            sortKey: label.toLowerCase(),
            file,
            index,
            label,
          });
        });
      } else if (items.length === 1) {
        const { file, index, label } = items[0];
        sortable.push({
          type: "option",
          sortKey: `${group} ${label}`.toLowerCase(),
          file,
          index,
          label,
        });
      } else {
        sortable.push({
          type: "group",
          sortKey: group.toLowerCase(),
          group,
          items,
        });
      }
    });

    sortable.sort((a, b) =>
      a.sortKey.localeCompare(b.sortKey, undefined, {
        sensitivity: "base",
      })
    );

    return sortable.map((item) => {
      if (item.type === "option") {
        return (
          <option key={item.file!.name + item.index} value={item.index}>
            {item.label}
          </option>
        );
      }

      return (
        <optgroup key={item.group} label={item.group}>
          {item.items!.map(({ file, index, label }) => (
            <option key={file.name + index} value={index}>
              {label}
            </option>
          ))}
        </optgroup>
      );
    });
  };

  const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const fileIndex = parseInt(e.target.value);

    if (selectType === "scene") {
      if (fileIndex === -1) {
        setValue(-1);
        sceneStore.clearScene();
      } else {
        setValue(fileIndex);
        sceneStore.setScene(fileIndex);
      }
    }

    if (selectType === "charLeft")
      if (fileIndex === -1) {
        setValue(-1);
        characterStore.clearCharacterLeft();
      } else {
        console.log("Mudou o valor do leftzinho", fileIndex);
        setValue(fileIndex);
        characterStore.setCharacterLeft(fileIndex);
      }

    if (selectType === "charCenter")
      if (fileIndex === -1) {
        setValue(-1);
        characterStore.clearCharacterCenter();
      } else {
        setValue(fileIndex);
        characterStore.setCharacterCenter(fileIndex);
      }

    if (selectType === "charRight")
      if (fileIndex === -1) {
        characterStore.clearCharacterRight();
      } else {
        setValue(fileIndex);
        console.log("Mudou o direito pra:", fileIndex);
        characterStore.setCharacterRight(fileIndex);
      }
  };

  const handleUpdateSelect = () => {
    if (selectType === "scene") {
      console.log("Atualizou scene");
      setValue(sceneStore.getScene().index);
    }

    if (selectType === "charLeft") {
      setValue(characterStore.getCharacterLeft().index);
    }

    if (selectType === "charCenter") {
      setValue(characterStore.getCharacterCenter().index);
    }

    if (selectType === "charRight") {
      setValue(characterStore.getCharacterRight().index);
    }
  };

  const handleFlip = () => {
    if (selectType === "charLeft") {
      characterStore.flipCharacterLeft();
    }

    if (selectType === "charCenter") {
      characterStore.flipCharacterCenter();
    }

    if (selectType === "charRight") {
      characterStore.flipCharacterRight();
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleUpdateSelect();
    }, 0); // Or 10ms for safety

    return () => clearTimeout(timeoutId);
  }, [isSidebarOpen]);

  useEffect(() => {
    if (isReset) {
      setValue(-1);
      setIsReset(false);
    }
  }, [isReset]);

  return (
    <>
      <div className={styles.infoContainer}>
        <p className={styles.selectTitle}>{title}</p>
        <div className={styles.selectWrapper}>
          <select
            className={styles.select}
            value={value}
            onChange={(e) => handleChangeSelect(e)}
          >
            <option key={"empty"} value={-1}>
              -----------
            </option>
            {handleData()}
          </select>
          {hasFlipButton && (
            <div className={styles.flipButton} onClick={handleFlip}>
              <Repeat />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Select;
