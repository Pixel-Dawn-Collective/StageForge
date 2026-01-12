import { useNavigate } from "react-router-dom";
import LoadIcon from "../LoadIcon";
import styles from "./menuButton.module.scss";
import type { IconName } from "../LoadIcon/icons";

interface MenuButtonProps {
  size?: "default" | "small";
  appearance?: "default" | "selected";
  icon: IconName;
  text?: string;
  to: string;
}

const MenuButton: React.FC<MenuButtonProps> = ({
  size = "default",
  appearance = "default",
  icon,
  text,
  to,
}) => {
  const navigate = useNavigate();

  const isDisabled = appearance === "selected";

  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={() => navigate(to)}
      className={`${styles.menuButton} ${
        size === "default" ? styles.sizeDefault : styles.sizeSmall
      } ${appearance === "default" ? styles.default : styles.selected}`}
    >
      {/* Cantos decorativos */}
      {size === "default" && (
        <>
          <div className={`${styles.corner} ${styles.top} ${styles.left}`} />
          <div className={`${styles.corner} ${styles.top} ${styles.right}`} />
          <div className={`${styles.corner} ${styles.bottom} ${styles.left}`} />
          <div
            className={`${styles.corner} ${styles.bottom} ${styles.right}`}
          />
        </>
      )}

      {/* Ícone */}
      <LoadIcon
        className={size === "default" ? styles.iconDefault : styles.iconSmall}
        icon={icon}
        status={appearance}
      />

      {/* Texto */}
      {text && <span className={styles.menuButtonText}>{text}</span>}
    </button>
  );
};

export default MenuButton;
