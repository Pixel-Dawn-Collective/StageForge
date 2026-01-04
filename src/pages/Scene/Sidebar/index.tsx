import { motion } from "motion/react";
import styles from "./sidebar.module.scss";
import Button from "../../../components/Button";
import Logo from "../../../components/Logo";
import { useNavigate } from "react-router-dom";
import TeamLogo from "../../../components/TeamLogo";
import Select from "./Select";
import { useSceneStore } from "../../../utils/storeScene";
import { useCharacterStore } from "../../../utils/storeCharacter";
import { useState } from "react";

interface SidebarProps {
  isSidebarOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen }) => {
  const navigate = useNavigate();

  const [isReset, setIsReset] = useState<boolean>(false);

  const sceneStore = useSceneStore();
  const characterStore = useCharacterStore();

  const handleReset = () => {
    setIsReset(true);
    sceneStore.clearScene();
    characterStore.clearCharacterRight();
    characterStore.clearCharacterCenter();
    characterStore.clearCharacterLeft();
  };

  return (
    <motion.div
      initial={{ x: "-400px" }}
      animate={{ x: "0px" }}
      exit={{ x: "-400px" }}
      transition={{ ease: "easeInOut", duration: 0.4 }}
      className={styles.sidebarContainer}
    >
      <div className={styles.topSidebarContent}>
        <Logo />
        <div className={styles.selectContainer}>
          <Select
            key="scenario-select"
            title="Scenario"
            data={useSceneStore().getFiles()}
            selectType="scene"
            isReset
            setIsReset={setIsReset}
            isSidebarOpen={isSidebarOpen}
          />
          <Select
            key="character-l-select"
            title="Character - Left"
            hasFlipButton
            data={useCharacterStore().getFiles()}
            selectType="charLeft"
            isReset
            setIsReset={setIsReset}
            isSidebarOpen={isSidebarOpen}
          />
          <Select
            key="character-c-select"
            title="Character - Center"
            hasFlipButton
            data={useCharacterStore().getFiles()}
            selectType="charCenter"
            isReset
            setIsReset={setIsReset}
            isSidebarOpen={isSidebarOpen}
          />
          <Select
            key="character-r-select"
            title="Character - Right"
            hasFlipButton
            data={useCharacterStore().getFiles()}
            selectType="charRight"
            isReset={isReset}
            setIsReset={setIsReset}
            isSidebarOpen={isSidebarOpen}
          />
        </div>
        <div className={styles.btnContainer}>
          <Button appearance="primary" text="Reset" onClick={handleReset} />
          <Button
            onClick={() => {
              handleReset(), navigate("/");
            }}
            appearance="secondary"
            text="Back to Home"
          />
        </div>
      </div>
      <TeamLogo size={{ width: "42px", height: "48px" }} />
    </motion.div>
  );
};

export default Sidebar;
