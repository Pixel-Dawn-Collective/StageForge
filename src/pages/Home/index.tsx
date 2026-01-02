import Logo from "../../components/Logo";
import MenuButton from "../../components/MenuButton";
import TeamLogo from "../../components/TeamLogo";
import styles from "./home.module.scss";

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <div>
        <Logo size={{ width: "780px", height: "auto" }} />
        <div className={styles.menuButtonContainer}>
          <MenuButton to="/scene" logo="scene" text="Start Scene" />
          <MenuButton to="/library" logo="library" text="Edit Library" />
        </div>
      </div>

      <TeamLogo size={{ width: "auto", height: "128px" }} />
    </div>
  );
};

export default Home;
