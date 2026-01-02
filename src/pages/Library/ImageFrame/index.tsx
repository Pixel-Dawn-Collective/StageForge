import styles from "./imageFrame.module.scss";

interface ImageFrameProps {
  files: File[];
}

const ImageFrame: React.FC<ImageFrameProps> = ({ files }) => {
  const getImage = (file: File) => {
    return URL.createObjectURL(file);
  };

  return (
    <div className={styles.gridContainer}>
      {files.length > 0 && (
        <>
          {files.map((file) => (
            <div className={styles.imageFrame}>
              <img src={getImage(file)} alt={file.name} />
              <div className={styles.imageName}>{file.name}</div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ImageFrame;
