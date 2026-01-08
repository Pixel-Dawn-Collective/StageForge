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
            <div className={styles.imageFrame} key={file.name + "-div"}>
              <div className={styles.imageFrameInner}>
                <img
                  src={getImage(file)}
                  alt={file.name}
                  key={file.name + "-img"}
                />
                <div className={styles.imageName} key={file.name}>
                  {file.name}
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ImageFrame;
