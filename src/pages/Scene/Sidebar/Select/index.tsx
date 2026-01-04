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

  const handleData = () => {
    if (data.length === 0) {
      return <option value={0}>Select a folder in the library first</option>;
    } else if (data.length > 0) {
      return (
        <>
          {data.map((file, i) => (
            <option key={file.name + i} value={i}>
              {file.name}
            </option>
          ))}
          ;
        </>
      );
    }
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
