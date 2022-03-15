import React, { useEffect, useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import ShareLocationIcon from "@mui/icons-material/ShareLocation";
import ChatIcon from "@mui/icons-material/Chat";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import PreviewIcon from "@mui/icons-material/Preview";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import SendIcon from "@mui/icons-material/Send";
import { Select, MenuItem } from "@material-ui/core";
import ReactTooltip from "react-tooltip";
import DisplayProposalDetails from "./DisplayPropoalDetailsCarrier";
import Link from "next/link";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import FullPageLoader from "../Helper/FullPageLoader";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
  trackButton: {
    background: "lightGrey",
    "&:hover": {
      cursor: "pointer"
    }
  },
  img: {
    width: "20px",
    "&:hover": {
      cursor: "pointer"
    }
  },
  view: {
    "&:hover": {
      cursor: "pointer"
    }
  }
});

const handleDisplaySentProposal = (
  proposalId,
  getProposalDetails,
  setDisplaySentProposal,
  shipper,
  setShipperName,
  setWholeData,
  quoteId = "",
  handleQuote = () => {}
) => {
  const newArr = [];
  getProposalDetails(proposalId).then(response => {
    if (response.status === 200) {
      setWholeData(response.data);
      setDisplaySentProposal(true);
      setShipperName(shipper);
      handleQuote(quoteId, proposalId, true);
    } else {
      alert("Please try again!!!");
    }
  });
};

function descendingComparator(a, b, orderBy) {
  // console.log(b[orderBy] + " " + a[orderBy] + " ", orderBy);
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  // console.log(order, orderBy);
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    // console.log("------------", a, b);
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort, t } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };
  const headCells = [
    {
      id: "shipperName",
      numeric: false,
      disablePadding: true,
      label: `${t("shipper name")}`
    },
    {
      id: "proposalSendDate",
      numeric: false,
      disablePadding: false,
      label: `${t("qoute sent")}`
    },
    {
      id: "expiryDate",
      numeric: false,
      disablePadding: false,
      label: `${t("qoute expiry")}`
    },
    {
      numeric: false,
      disablePadding: false,
      label: `${t("current status")}`
    },
    {
      numeric: false,
      disablePadding: false,
      label: `${t("shipper respond")}`
    },
    {
      id: "shipperAcceptedAt",
      numeric: false,
      disablePadding: false,
      label: `${t("respond on")}`
    },
    {
      numeric: false,
      disablePadding: false,
      label: `${t("my action")}`
    },
    {
      numeric: false,
      disablePadding: false,
      label: `${t("bol")}`
    },
    {
      numeric: false,
      disablePadding: false,
      label: `${t("assign driver")}`
    },
    {
      numeric: false,
      disablePadding: false,
      label: `${t("track shipment")}`
    },
    {
      numeric: false,
      disablePadding: false,
      label: "Chat"
    }
  ];
  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.id ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? `${t("sort desc")}`
                      : `${t("sort asc")}`}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              <div>{headCell.label}</div>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const EnhancedTableToolbar = ({ t }) => {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 }
      }}
    >
      <Typography
        sx={{
          flex: "1 1 100%",
          justifyContent: "center",
          backgroundColor: "#589442",
          color: "white",
          padding: "0.5rem",
          borderTopRightRadius: "0.5rem",
          borderTopLeftRadius: "0.5rem"
        }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        {t("proposal details")}
      </Typography>
    </Toolbar>
  );
};

export default function QuoteTable({
  quoteDetails,
  handleQuote,
  getProposalDetails,
  getDriverDetails,
  assignDriverForQuote,
  data,
  displaySentProposal,
  setDisplaySentProposal,
  displayForm,
  displaySendQuoteTable,
  callFromUpdateChanges,
  setCallFromUpdateChanges
}) {
  const classes = useStyles();
  const router = useRouter();
  const [shipperName, setShipperName] = useState("");
  //complete data from proposal call
  const [wholeData, setWholeData] = useState(undefined);
  const [driverData, setDriverDetails] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("firstName");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editDriverName, setEditDriverName] = useState(false);
  const [editQuoteId, setEditQuoteId] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    setShowLoader(true);
    getDriverDetails(quoteDetails[0].carrierId).then(
      res => setDriverDetails(res),
      setShowLoader(false)
    );
  }, []);

  // useEffect(() => {
  //   assignDriver
  // }

  const handleChat = (quoteId, uname) => {
    router.push({
      pathname: "/Notes",
      query: { quoteId, uname, role: "CARRIER" }
    });
  };

  const handleRequestSort = (event, property) => {
    // console.log(property, orderBy);
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const goToShipmentDetails = () => {
    router.push("GetShipmentDeliveryStatus");
  };

  // based on the shipper response handle carrier action
  const handleAction = (proposalId, quoteId, shipperName, shipperAccepted) => {
    // console.log(shipperAccepted);
    if (shipperAccepted === "Asked For Changes") {
      return (
        <span>
          <ReactTooltip id="update" />
          <PublishedWithChangesIcon
            color="success"
            data-for="update"
            data-tip="Update Changes"
            onClick={() => {
              handleDisplaySentProposal(
                proposalId,
                getProposalDetails,
                setDisplaySentProposal,
                shipperName,
                setShipperName,
                setWholeData,
                quoteId,
                handleQuote
              ),
                setCallFromUpdateChanges(true);
            }}
            className={classes.img}
          />
        </span>
      );
    } else if (
      shipperAccepted === "Accepted" ||
      shipperAccepted === "Rejected"
    ) {
      return "N/A";
    } else {
      return (
        <Fragment>
          <span className={classes.view}>
            <ReactTooltip id="view" />
            <PreviewIcon
              color="success"
              data-for="view"
              data-tip="View"
              onClick={() => {
                handleDisplaySentProposal(
                  proposalId,
                  getProposalDetails,
                  setDisplaySentProposal,
                  shipperName,
                  setShipperName,
                  setWholeData
                ),
                  setCallFromUpdateChanges(false);
              }}
            />
          </span>
        </Fragment>
      );
    }
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - quoteDetails.length) : 0;

  const assignDriver = (driverDetails, quoteId) => {
    const splitValue = driverDetails.split(" ");
    const driverId = splitValue[0];
    const driverName = splitValue[1];
    const driverApiData = { quoteId, driverName, driverId };
    setShowLoader(true);
    driverName !== undefined &&
      assignDriverForQuote(driverApiData).then(res => {
        if (res.status === 200) {
          setTimeout(() => setShowLoader(false), 2000);
          router.reload();
        }
      });
  };

  const handleShipperAcceptanceStatus = status => {
    if (status) {
      if (status === "Accepted") {
        return (
          <span data-for={status} data-tip={status}>
            <ReactTooltip id={status} />
            <DoneIcon color="success" />
            {status}
          </span>
        );
      } else if (status === "Rejected") {
        return (
          <span data-for={status} data-tip={status}>
            <ReactTooltip id={status} />
            <CancelPresentationIcon color="success" />
            {status}
          </span>
        );
      } else {
        return (
          <span data-for={status} data-tip={status}>
            <ReactTooltip id={status} />
            <QuestionAnswerIcon color="success" />
          </span>
        );
      }
    } else {
      return (
        <span data-for="Not Responded Yet" data-tip="Not Responded Yet">
          <ReactTooltip id="Not Responded Yet" />
          <img
            className={classes.img}
            src={require("../../image/quoteTable/no-entry.png")}
          />
        </span>
      );
    }
  };

  const AssignDriverDropdown = (quoteId, driverName) => {
    if ((editQuoteId === quoteId && driverName) || !driverName) {
      return (
        <Select
          onChange={e => assignDriver(e.target.value, quoteId)}
          defaultValue=""
        >
          {driverData.map(data => {
            return (
              <MenuItem value={`${data.driverId} ${data.firstName} ${quoteId}`}>
                {data.firstName}
              </MenuItem>
            );
          })}
        </Select>
      );
    } else if (driverName && !editDriverName && editQuoteId !== quoteId) {
      return (
        <Fragment>
          {driverName}
          <EditIcon
            color="success"
            style={{ width: "1rem", height: "1rem", marginBottom: "0.25rem" }}
            onClick={() => {
              setEditDriverName(true), setEditQuoteId(quoteId);
            }}
          />
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          {driverName}
          <EditIcon
            color="success"
            style={{ width: "1rem", height: "1rem", marginBottom: "0.25rem" }}
            onClick={() => {
              setEditDriverName(true), setEditQuoteId(quoteId);
            }}
          />
        </Fragment>
      );
    }
  };

  const AddNewDriver = () => {
    return (
      <span data-for="addDriver" data-tip="Add Driver">
        <ReactTooltip id="addDriver" />
        <PersonAddIcon
          style={{ cursor: "pointer" }}
          color="success"
          onClick={() => router.push("/carrier/AddDriverDetails")}
        />
      </span>
    );
  };

  const handleDriverAssign = row => {
    if (row.driverName && !editDriverName) {
      return (
        <Fragment>
          {row.driverName}
          <EditIcon
            color="success"
            style={{ width: "1rem", height: "1rem", marginBottom: "0.25rem" }}
            onClick={() => {
              setEditDriverName(true), setEditQuoteId(row.quoteId);
            }}
          />
        </Fragment>
      );
    } else {
      return (
        <>
          {driverData.length !== 0
            ? AssignDriverDropdown(row.quoteId, row.driverName)
            : AddNewDriver()}
        </>
      );
    }
  };

  return (
    <>
      {showLoader && <FullPageLoader />}
      {!displaySentProposal && !displaySendQuoteTable && (
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <EnhancedTableToolbar t={t} />
            {quoteDetails.length > 0 ? (
              <Fragment>
                <TableContainer sx={{ p: "20px" }}>
                  <Table
                    sx={{ minWidth: 750 }}
                    aria-labelledby="tableTitle"
                    size={"medium"}
                  >
                    <EnhancedTableHead
                      order={order}
                      orderBy={orderBy}
                      onRequestSort={handleRequestSort}
                      rowCount={quoteDetails.length}
                      t={t}
                    />
                    <TableBody>
                      {stableSort(quoteDetails, getComparator(order, orderBy))
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row, index) => {
                          const respondedDate =
                            row.shipperAcceptedAt &&
                            new Date(parseInt(row.shipperAcceptedAt));
                          const labelId = `enhanced-table-checkbox-${index}`;
                          return (
                            <TableRow>
                              <TableCell
                                component="th"
                                id={labelId}
                                scope="row"
                                padding="none"
                              >
                                {row.shipperName}
                              </TableCell>
                              <TableCell>
                                {row.proposalSendDate
                                  ? moment(row.proposalSendDate).format(
                                      "DD.MMM.YY"
                                    )
                                  : `${t("n/a")}`}
                              </TableCell>
                              <TableCell>
                                {row.expiryDate
                                  ? moment(row.expiryDate).format("DD.MMM.YY")
                                  : `${t("n/a")}`}
                              </TableCell>
                              <TableCell
                                onClick={() =>
                                  handleQuote(row.quoteId, row.proposalId)
                                }
                              >
                                {!row.proposalId
                                  ? "Proposal Received"
                                  : row.Kount === "2"
                                  ? "Re-Sent"
                                  : `${t("sent")}`}
                              </TableCell>
                              <TableCell align="center">
                                {handleShipperAcceptanceStatus(
                                  row.shipperAccepted
                                )}
                              </TableCell>
                              <TableCell>
                                {respondedDate !== undefined
                                  ? moment(respondedDate).format("DD.MMM.YY")
                                  : `${t("n/a")}`}
                              </TableCell>
                              {/* TODO: Temprary enabled  for testing purpose*/}
                              <TableCell>
                                {row.proposalId &&
                                row.shipperAccepted === "Accepted" ? (
                                  <span data-for="bol" data-tip="Sign Document">
                                    <ReactTooltip id="bol" />
                                    <Link
                                      href={`/ShippingBolForm/${row.bolId ||
                                        uuidv4()}?quoteId=${row.quoteId}`}
                                    >
                                      <img
                                        className={classes.img}
                                        src={require("../../image/quoteTable/contract.png")}
                                      />
                                    </Link>
                                  </span>
                                ) : row.proposalId ? (
                                  handleAction(
                                    row.proposalId,
                                    row.quoteId,
                                    row.shipperName,
                                    row.shipperAccepted,
                                    row.bolId
                                  )
                                ) : (
                                  <span
                                    onClick={() =>
                                      handleQuote(row.quoteId, row.proposalId)
                                    }
                                    style={{ cursor: "pointer" }}
                                  >
                                    <ReactTooltip id="send" />
                                    <SendIcon
                                      color="success"
                                      data-for="send"
                                      data-tip="Send Proposal"
                                    />
                                  </span>
                                )}
                              </TableCell>
                              <TableCell>
                                <span data-for="bol" data-tip="Sign Document">
                                  <ReactTooltip id="bol" />
                                  <Link
                                    href={`/ShippingBolForm/${row.bolId ||
                                      uuidv4()}?quoteId=${row.quoteId}`}
                                  >
                                    <img
                                      className={classes.img}
                                      src={require("../../image/quoteTable/contract.png")}
                                    />
                                  </Link>
                                </span>
                              </TableCell>
                              <TableCell align="center">
                                {handleDriverAssign(row)}
                              </TableCell>
                              <TableCell align="center">
                                <span data-for="track" data-tip="Track">
                                  <ReactTooltip id="track" />
                                  <ShareLocationIcon
                                    color="success"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => goToShipmentDetails()}
                                  />
                                </span>
                              </TableCell>
                              <TableCell align="right">
                                {row.notReadCarrier === "1" ? (
                                  <span data-for="msg" data-tip="New Message">
                                    <ReactTooltip id="msg" />
                                    <Badge color="secondary" variant="dot">
                                      <MailIcon
                                        style={{ cursor: "pointer" }}
                                        color="success"
                                        onClick={() =>
                                          handleChat(
                                            row.quoteId,
                                            row.carrierCompName
                                          )
                                        }
                                      />
                                    </Badge>
                                  </span>
                                ) : (
                                  <span data-for="chat" data-tip="Chat">
                                    <ReactTooltip id="chat" />
                                    <ChatIcon
                                      color="success"
                                      style={{ cursor: "pointer" }}
                                      // className={classes.trackButton}
                                      onClick={() =>
                                        handleChat(
                                          row.quoteId,
                                          row.carrierCompName
                                        )
                                      }
                                    />
                                  </span>
                                )}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      {emptyRows > 0 && (
                        <TableRow
                          style={{
                            height: 53 * emptyRows
                          }}
                        >
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={quoteDetails.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Fragment>
            ) : (
              <div style={{ display: "flex", justifyContent: "center" }}>
                {t("no qoute details")}
              </div>
            )}
          </Paper>
        </Box>
      )}
      {displaySentProposal && (
        <DisplayProposalDetails
          data={data}
          setDisplaySentProposal={setDisplaySentProposal}
          shipperName={shipperName}
          wholeData={wholeData}
          callFromUpdateChanges={callFromUpdateChanges}
        />
      )}
      {displaySendQuoteTable && displayForm()}
    </>
  );
}
