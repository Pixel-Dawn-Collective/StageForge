import { Repeat } from "feather-icons-react";
import styles from "./select.module.scss";
import { type ChangeEvent } from "react";
import { useSceneStore } from "../../../../utils/storeScene";
import { useCharacterStore } from "../../../../utils/storeCharacter";

interface SelectProps {
  data: File[];
  title: string;
  hasFlipButton?: boolean;
  selectType: "scene" | "charLeft" | "charCenter" | "charRight";
}

const Select: React.FC<SelectProps> = ({
  selectType,
  hasFlipButton,
  title,
  data,
}) => {
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

  const handleChangeSelect = (
    e: ChangeEvent<HTMLSelectElement>,
    type: string
  ) => {
    console.log("Batata entrou");
    const fileIndex = parseInt(e.target.value);
    if (type === "scene") sceneStore.setScene(fileIndex);

    if (type === "charLeft") characterStore.setCharacterLeft(fileIndex);

    if (type === "charCenter") characterStore.setCharacterCenter(fileIndex);

    if (type === "charRight") characterStore.setCharacterRight(fileIndex);
  };

  return (
    <>
      <div className={styles.infoContainer}>
        <p className={styles.selectTitle}>{title}</p>
        <div className={styles.selectWrapper}>
          <select
            className={styles.select}
            onChange={(e) => handleChangeSelect(e, selectType)}
          >
            {handleData()}
          </select>
          {hasFlipButton && (
            <div className={styles.flipButton}>
              <Repeat />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Select;
