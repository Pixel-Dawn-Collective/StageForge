import { Repeat } from "feather-icons-react";
import styles from "./select.module.scss";

interface SelectProps {
  data: File[];
  title: string;
  hasFlipButton?: boolean;
}

const Select: React.FC<SelectProps> = ({ hasFlipButton, title, data }) => {
  const handleData = () => {
    if (data.length === 0) {
      return <option value={0}>Select a folder in the library first</option>;
    }

    if (data.length > 0) {
      data.map((file, i) => <option key={file.name + i} value={i + 1} />);
    }
  };

  return (
    <>
      <div className={styles.infoContainer}>
        <p className={styles.selectTitle}>{title}</p>
        <div className={styles.selectWrapper}>
          <select className={styles.select}>{handleData()}</select>
          {hasFlipButton && (
            <div className={styles.flipButton}>
              <Repeat />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Select;
