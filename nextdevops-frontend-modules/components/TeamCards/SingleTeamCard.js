import React from 'react'
import Link from 'next/link';
import styles from '../../styles/TeamSection.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faLinkedin, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { useTranslation } from 'react-i18next';

const SingleTeamCard = () => {
  const {t} = useTranslation();
  return (
        <div className="col-lg-4 col-sm-6">
            <div className={styles.team_item_area}>
                <div className="team-image">
                    <img src={require("../../image/team/1.jpg")} alt="image" />
                </div>

                <div className={styles.team_content}>
                    <h3>Lorem Ipsum</h3>
                    <span>{t("ceo & founder")}</span>

                    <ul className={styles.team_social} >
                        <li>
                            <Link href="#">
                                <a>
                                    <FontAwesomeIcon icon={faLinkedin} />
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="#">
                                <a>
                                    <FontAwesomeIcon icon={faFacebook} />
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="#">
                                <a>
                                    <FontAwesomeIcon icon={faTwitter} />
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="#">
                                <a>
                                    <FontAwesomeIcon icon={faInstagram} />
                                </a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default SingleTeamCard
