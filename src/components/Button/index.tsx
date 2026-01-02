import styles from "./button.module.scss";

interface ButtonProps {
  onClick?: () => void;
  appearance: "primary" | "secondary";
  text: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, appearance, text }) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.sidebarButton} ${
        appearance === "primary" ? styles.primary : styles.secondary
      }`}
    >
      {text}
    </button>
  );
};

export default Button;
