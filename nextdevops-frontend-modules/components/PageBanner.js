import React from 'react';
import Link from 'next/link';
import styles from '../styles/PageBanner.module.css';
import { useTranslation } from 'react-i18next';

const PageBanner = ({ pageTitle, firstText, firstTextLink, secondText }) => {
    const {t} = useTranslation();
    return (
        <div className={styles.page_title_area}>
            <div className="container">
                <div className={styles.page_title_content}>
                    <h2>{t(pageTitle)}</h2>
                    <ul>
                        <li>
                            <Link href={firstTextLink}>
                                <a>{firstText}</a>
                            </Link>
                        </li>
                        <li>{secondText}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default PageBanner;