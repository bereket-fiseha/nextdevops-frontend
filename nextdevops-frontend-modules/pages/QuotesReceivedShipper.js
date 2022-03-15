import React, { useState, useEffect } from "react";
import ReceivedQuotesTable from "../components/Shipper/ReceivedQuotesTable";
import {
  getShipperReceievedQuotes,
  getProposalDetails,
  getProposalAcceptanceStatus,
  setShipperId,
  setShipperDetailsFromLocalStorage
} from "../redux/actions/shipperRegistration";
import FullPageLoader from "../components/Helper/FullPageLoader";
import Modal from "../components/Modal/Index";
import moment from "moment";
import router from "next/router";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";

const QuotesReceivedShipper = props => {
  const [quoteDetails, setQuoteDetails] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [displayModal, setDisplayModal] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const tillDate = moment().format("YYYY-MM-DD");
  const { t } = useTranslation();
  // decreasing 15days from today
  const fromDate = moment()
    .subtract(15, "days")
    .format("YYYY-MM-DD");

  useEffect(async () => {
    setShowLoader(true);
    const shipperDetails = localStorage.getItem("shipperDetails");
    const { shipperId } = JSON.parse(shipperDetails);
    await props.setShipperId(shipperId);
    await props.setShipperDetailsFromLocalStorage(JSON.parse(shipperDetails));

    props
      .getShipperReceievedQuotes(shipperId, fromDate, tillDate)
      .then(res => {
        setShowLoader(false);
        setQuoteDetails(res.data);
        setDisplayModal(true);
      })
      .catch(err => {
        if (err.response.status === 404) {
          setShowLoader(false);
          setQuoteDetails([]);
          setDisplayModal(true);
        }
      });
  }, []);

  const handleModalClose = () => {
    setShowModal(!showModal);
    router.push("/Dashboard");
  };
  return (
    <>
      {showLoader && <FullPageLoader />}
      <div className="root-container">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {quoteDetails.length !== 0 && (
                <ReceivedQuotesTable
                  data={quoteDetails}
                  getProposalDetails={props.getProposalDetails}
                  getProposalAcceptanceStatus={
                    props.getProposalAcceptanceStatus
                  }
                  getShipperReceievedQuotes={props.getShipperReceievedQuotes}
                  propsTillDate={tillDate}
                  propsFromDate={fromDate}
                  shipperId={props.shipperDetails.loggedInUserId}
                  setShowLoader={setShowLoader}
                  setQuoteDetails={setQuoteDetails}
                />
              )}
              {quoteDetails.length === 0 && displayModal && (
                <Modal
                  show={showModal}
                  title={t("NO_QUOTE_SENT")}
                  handleClose={handleModalClose}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    shipperDetails: state.shipperDetails,
    carrierDetails: state.carrierDetails
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setShipperId: shipperId => setShipperId(dispatch, shipperId),
    getShipperReceievedQuotes: (shipperId, from, till) =>
      getShipperReceievedQuotes(dispatch, shipperId, from, till),
    getProposalDetails: proposalId => getProposalDetails(dispatch, proposalId),
    getProposalAcceptanceStatus: (
      quoteId,
      acceptanceStatus,
      role,
      comment,
      timeStamp,
      carrierAcceptance,
      count
    ) =>
      getProposalAcceptanceStatus(
        dispatch,
        quoteId,
        acceptanceStatus,
        role,
        comment,
        timeStamp,
        carrierAcceptance,
        count
      ),
    setShipperDetailsFromLocalStorage: data =>
      setShipperDetailsFromLocalStorage(dispatch, data)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuotesReceivedShipper);
