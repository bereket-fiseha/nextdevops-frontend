import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles/Footer.module.css";
import { useTranslation } from 'react-i18next';

const Footer = ({ login = false }) => {
  const {t} = useTranslation();
  return (
    <footer className={styles.footer}>
      <Container>
        <Row>
          <Col sm={6} lg={3} className="text-center text-md-left">
            <h3>{t("shippers")}</h3>
            <ul className="list-unstyled">
              <li>
                <Link className="nav-link" href="/services">
                  {t("services")}
                </Link>
              </li>
              <li>
                <Link href="/benefits">{`- ${t("benefits")}`}</Link>
              </li>
              <li>
                <Link href="/industry">{`- ${t("industry")}`}</Link>
              </li>
              <li>
                <Link href="/faq">{`- ${t("faqs")}`}</Link>
              </li>
            </ul>
          </Col>
          <Col sm={6} lg={3} className="text-center text-md-left">
            <h3>{t("carriers")}</h3>
            <ul className="list-unstyled">
              <li>
                <Link href="/services">{`- ${t("services")}`}</Link>
              </li>
              <li>
                <Link href="/benefits">{`- ${t("benefits")}`}</Link>
              </li>
              <li>
                <Link href="/planner">{`- ${t("trip planner")}`}</Link>
              </li>
              <li>
                <Link href="/faq">{`- ${t("faqs")}`}</Link>
              </li>
            </ul>
          </Col>
          <Col sm={6} lg={3} className="text-center text-md-left">
            <h3>{t("company")}</h3>
            <ul className="list-unstyled">
              <li>
                <Link href="/common/about">{`- ${t("about")}`}</Link>
              </li>
              <li>
                <Link href="/common/careers">{`- ${t("careers")}`}</Link>
              </li>
              <li>
                <Link href="/common/contact">{`- ${t("contact us")}`}</Link>
              </li>
              {!login && (
                <>
                  <li>
                    <Link href="/common/loadfactor">{`- ${t("load factor agent")}`}</Link>
                  </li>
                  <li>
                    <Link href="/common/admin">{`- ${t("lodhi admin")}`}</Link>
                  </li>
                </>
              )}
            </ul>
          </Col>
          <Col sm={6} lg={3} className="text-center text-md-left">
            <h3 className="connect">{t("connect")}</h3>
            <a href="https://facebook.com">
              <FontAwesomeIcon icon={faFacebook} width="1.5em" />
            </a>
            <a href="https://instagram.com">
              <FontAwesomeIcon icon={faInstagram} width="1.5em" />
            </a>
            <a href="https://twitter.com">
              <FontAwesomeIcon icon={faTwitter} width="1.5em" />
            </a>
            <a href="https://linkedIn.com">
              <FontAwesomeIcon icon={faLinkedin} width="1.5em" />
            </a>
          </Col>
        </Row>
        <Row>
          <Col className="text-center" style={{ fontSize: "0.9rem" }}>
            &copy; LOADHITCH {new Date().getFullYear()}
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
