import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import ShipperType from "../../components/Shipper/ShipperType";
import {
  getShipperDetails,
  setShipperDetailsFromLocalStorage
} from "../../redux/actions/shipperRegistration";
import ShipperRegistration from "../../components/ShipperRegistration";
import { connect } from "react-redux";

const shipperDash = props => {
  const [user, setUser] = useState(null);
  const [shipperType, setShipperType] = useState(null);

  useEffect(() => {
    // Access the user session on the client
    Auth.currentAuthenticatedUser()
      .then(user => {
        setUser(user);
        const shipperDetails = localStorage.getItem("shipperDetails");
        props.setShipperDetailsFromLocalStorage(JSON.parse(shipperDetails));
      })
      .catch(err => setUser(null));
  }, []);

  return (
    <div className="root-container">
      {user && (
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {shipperType === null && (
                <ShipperType setShipperType={setShipperType} />
              )}
              {shipperType !== null && (
                <ShipperRegistration
                  email={user.attributes.email}
                  phone={user.attributes.phone_number}
                  userId={user.attributes.sub}
                  shipperType={shipperType}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    shipperDetails: state.shipperDetails
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getShipperDetails: (shipperId, email) =>
      getShipperDetails(dispatch, shipperId, email),
    setShipperDetailsFromLocalStorage: shipperDetails =>
      setShipperDetailsFromLocalStorage(dispatch, shipperDetails)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(shipperDash);
