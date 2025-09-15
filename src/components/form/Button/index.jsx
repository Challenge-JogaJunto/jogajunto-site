import styles from "./style.module.css";
import { FaSpinner } from "react-icons/fa";

export default function Button({
  children,
  width = "auto",
  height = "auto",
  fontSize = "16px",
  fontWeight = "bold",
  textColor = "#FFF",
  bordered = false,
  borderColor = "var(--primaria-2)",
  bgColor = "var(--primaria-2)",
  loading = false,
  onClick,
  isActive = true,
  variant,
  margin,
  type = "button",
}) {
  let buttonStyles = {
    width,
    height,
    fontSize,
    fontWeight,
    margin: margin,
    opacity: isActive && !loading ? "1" : "0.75",
    color: textColor,
    border: bordered ? `2px solid ${borderColor}` : "none",
    cursor: loading ? "not-allowed" : "pointer",
    backgroundColor: loading ? "#ccc" : bgColor,
  };
  if (variant) {
    buttonStyles = {
      ...buttonStyles,
      backgroundColor: "",
      color: "",
      border: "",
    };
  }

  return (
    <button
      type={type}
      className={`text ${styles.button} ${variant ? styles[variant] : ""}`}
      style={buttonStyles}
      onClick={onClick}
      disabled={loading}
    >
      {loading ? <FaSpinner className={"spinner"} /> : children}
    </button>
  );
}
