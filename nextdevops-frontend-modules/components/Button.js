import styles from "../styles/Button.module.css";
import Link from "next/link";

const Button = ({ title, href }) => {
  return (
    <Link href={href} passHref>
      <div className={styles.button}>
        <h4>{title}</h4>
      </div>
    </Link>
  );
};

export default Button;
