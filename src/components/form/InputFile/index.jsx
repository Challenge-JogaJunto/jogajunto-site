import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import styles from "./input.module.css";

export default function InputFile({
  label,
  placeholder = "",
  id,
  width = "100%",
  icon = null,
  onChange,
  isDisabled = false,
  required = false,
  value,
}) {
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onChange(file);
    } else {
      toast.error("Arquivo muito pesado!");
      e.target.value = null;
    }
  };

  // sempre que o `value` for null, undefined ou ""
  // limpa o campo manualmente
  useEffect(() => {
    if (!value && inputRef.current) {
      inputRef.current.value = null;
    }
  }, [value]);

  return (
    <div
      className={styles.input_container}
      style={{ width: "100%", maxWidth: width }}
    >
      <label htmlFor={id} className="link">
        {label}
        {required ? <span style={{ color: "var(--red)" }}> * </span> : ""}
      </label>
      <input
        ref={inputRef}
        type="file"
        name={id}
        id={id}
        className="text"
        placeholder={`${placeholder}...`}
        onChange={handleChange}
        disabled={isDisabled}
        required={required}
      />

      {icon && <span className={styles.icon}>{icon}</span>}
    </div>
  );
}
