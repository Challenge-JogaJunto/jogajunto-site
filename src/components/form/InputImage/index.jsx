import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { MdOutlinePhotoCamera } from "react-icons/md";
import styles from "./inputImage.module.css";

const ImageUploader = ({
  image,
  setImage,
  id,
  buttonHeight,
  label,
  adicionalStyle,
}) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setError(null);
    setLoading(true);

    try {
      setImageUrl(URL.createObjectURL(file));
      setImage(file);
    } catch (err) {
      setError("Erro ao processar a imagem. Tente novamente.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (image) {
      setImageUrl(image);
    } else {
      setImageUrl(null);
    }
  }, []);

  return (
    <div
      className={styles.upload_container}
      style={{
        width: "100%",
        height: buttonHeight || "inherit",
        ...adicionalStyle,
      }}
    >
      {label && <div className={`link ${styles.label}`}>{label}</div>}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        id={`imageInput${id}`}
        hidden
        // required={required}
        name={`imageInput${id}`}
      />

      <label htmlFor={`imageInput${id}`} className={styles.upload_button}>
        {loading ? (
          <>
            <FaSpinner className={"spinner"} />
          </>
        ) : (
          <>
            <MdOutlinePhotoCamera />
          </>
        )}
      </label>

      {error && <div className="error-message">{error}</div>}

      <div className={styles.image_preview_container}>
        {imageUrl && (
          <div className={styles.image_column}>
            <img
              src={String(imageUrl)}
              alt="imagem"
              className="preview-image"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
