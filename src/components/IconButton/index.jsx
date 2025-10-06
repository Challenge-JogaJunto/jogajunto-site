import { Tooltip } from "react-tooltip";
import styles from "./icon-btn.module.css";
import "react-tooltip/dist/react-tooltip.css";

export default function IconButton({
  onClick,
  icon,
  size = 20,
  tooltip = null,
  btnName,
  color = "var(--texto)",
}) {
  return (
    <>
      <div
        className={styles.iconButton}
        onClick={onClick}
        style={{ fontSize: size, color }}
        data-tooltip-id={btnName}
        data-tooltip-content={tooltip}
      >
        {icon}
      </div>
      {tooltip && <Tooltip id={btnName} />}
    </>
  );
}
