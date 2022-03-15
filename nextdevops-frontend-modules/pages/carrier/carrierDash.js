import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import {
  getCarrierDetails,
  setCarrierDetailsFromLocalStorage,
  setCarrierDetails,
} from "../../redux/actions/carrierRegistration";
import CarrierRegistration from "../../components/CarrierRegistration";
import { connect } from "react-redux";

const CarrierDash = (props) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        setUser(user);
        const carrierDetails = localStorage.getItem("carrierDetails");
        props.setCarrierDetailsFromLocalStorage(carrierDetails);
        // this filled form data needs to populate local as we dont have it when we register
      })
      .catch((err) => setUser(null));
  }, []);

  return (
    <div style={{ padding: "100px 0" }}>
      {user && (
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <CarrierRegistration
                email={user.attributes.email}
                phone={user.attributes.phone_number}
                userId={user.attributes.sub}
                setCarrierDetails={props.setCarrierDetails}
                carrierDetails={props.carrierDetails}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    carrierDetails: state.carrierDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCarrierDetails: (carrierId, email) =>
      getCarrierDetails(dispatch, carrierId, email),
    setCarrierDetailsFromLocalStorage: (carrierDetails) =>
      setCarrierDetailsFromLocalStorage(dispatch, carrierDetails),
    setCarrierDetails: (data, checkCarrierRegistration) =>
      setCarrierDetails(dispatch, data, checkCarrierRegistration),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CarrierDash);
