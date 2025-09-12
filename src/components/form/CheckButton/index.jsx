import styles from "./checkbutton.module.css";

export default function CheckButton({
  children,
  isChecked,
  width = "fit-content",
  variant = "success",
  onClick,
  disabled = false,
}) {
  return (
    <>
      <div
        onClick={!disabled && onClick}
        className={`${styles.check_button} ${styles[variant]} ${
          isChecked ? styles.ativo : ""
        }`}
        style={{ width, cursor: disabled ? "not-allowed" : "pointer" }}
      >
        {children}
      </div>
    </>
  );
}
