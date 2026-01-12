import { useEffect, useState } from "react";
import { formatFileName } from "../../../utils/formatFileName";
import styles from "./imageFrame.module.scss";
import { X } from "feather-icons-react";

interface ImageFrameProps {
  files: File[];
  onRemove: (file: File) => void;
}

const ImageFrame: React.FC<ImageFrameProps> = ({ files, onRemove }) => {
  const [imageUrls, setImageUrls] = useState<Record<string, string>>({});

  useEffect(() => {
    const urls: Record<string, string> = {};

    files.forEach((file) => {
      urls[file.name] = URL.createObjectURL(file);
    });

    setImageUrls(urls);

    return () => {
      Object.values(urls).forEach((url) => URL.revokeObjectURL(url));
    };
  }, [files]);

  const handleDelete = (e: React.MouseEvent, file: File) => {
    e.stopPropagation();

    const confirmDelete = window.confirm(
      `Remove "${file.name}" from the library?`
    );

    if (confirmDelete) {
      onRemove(file);
    }
  };

  return (
    <div className={styles.gridContainer}>
      {files.map((file) => (
        <div
          className={styles.imageFrame}
          key={file.name}
          title={formatFileName(file.name)}
        >
          <div className={styles.imageFrameInner}>
            <img src={imageUrls[file.name]} alt={file.name} />
            <div className={styles.imageName}>{formatFileName(file.name)}</div>

            <button
              type="button"
              className={styles.deleteBtn}
              onClick={(e) => handleDelete(e, file)}
              aria-label={`Remove ${file.name}`}
            >
              <X color="#e7c74b" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageFrame;
