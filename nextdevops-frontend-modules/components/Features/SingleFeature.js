import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';

const SingleFeature = ({ icon, bgColor }) => {
  const {t} = useTranslation();
  return (
        <div className="col-lg-6 col-md-6 col-sm-6">
            <div className={`single-features-item bg-${bgColor}`}>
                <div className="icon">
                    <FontAwesomeIcon icon={icon} />
                </div>
                <h3>{t("feature name")}</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
            </div>
        </div>
    )
}

export default SingleFeature
