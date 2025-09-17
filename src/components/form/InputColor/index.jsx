import styles from "./style.module.css";
export function InputColor({
  name,
  placeholder,
  label,
  isDisabled = false,
  error,
  value,
  onChange,
  inputWidth = "80px",
  inputHeight = "40px",
  required,
}) {
  return (
    <div className={styles.inputColor}>
      <label htmlFor={name} className="link" style={{ color: "var(--texto)" }}>
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        name={name}
        className={`${styles.input_color} form-control border-2`}
        type="color"
        id={name}
        placeholder={placeholder}
        required={required}
        onChange={onChange}
        value={value}
        disabled={isDisabled}
        style={{
          width: inputWidth,
          height: inputHeight,
        }}
      />

      {error && <p className="my-1 text-danger">{error}</p>}
    </div>
  );
}
