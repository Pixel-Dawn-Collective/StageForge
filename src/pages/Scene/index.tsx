import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import FlagButton from "./FlagButton";
import styles from "./scene.module.scss";
import { AnimatePresence } from "motion/react";
import { useSceneStore } from "../../utils/storeScene";
import { useCharacterStore } from "../../utils/storeCharacter";
import type { CharImage } from "../../utils/types";

const Scene = () => {
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [scene, setScene] = useState<string>("");
  const [charLeft, setCharLeft] = useState<CharImage>({
    imgCode: "",
    isflipped: false,
    index: -1,
  });
  const [charCenter, setCharCenter] = useState<CharImage>({
    imgCode: "",
    isflipped: false,
    index: -1,
  });
  const [charRight, setCharRight] = useState<CharImage>({
    imgCode: "",
    isflipped: false,
    index: -1,
  });

  const sceneStore = useSceneStore();
  const characterStore = useCharacterStore();

  useEffect(() => {
    setScene(sceneStore.getScene().imgCode);
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
      <div className={`${styles.charImage} ${styles.left}`}>
        <img
          src={charLeft.imgCode}
          style={charLeft.isflipped ? { transform: "scaleX(-1)" } : {}}
        />
      </div>
      <div className={`${styles.charImage} ${styles.center} `}>
        <img
          src={charCenter.imgCode}
          style={charCenter.isflipped ? { transform: "scaleX(-1)" } : {}}
        />
      </div>
      <div className={`${styles.charImage} ${styles.right} `}>
        <img
          src={charRight.imgCode}
          style={charRight.isflipped ? { transform: "scaleX(-1)" } : {}}
        />
      </div>

      <AnimatePresence>
        {isSidebarOpen && <Sidebar isSidebarOpen={isSidebarOpen} />}
      </AnimatePresence>
      <AnimatePresence>
        <FlagButton
          isSidebarOpen={isSidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
      </AnimatePresence>
    </div>
  );
};

export default Scene;
