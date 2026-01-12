import { type SetStateAction } from "react";
import styles from "./flagButton.module.scss";
import { motion } from "motion/react";
import { Menu, X } from "feather-icons-react";

interface FlagButtonProps {
  isSidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<SetStateAction<boolean>>;
}

const FlagButton: React.FC<FlagButtonProps> = ({
  isSidebarOpen,
  setSidebarOpen,
}) => {
  return (
    <motion.div
      layout
      transition={{ ease: "easeInOut", duration: 0.4 }}
      className={styles.flagBackground}
      onClick={() => setSidebarOpen(!isSidebarOpen)}
    >
      {isSidebarOpen ? <X color="white" /> : <Menu color="white" />}
    </motion.div>
  );
};

export default FlagButton;
