import styles from "./select.module.css";
export default function Select({
  value,
  label,
  id,
  width = "100%",
  onChange,
  isDisabled = false,
  required = false,
  options = [],
}) {
  return (
    <div
      className={styles.input_container}
      style={{ width: "100%", maxWidth: width }}
    >
      <label htmlFor={id} className="link">
        {label}
        {required && <span className="text-[var(--red)]"> *</span>}
      </label>
      <select
        name={id}
        id={id}
        onChange={onChange}
        required={required}
        disabled={isDisabled}
        value={value}
        // defaultValue={value}
      >
        {options.map((opt, idx) => {
          return (
            <option value={opt.id} key={`selectItem${id}${idx}`}>
              {opt.label}
            </option>
          );
        })}
      </select>
    </div>
  );
}
