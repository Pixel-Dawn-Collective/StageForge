import { useState } from "react";
import Sidebar from "./Sidebar";
import FlagButton from "./FlagButton";
import styles from "./scene.module.scss";
import { AnimatePresence } from "motion/react";

const Scene = () => {
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <div
      className={styles.background}
      aria-label="Image defined by user, can be changed"
    >
      <AnimatePresence>{isSidebarOpen && <Sidebar />}</AnimatePresence>
      <FlagButton
        isSidebarOpen={isSidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
    </div>
  );
};

export default Scene;
