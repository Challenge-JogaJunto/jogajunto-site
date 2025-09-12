import "react-calendar/dist/Calendar.css";
import styles from "./input.module.css";

export default function TextArea({
  value = "",
  label,
  placeholder = "",
  id,
  width = "100%",
  height = "400px",
  onChange,
  isDisabled = false,
  required = false,
  className = "",
  ref,
  maxLength = undefined,
}) {
  return (
    <div
      className={styles.input_container}
      style={{ width: "100%", maxWidth: width, height: height }}
    >
      <label htmlFor={id} className="link">
        {label}
        {required && <span className="text-[red]"> *</span>}
      </label>

      <textarea
        name={id}
        id={id}
        className={`text ${className}`}
        placeholder={`${placeholder}...`}
        onChange={onChange}
        disabled={isDisabled}
        required={required}
        ref={ref}
        value={value}
        maxLength={maxLength}
      ></textarea>
    </div>
  );
}
