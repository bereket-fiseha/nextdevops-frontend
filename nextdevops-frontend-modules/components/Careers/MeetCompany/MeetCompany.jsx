import React from 'react';
import YouTube from 'react-youtube';
import { useTranslation } from 'react-i18next';




const opts = {
    height: "400px",
    width: "100%",
    playerVars: {
      autoplay: 0,
      controls: 0,
      rel: 0,
      modestbranding: 1
    },
  };

const MeetCompany = () => {
  const {t} = useTranslation();

    return (
        <div className="container" style={{ margin: '100px auto'}}>
            <div className="row justify-content-center">
                <div className="col-md-12">
                <h1 className="text-center" style={{ marginBottom: '50px'}}>{t('careers page meet company')}</h1>
                </div>
                <div className="col-md-8">
                    <YouTube videoId="sIlCR4eG8_o" opts={opts} />
                </div>
            </div>
        </div>
    )
}

export default MeetCompany
