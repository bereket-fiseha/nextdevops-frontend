import React from "react";
import Link from "next/link";
import styles from "../../styles/HeaderButton.module.css";
import { Col } from "react-bootstrap";

const HeaderButton = ({ href, imgUrl, title }) => {
  return (
    <Col className={styles.btn_col}>
      <Link href={href} passHref>
        <div className={styles.container}>
          <img src={imgUrl} alt="" />
          <h4>{title}</h4>
        </div>
      </Link>
    </Col>
  );
};

export default HeaderButton;
