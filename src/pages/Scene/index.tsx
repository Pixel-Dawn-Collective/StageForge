import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import FlagButton from "./FlagButton";
import styles from "./scene.module.scss";
import { AnimatePresence } from "motion/react";
import { useSceneStore } from "../../utils/storeScene";
import { useCharacterStore } from "../../utils/storeCharacter";

const Scene = () => {
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [scene, setScene] = useState<string>("");
  const [charLeft, setCharLeft] = useState<string>("");
  const [charCenter, setCharCenter] = useState<string>("");
  const [charRight, setCharRight] = useState<string>("");

  const sceneStore = useSceneStore();
  const characterStore = useCharacterStore();

  useEffect(() => {
    setScene(sceneStore.getScene());
  }, [sceneStore]);

  useEffect(() => {
    setCharLeft(characterStore.getCharacterLeft());
    setCharCenter(characterStore.getCharacterCenter());
    setCharRight(characterStore.getCharacterRight());
  }, [characterStore]);

  return (
    <div
      className={styles.background}
      style={{
        backgroundImage: `url(${scene})`,
      }}
      aria-label="Image defined by user, can be changed"
    >
      <img className={styles.charLeft} src={charLeft} />
      <img className={styles.charCenter} src={charCenter} />
      <img className={styles.charRight} src={charRight} />
      <AnimatePresence>{isSidebarOpen && <Sidebar />}</AnimatePresence>
      <FlagButton
        isSidebarOpen={isSidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
    </div>
  );
};

export default Scene;
