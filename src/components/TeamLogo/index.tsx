import { a } from "motion/react-client";
import styles from "./teamLogo.module.scss";

interface TeamLogoProps {
  size: { width: string; height: string };
}

const TeamLogo: React.FC<TeamLogoProps> = ({ size }) => {
  return (
    <a href="https://pixeldawn.xyz" target="_blank">
      <img
        className={styles.teamLogo}
        style={size}
        src={"./src/assets/pixeldawn-logo.svg"}
      />
    </a>
  );
};

export default TeamLogo;
