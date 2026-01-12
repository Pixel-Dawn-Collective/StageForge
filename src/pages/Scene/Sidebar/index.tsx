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

const isMobile = window.innerWidth <= 768;

interface SidebarProps {
  isSidebarOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen }) => {
  const navigate = useNavigate();

  const [resetScene, setResetScene] = useState(false);
  const [resetCharacters, setResetCharacters] = useState(false);

  const sceneStore = useSceneStore();
  const characterStore = useCharacterStore();

  const handleResetAll = () => {
    setResetScene(true);
    setResetCharacters(true);
    sceneStore.clearScene();
    characterStore.clearCharacterLeft();
    characterStore.clearCharacterCenter();
    characterStore.clearCharacterRight();
  };

  const handleResetCharacters = () => {
    setResetCharacters(true);

    characterStore.clearCharacterLeft();
    characterStore.clearCharacterCenter();
    characterStore.clearCharacterRight();
  };

  return (
    <motion.aside
      layout
      initial={
        isMobile && isSidebarOpen ? { width: "var(--sidebar-width)" } : false
      }
      className={styles.sidebarContainer}
      animate={{ width: isSidebarOpen ? "var(--sidebar-width)" : 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <motion.div
        className={styles.sidebarContent}
        initial={isMobile && isSidebarOpen ? { opacity: 1 } : false}
        animate={{ opacity: isSidebarOpen ? 1 : 0 }}
        transition={{
          opacity: {
            duration: 0.2,
            delay: isSidebarOpen ? 0.2 : 0,
            ease: "easeInOut",
          },
        }}
        style={{ pointerEvents: isSidebarOpen ? "auto" : "none" }}
      >
        <div className={styles.topSidebarContent}>
          <Logo />

          <div className={styles.selectContainer}>
            <Select
              title="Scenario"
              data={sceneStore.getFiles()}
              selectType="scene"
              isReset={resetScene}
              setIsReset={setResetScene}
              isSidebarOpen={isSidebarOpen}
            />
            <Select
              title="Character - Left"
              hasFlipButton
              data={characterStore.getFiles()}
              selectType="charLeft"
              isReset={resetCharacters}
              setIsReset={setResetCharacters}
              isSidebarOpen={isSidebarOpen}
            />
            <Select
              title="Character - Center"
              hasFlipButton
              data={characterStore.getFiles()}
              selectType="charCenter"
              isReset={resetCharacters}
              setIsReset={setResetCharacters}
              isSidebarOpen={isSidebarOpen}
            />
            <Select
              title="Character - Right"
              hasFlipButton
              data={characterStore.getFiles()}
              selectType="charRight"
              isReset={resetCharacters}
              setIsReset={setResetCharacters}
              isSidebarOpen={isSidebarOpen}
            />
          </div>

          <div className={styles.btnContainer}>
            <div className={styles.resetWrapper}>
              <Button
                appearance="secondary"
                text="Reset All"
                onClick={handleResetAll}
              />

              <Button
                appearance="secondary"
                text="Reset Chars"
                onClick={handleResetCharacters}
              />
            </div>

            <Button
              appearance="primary"
              text="Back to Home"
              onClick={() => {
                handleResetAll();
                navigate("/");
              }}
            />
          </div>
        </div>

        <TeamLogo size={{ width: "42px", height: "48px" }} />
      </motion.div>
    </motion.aside>
  );
};

export default Sidebar;
