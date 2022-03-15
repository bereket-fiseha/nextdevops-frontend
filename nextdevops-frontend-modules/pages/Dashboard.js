import React, { useEffect, useState } from "react";
import styles from "../styles/Nav.module.css";
import { Line } from "react-chartjs-2";
import clsx from "clsx";
import {
  getShipperDetails,
  setShipperDetailsFromLocalStorage,
  setShipperId
} from "../redux/actions/shipperRegistration";
import {
  setCarrierDetailsFromLocalStorage,
  setCarrierId
} from "../redux/actions/carrierRegistration";
import FullPageLoader from "../components/Helper/FullPageLoader";
import { connect } from "react-redux";
import ReactTooltip from "react-tooltip";
import styled from "styled-components";
import LockIcon from "@mui/icons-material/Lock";
import IconButton from "@mui/material/IconButton";

const ReactTooltipStyled = styled(ReactTooltip)`
  &.type-dark.place-top {
    background-color: green;
    padding: 0.3rem 1rem;
    color: white;
    font-weight: bold;
    font-size: 1.5rem;
    border-radius: 1rem;
    padding-left: 2rem;

    &:after {
      border-top-color: blue;
    }
  }
`;

const Dashboard = props => {
  const [showLoader, setShowLoader] = useState(false);
  useEffect(async () => {
    // Access the user session on the client
    setShowLoader(true);
    if (localStorage.getItem("shipperDetails")) {
      const shipperDetails = localStorage.getItem("shipperDetails");
      props.setShipperDetailsFromLocalStorage(JSON.parse(shipperDetails));
      await props.setShipperId(shipperDetails.shipperId);
      setShowLoader(false);
    } else {
      const carrierDetails = localStorage.getItem("carrierDetails");
      props.setCarrierDetailsFromLocalStorage(JSON.parse(carrierDetails));
      await props.setCarrierId(carrierDetails.carrierId);
      setShowLoader(false);
    }
  }, []);
  const RequestQuotesData = [37, 30, 42, 34, 35, 26, 47, 44, 43, 26, 30, 26];
  const QuotesSubmittedData = [22, 24, 15, 26, 17, 14, 13, 26, 22, 18, 20, 19];
  const QuotesAcceptedData = [5, 10, 12, 4, 2, 6, 8, 2, 10, 8, 5, 3];

  const QuoteActivityData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ],
    datasets: [
      {
        label: "Request of Quotes",
        fontColor: "white",
        data: RequestQuotesData,
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(67, 111, 189, 1)",
        pointBackgroundColor: "rgba(67, 111, 189, 1)",
        lineTension: 0
      },
      {
        label: "Quotes Submitted",
        fontColor: "white",
        data: QuotesSubmittedData,
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(243,127,48, 1)",
        pointBackgroundColor: "rgba(243,127,48, 1)",
        lineTension: 0
      },
      {
        label: "Quotes Accepted",
        fontColor: "white",
        data: QuotesAcceptedData,
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(159,159,159, 1)",
        pointBackgroundColor: "rgba(159,159,159, 1)",
        lineTension: 0
      }
    ]
  };

  const QuoteActivityOptions = {
    responsive: true,
    maintainAspectRatio: false,
    title: {
      display: true,
      text: "Quote Activity",
      fontColor: "white"
    },
    legend: {
      display: true,
      labels: {
        fontColor: "white"
      }
    },
    elements: {
      point: {
        radius: 0
      }
    },
    scales: {
      xAxes: [
        {
          ticks: {
            fontColor: "white"
          },
          gridLines: {
            display: true,
            color: "rgba(255,255,255, 0.4)"
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            fontColor: "white"
          },
          gridLines: {
            display: true,
            color: "rgba(255,255,255, 0.4)"
          }
        }
      ]
    }
  };

  const NumberTripsData = [27, 30, 32, 34, 30, 26, 27, 24, 23, 26, 25, 32];

  const NumberOfTripsData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ],
    datasets: [
      {
        label: "Number of Trips",
        fontColor: "white",
        data: NumberTripsData,
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(67, 111, 189, 1)",
        pointBackgroundColor: "rgba(67, 111, 189, 1)",
        lineTension: 0
      }
    ]
  };

  const NumberOfTripsOptions = {
    responsive: true,
    maintainAspectRatio: false,
    title: {
      display: true,
      text: "Number of Trips",
      fontColor: "white"
    },
    legend: {
      display: true,
      labels: {
        fontColor: "white"
      }
    },
    elements: {
      point: {
        radius: 0
      }
    },
    scales: {
      xAxes: [
        {
          ticks: {
            fontColor: "white"
          },
          gridLines: {
            display: true,
            color: "rgba(255,255,255, 0.4)"
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            fontColor: "white"
          },
          gridLines: {
            display: true,
            color: "rgba(255,255,255, 0.4)"
          }
        }
      ]
    }
  };

  const FuelExpensesData = [37, 30, 42, 34, 35, 26, 47, 44, 43, 26, 30, 26];
  const TollFeesData = [22, 24, 15, 26, 17, 14, 13, 26, 22, 18, 20, 19];

  const RevenueGeneratedData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ],
    datasets: [
      {
        label: "Fuel Expenses",
        fontColor: "white",
        data: FuelExpensesData,
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(67, 111, 189, 1)",
        pointBackgroundColor: "rgba(67, 111, 189, 1)",
        lineTension: 0
      },
      {
        label: "Toll Fees",
        fontColor: "white",
        data: TollFeesData,
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(243,127,48, 1)",
        pointBackgroundColor: "rgba(243,127,48, 1)",
        lineTension: 0
      }
    ]
  };

  const RevenueGeneratedOptions = {
    responsive: true,
    maintainAspectRatio: false,
    title: {
      display: true,
      text: "Revenue Generated 2020",
      fontColor: "white"
    },
    legend: {
      display: true,
      position: "bottom",
      labels: {
        fontColor: "white"
      }
    },
    elements: {
      point: {
        radius: 3
      }
    },
    scales: {
      xAxes: [
        {
          ticks: {
            fontColor: "white"
          },
          gridLines: {
            display: true,
            color: "rgba(255,255,255, 0.4)"
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            fontColor: "white",
            callback: function(value, index, values) {
              return value.toLocaleString("en-US", {
                style: "currency",
                currency: "USD"
              });
            }
          },
          gridLines: {
            display: true,
            color: "rgba(255,255,255, 0.4)"
          }
        }
      ]
    }
  };

  const DistanceTravelledData = [
    37,
    30,
    42,
    34,
    35,
    26,
    47,
    44,
    43,
    26,
    30,
    26
  ];

  const TotalDistanceTravelledData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ],
    datasets: [
      {
        label: "Distance Travelled",
        fontColor: "white",
        data: DistanceTravelledData,
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(67, 111, 189, 1)",
        pointBackgroundColor: "rgba(67, 111, 189, 1)",
        lineTension: 0
      }
    ]
  };

  const TotalDistanceTravelledOptions = {
    responsive: true,
    maintainAspectRatio: false,
    title: {
      display: true,
      text: "Total Distance Travelled",
      fontColor: "white"
    },
    legend: {
      display: true,
      position: "bottom",
      labels: {
        fontColor: "white"
      }
    },
    elements: {
      point: {
        radius: 3
      }
    },
    scales: {
      xAxes: [
        {
          ticks: {
            fontColor: "white"
          },
          gridLines: {
            display: true,
            color: "rgba(255,255,255, 0.4)"
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            fontColor: "white"
          },
          gridLines: {
            display: true,
            color: "rgba(255,255,255, 0.4)"
          }
        }
      ]
    }
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "35rem",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4
  };
  return (
    <>
      {showLoader && <FullPageLoader />}

      <div className={styles.pagesContainer}>
        <div className={styles.welcomeTxt}>
          Welcome {props.shipperFirstName} {props.carrierFirstName} to Dashboard
        </div>
        <ReactTooltipStyled id="lock" color="success" />
        <IconButton
          aria-label="lock"
          data-for="lock"
          data-tip="Dashboard is locked!!! It will be available once we collect your half yearly data for
          analysis."
        >
          <LockIcon
            style={{
              position: "absolute",
              width: "5rem",
              height: "5rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: "97",
              color: "red",
              marginTop: "5rem"
            }}
            onClick={handleOpen}
          />
        </IconButton>
        <div className={clsx(styles.chartRow, styles.ptHunderd, styles.mobPt0)}>
          <div className={clsx(styles.chartCanvasBG, styles.chartMb)}>
            <Line
              data={QuoteActivityData}
              height={null}
              width={null}
              options={QuoteActivityOptions}
            />
          </div>
          <div className={styles.chartCanvasBG}>
            <Line
              data={NumberOfTripsData}
              height={null}
              width={null}
              options={NumberOfTripsOptions}
            />
          </div>
        </div>
        <div
          className={clsx(
            styles.chartRow,
            styles.ptHunderd,
            styles.pbHunderd,
            styles.pt80
          )}
        >
          <div className={clsx(styles.chartCanvasBG, styles.chartMb)}>
            <Line
              height={null}
              width={null}
              data={RevenueGeneratedData}
              options={RevenueGeneratedOptions}
            />
          </div>
          <div className={styles.chartCanvasBG}>
            <Line
              height={null}
              width={null}
              data={TotalDistanceTravelledData}
              options={TotalDistanceTravelledOptions}
            />
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    shipperFirstName: state.shipperDetails.shipperInfo.firstName,
    carrierFirstName: state.carrierDetails.carrierInfo.firstName
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getShipperDetails: (shipperId, email) =>
      getShipperDetails(dispatch, shipperId, email),
    setShipperDetailsFromLocalStorage: shipperDetails =>
      setShipperDetailsFromLocalStorage(dispatch, shipperDetails),
    setShipperId: shipperId => setShipperId(dispatch, shipperId),
    setCarrierDetailsFromLocalStorage: carrierDetails =>
      setCarrierDetailsFromLocalStorage(dispatch, carrierDetails),
    setCarrierId: carrierId => setCarrierId(dispatch, carrierId)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
