import React, { Fragment, useState } from "react";
import styles from "../styles/Nav.module.css";
import { UpdateShipmentStatus, TrackingForm } from "../components/Tracking/";
import { usePosition } from "use-position";
import { postTrackingStatus } from "../redux/actions/TrackingAction";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";

const Tracking = ({ postTrackingStatus }) => {
  const { latitude, longitude, speed, timestamp, accuracy, error } =
    usePosition(true, { enableHighAccuracy: true });
  const [displayLocation, setDisplayLocation] = useState("");
  setTimeout(() => {
    latitude ? setDisplayLocation(true) : setDisplayLocation(false);
  }, 5000);
  return (
    <div className={styles.center}>
      {latitude ? (
        <UpdateShipmentStatus
          latitude={latitude}
          longitude={longitude}
          timestamp={timestamp}
          quoteId="f496af80-f673-46b4-aa32-45835e00a86d655a2a17-ba90-4d04-b5d9-48c4a67da571"
          postTrackingStatus={postTrackingStatus}
        />
      ) : (
        <Fragment>
          {displayLocation === "" && <CircularProgress />}
          {displayLocation === "" && <div>We are fetching your location</div>}

          {displayLocation === false && (
            <TrackingForm
              quoteId="8a2d88a0-2e5d-4d5f-9b3c-bcac82f7e46cc1"
              postTrackingStatus={postTrackingStatus}
            />
          )}
        </Fragment>
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    postTrackingStatus: (data) => postTrackingStatus(dispatch, data),
  };
};

export default connect(null, mapDispatchToProps)(Tracking);
