import styles from "./logo.module.scss";

const Logo = () => {
  return (
    <>
      <img className={styles.logoImg} src={"./src/assets/header-title.svg"} />
    </>
  );
};

export default Logo;
