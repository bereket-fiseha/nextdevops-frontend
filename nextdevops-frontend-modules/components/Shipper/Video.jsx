import React from "react";
import YouTube from "react-youtube";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { makeStyles } from "@material-ui/core";
import { useTranslation } from 'react-i18next';

const opts = {
  width: "100%",
  height: "300px",
  playerVars: {
    autoplay: 0,
    controls: 0,
    rel: 0,
    modestbranding: 1,
  },
};

const useStyles = makeStyles({
  root: {
    "& svg": {
      maxWidth: 20,
      maxHeight: 20,
    },
  },
});

const Video = () => {
  const classes = useStyles();
  const {t} = useTranslation();
  return (
    <div className={`container shipper-video ${classes.root}`}>
      <div className="row">
        <div className="col-md-4">
          <div className="shipper-video-section">
            <YouTube videoId="sIlCR4eG8_o" opts={opts} />
          </div>
        </div>
        <div className="col-md-8">
          <p>
            <FontAwesomeIcon size="xs" icon={faCheck} /> {t("instant qoute")}{" "}
            <FontAwesomeIcon size="xs" icon={faInfoCircle} />
          </p>
          <p>
            <FontAwesomeIcon size="xs" icon={faCheck} /> {t("process")}{" "}
            <FontAwesomeIcon size="xs" icon={faInfoCircle} />
          </p>
          <p>
            <FontAwesomeIcon size="xs" icon={faCheck} /> {t("requirements")}{" "}
            <FontAwesomeIcon size="xs" icon={faInfoCircle} />
          </p>
          <p>
            <FontAwesomeIcon size="xs" icon={faCheck} /> {t("spot contract")} <FontAwesomeIcon size="xs" icon={faInfoCircle} />
          </p>
          <p>
            <FontAwesomeIcon size="xs" icon={faCheck} /> {t("statistics")}{" "}
            <FontAwesomeIcon size="xs" icon={faInfoCircle} />
          </p>
          <p>
            <FontAwesomeIcon size="xs" icon={faCheck} /> {t("pay online")}{" "}
            <FontAwesomeIcon size="xs" icon={faInfoCircle} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Video;
