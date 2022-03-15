import React from 'react';
import styles from '../../styles/TeamSection.module.css';
import SingleTeamCard from './SingleTeamCard';
import { useTranslation } from 'react-i18next';

const TeamCard = () => {
  const {t} = useTranslation();
  return (
        <section className={styles.team_section}>
            <div className="container">
                <div className="section-title">
                    <span>{t("team")}</span>
                    <h3>{t("meet our team")}</h3>
                </div>

                <div className="row">
                    {
                        [1, 2, 3].map((item) => (
                            <SingleTeamCard key={item} />
                        ))
                    }

                </div>
            </div>
        </section>
    );
}

export default TeamCard;