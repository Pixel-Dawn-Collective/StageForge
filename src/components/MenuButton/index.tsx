import { useNavigate } from "react-router-dom";
import styles from "./menuButton.module.scss";

interface MenuButtonProps {
  size?: "default" | "small";
  appearance?: "default" | "selected";
  logo: "scene" | "library" | "home";
  text?: string;
  to: string;
}

const MenuButton: React.FC<MenuButtonProps> = ({
  size = "default",
  appearance = "default",
  logo,
  text,
  to,
}) => {
  const navigate = useNavigate();

  const handleDisabled = () => {
    return appearance === "selected" ? true : false;
  };

  return (
    <button
      disabled={handleDisabled()}
      onClick={() => navigate(to)}
      className={`${styles.menuButton} ${
        size === "default" ? styles.sizeDefault : styles.sizeSmall
      } ${appearance === "default" ? styles.default : styles.selected}`}
    >
      <div
        className={
          size === "default"
            ? `${styles.corner} ${styles.top} ${styles.left}`
            : ""
        }
      ></div>
      <div
        className={
          size === "default"
            ? `${styles.corner} ${styles.top} ${styles.right}`
            : ""
        }
      ></div>
      <div
        className={
          size === "default"
            ? `${styles.corner} ${styles.bottom} ${styles.left}`
            : ""
        }
      ></div>
      <div
        className={
          size === "default"
            ? `${styles.corner} ${styles.bottom} ${styles.right}`
            : ""
        }
      ></div>
      <img
        className={`${styles.menuButtonImg} ${
          size === "default" ? styles.sizeDefault : styles.sizeSmall
        } ${appearance === "default" ? styles.default : styles.selected}`}
        alt={text}
        src={`/src/assets/icons/${appearance}-${logo}-icon.svg`}
      />
      {text}
    </button>
  );
};

export default MenuButton;
