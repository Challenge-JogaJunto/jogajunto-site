import { useState } from "react";
import "react-calendar/dist/Calendar.css";
import DatePicker from "react-date-picker";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IMaskInput } from "react-imask";
import styles from "./input.module.css";

export default function InputField({
  value,
  label,
  placeholder = "",
  type = "text",
  id,
  width = "100%",
  icon = null,
  onChange,
  mask = null,
  isDisabled = false,
  required = false,
  className = "",
  ref,
  maxLength,
  minLength,
}) {
  const [view, setView] = useState("password");
  const [isOpen, setIsOpen] = useState(false);

  let filteredType;
  switch (type) {
    case "password":
      filteredType = view;
      break;
    case "year":
      filteredType = "text";
      break;
    default:
      filteredType = type;
      break;
  }
  return (
    <div
      className={styles.input_container}
      style={{
        width: "100%",
        maxWidth: width,
        marginTop: label ? "1.6rem" : "0.4rem",
      }}
    >
      {label && (
        <label htmlFor={id} className="link">
          {label}
          {required && <span className="text-[red]"> *</span>}
        </label>
      )}
      {type === "year" ? (
        <>
          <DatePicker
            onChange={(val) => {
              const ano = val instanceof Date ? val.getFullYear() : "";
              onChange(ano);
              setIsOpen(false);
            }}
            value={value ? new Date(value, 0, 1) : ""}
            isOpen={isOpen}
            onCalendarOpen={() => setIsOpen(true)}
            onCalendarClose={() => setIsOpen(false)}
            inputReadOnly={true}
            format="y"
            showLeadingZeros={true}
            clearIcon={null}
            calendarIcon={null}
            maxDetail="decade"
            minDetail="decade"
            className={[styles.customDatePicker]}
            calendarProps={{
              className: `${styles.customCalendar} ${
                isOpen ? styles.active : styles.desactived
              }`,
            }}
          />
        </>
      ) : (
        <>
          {!mask ? (
            <input
              value={value}
              type={filteredType}
              name={id}
              id={id}
              className={`text ${className}`}
              placeholder={`${placeholder}...`}
              onChange={onChange}
              disabled={isDisabled}
              required={required}
              minLength={minLength}
              maxLength={maxLength}
              ref={ref}
            />
          ) : (
            <IMaskInput
              mask={mask}
              value={value}
              name={id}
              id={id}
              className="text"
              placeholder={`${placeholder}...`}
              onAccept={(val) => onChange(val)}
              disabled={isDisabled}
              required={required}
              minLength={minLength}
            />
          )}
        </>
      )}

      {icon && <span className={styles.icon}>{icon}</span>}

      {type === "password" && (
        <div
          className={styles.icon}
          onClick={() => {
            if (view === "password") {
              setView("text");
            } else {
              setView("password");
            }
          }}
        >
          {view === "password" ? <FaEye /> : <FaEyeSlash />}
        </div>
      )}
    </div>
  );
}
