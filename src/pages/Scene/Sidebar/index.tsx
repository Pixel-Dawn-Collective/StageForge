import { motion } from "motion/react";
import styles from "./sidebar.module.scss";
import Button from "../../../components/Button";
import Logo from "../../../components/Logo";
import { useNavigate } from "react-router-dom";
import TeamLogo from "../../../components/TeamLogo";
import Select from "./Select";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ x: "-400px" }}
      animate={{ x: "0px" }}
      exit={{ x: "-400px" }}
      transition={{ ease: "easeInOut", duration: 0.4 }}
      className={styles.sidebarContainer}
    >
      <div className={styles.topSidebarContent}>
        <Logo size={{ width: "auto", height: "52px" }} />
        <div className={styles.selectContainer}>
          <Select title="Scenario" data={[]} key="scenario-select" />
          <Select
            key="character-l-select"
            title="Character - Left"
            hasFlipButton
            data={[]}
          />
          <Select
            key="character-c-select"
            title="Character - Center"
            hasFlipButton
            data={[]}
          />
          <Select
            key="character-r-select"
            title="Character - Right"
            hasFlipButton
            data={[]}
          />
        </div>
        <div className={styles.btnContainer}>
          <Button appearance="primary" text="Reset" />
          <Button
            onClick={() => navigate("/")}
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
