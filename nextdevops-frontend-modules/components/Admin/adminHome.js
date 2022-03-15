import React, { useEffect } from "react";
import { Auth } from "aws-amplify";
import { setAdminId } from "../../redux/actions/adminRegistration";
import { connect } from "react-redux";

const AdminHome = (props) => {
  useEffect(() => {
    // Access the user session on the client
    Auth.currentAuthenticatedUser()
      .then((user) => {
        localStorage.setItem("user", true);
        const adminId = user.attributes.sub;
        const email = user.attributes.email;
        props.setAdminId(adminId);
        localStorage.setItem("admin", true);
        // props.getShipperDetails(shipperId, email);
        // props.setShipperId(shipperId);
        // props.setCarrierId('');
      })
      .catch((err) => localStorage.setItem("user", false));
  }, []);
  return <div className="Admin-landing">Admin landing</div>;
};

const mapStateToProps = (state) => {
  return {
    shipperDetails: state.shipperDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAdminId: (adminId) => setAdminId(dispatch, adminId),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminHome);
