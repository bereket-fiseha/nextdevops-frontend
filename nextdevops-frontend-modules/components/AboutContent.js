import React from 'react';
import styles from '../styles/AboutContent.module.css';
import { useTranslation } from 'react-i18next';


const AboutContent = () => {
  const {t} = useTranslation();
    return (
        <section className={styles.about_section}>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-5 col-md-12 offset-lg-1">
                        <div className="about-image">
                            <img src={require("../image/about-image.png")} alt="image" />
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-12">
                        <div className={styles.about_area_content}>
                            <span>{t('about us page about span')}</span>
                            <h3>{t('about us page about title')}</h3>
                            <strong>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt labore  dolore magna aliqua.</strong>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                        </div>

                        <div className="row">
                            <div className="col-lg-6 col-6 col--6">
                                <div className={styles.single_info}>
                                    <h3>
                                        1,165
                                            <span className="sign-icon">+</span>
                                    </h3>
                                    <p>Delivery Completed</p>
                                </div>
                            </div>

                            <div className="col-lg-6 col-6 col-6">
                                <div className={styles.single_info}>
                                    <h3>
                                        335
                                            <span className="sign-icon">+</span>
                                    </h3>
                                    <p>Satisfied Clients</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutContent;