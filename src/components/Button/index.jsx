import styles from "./style.module.css";

export default function Button({
  children,
  onClick,
  type = "button",
  styleClass = "",
  disabled = false,
  variant = "primary",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`text ${styles.button} ${styles[variant]} ${styleClass} `}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
