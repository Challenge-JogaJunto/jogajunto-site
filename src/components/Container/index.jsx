import styles from "./style.module.css";
export default function ContainerDiv({ children, className }) {
  return <div className={`${styles.container} ${className}`}>{children}</div>;
}
