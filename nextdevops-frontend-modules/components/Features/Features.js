import React from 'react';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import SingleFeature from './SingleFeature';
import { useTranslation } from 'react-i18next';


const bgColors = ["f1eff8", "fbe6d4", "f0fffc", "f8e1eb"];

const Features = () => {
  const {t} = useTranslation();

    return (
        <section className="features-section">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-5 col-md-12">
                        <div className="features-content-area">
                            <span>{t('about us page care feature')}</span>
                            <h3>{t('about us page care feature title')}</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>

                            <div className="features-btn">
                                <Link href="#">
                                    <a className="features-btn-one">{t('about us page care feature button')}</a>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-7 col-md-12">
                        <div className="row">
                            {

                                bgColors.map((item, key) => (
                                    <SingleFeature key={key} bgColor={item} icon={faGlobe} />
                                ))

                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Features;