import { BsPlus } from "react-icons/bs";
import styles from "./style.module.css";
import { useEffect, useRef, useState } from "react";
import useIconsOptions from "../../../utils/useIconsOptions";

export function InputIcon({
  name,
  label,
  isDisabled = false,
  error,
  value,
  onChange,
  required,
  inputWidth = "100%",
  inputHeight = "80px",
}) {
  const { selectIcon, iconList } = useIconsOptions();
  const [openContainer, setOpenContainer] = useState(false);
  const wrapperRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpenContainer(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  let SelectedIcon;

  if (value != "" && value) {
    SelectedIcon = selectIcon(value);
  }

  const [visibleCount, setVisibleCount] = useState(50);
  const loadMore = () => setVisibleCount((prev) => prev + 50);

  useEffect(() => {
    if (!openContainer) {
      setVisibleCount(50);
    }
  }, [openContainer]);
  return (
    <div style={{ position: "relative" }} ref={wrapperRef}>
      <label
        htmlFor={name}
        className="link"
        style={{ color: "var(--text-color)" }}
      >
        {label}
        {required && <span className="text-[red]"> *</span>}
      </label>
      <input
        type="hidden"
        name={name}
        id={name}
        required={required}
        onChange={onChange}
        value={value}
        disabled={isDisabled}
      />
      <div
        className={styles.icon_preview}
        onClick={() => {
          setOpenContainer(!openContainer);
        }}
        style={{
          width: inputWidth,
          height: inputHeight,
        }}
      >
        <div className={styles.icon}>
          {SelectedIcon ? <SelectedIcon /> : <BsPlus />}
        </div>
      </div>
      <div
        className={styles.icons_container}
        style={{
          display: openContainer ? "flex" : "none",
          overflowY: "auto",
          maxHeight: 300,
        }}
        onScroll={(e) => {
          const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
          if (scrollTop + clientHeight >= scrollHeight - 10) {
            loadMore();
          }
        }}
      >
        {iconList.slice(0, visibleCount).map(({ id, Icon }) => (
          <div
            key={id}
            className={`${styles.icon} ${styles.icon_select} ${
              value === id ? styles.selected : ""
            }`}
            onClick={() => {
              const event = {
                target: {
                  value: id,
                  name: name,
                },
              };
              onChange(event);
              setOpenContainer(false);
            }}
          >
            {Icon && <Icon />}
          </div>
        ))}
      </div>

      {error && <p className="my-1 text-danger">{error}</p>}
    </div>
  );
}
