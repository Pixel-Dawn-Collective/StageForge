import Logo from "../../components/Logo";
import MenuButton from "../../components/MenuButton";
import TeamLogo from "../../components/TeamLogo";
import styles from "./home.module.scss";

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.homeContent}>
        <Logo />
        <div className={styles.menuButtonContainer}>
          <MenuButton to="/scene" icon="scene" text="Start Scene" />
          <MenuButton to="/library" icon="library" text="Edit Library" />
        </div>
      </div>

      <TeamLogo size={{ width: "auto", height: "80px" }} />
    </div>
  );
};

export default Home;
