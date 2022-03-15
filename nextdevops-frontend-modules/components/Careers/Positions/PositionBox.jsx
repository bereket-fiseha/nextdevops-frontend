import React from 'react'
import { useTranslation } from 'react-i18next';

const PositionBox = () => {
  const {t} = useTranslation();
  return (
        <div className="col-md-4" style={{ padding: '20px 20px'}}>
            <div className="position-box" style={{ border: '1px solid rgba(0, 0, 0, 0.3)'}}>
                <div className="position-box-content" style={{ padding: '30px 70px 20px 25px'}}>
                    <h1 style={{ fontSize: '5rem', color: '#eaede8'}}>3</h1>
                    <p className="positition-box-title" style={{ fontSize: '1.2rem'}}>
                        {t("creative & design")}
                    </p>
                    <p className="postition-box-address" style={{ fontSize: '1rem', color: '#767676'}}>{t("new york")}</p>
                </div>
            </div>
        </div>
    )
}

export default PositionBox
