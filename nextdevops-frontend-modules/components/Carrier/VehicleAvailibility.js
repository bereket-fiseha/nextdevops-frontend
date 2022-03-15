import React, { Fragment, useState, useEffect } from "react";
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
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles(theme => ({
  panelHeader: {
    background: "#589442",
    height: "50px",
    padding: "10px",
    paddingLeft: "30px",
    width: "100%",
    marginTop: "100px",
    borderTopRightRadius: "0.5rem",
    borderTopLeftRadius: "0.5rem",
    "& h2": {
      color: "#fff",
      fontSize: "1.5rem"
    }
  }
}));
const data = [
  {
    Capacity: "12345",
    dateAvailableFrom: "01/12/2020",
    carrierId: "dbcc3970-4e6f-45f8-9241-20c884090a72",
    source: "ABC",
    destination: "XYZ",
    About: "",
    id: "0d42d126-30ff-4796-a39a-867782600e9d",
    dateAvailableTill: "01/12/2025",
    type: "trailer"
  }
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
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
  const headCells = [
    {
      id: "source",
      numeric: false,
      disablePadding: true,
      label: `${t("source")}`
    },
    {
      id: "destination",
      numeric: false,
      disablePadding: false,
      label: `${t("destination")}`
    },
    {
      id: "from",
      numeric: false,
      disablePadding: false,
      label: `${t("from")}`
    },
    {
      id: "till",
      numeric: false,
      disablePadding: false,
      label: `${t("till")}`
    },
    {
      id: "type",
      numeric: false,
      disablePadding: false,
      label: `${t("TYPE")}`
    },
    {
      id: "capacity",
      numeric: false,
      disablePadding: false,
      label: `${t("CAPACITY")}`
    },
    {
      id: "about",
      numeric: false,
      disablePadding: false,
      label: `${t("about")}`
    }
  ];
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

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
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? `${t("sort desc")}` : `${t("sort asc")}`}
                </Box>
              ) : null}
            </TableSortLabel>
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
          background: "#589442",
          height: "50px",
          padding: "10px",
          paddingLeft: "30px",
          width: "100%",
          color: "white"
        }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        {t("Available Vehicle")}
      </Typography>
    </Toolbar>
  );
};
const VehicleAvailability = ({ props }) => {
  const [showLoader, setShowLoader] = useState(false);
  const [rows, setAvailableVehicle] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("source");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { t } = useTranslation();
  const classes = useStyles();

  useEffect(() => {
    setShowLoader(true);
    const carrierDetails = JSON.parse(localStorage.getItem("carrierDetails"));
    const { carrierId } = carrierDetails;
    if (carrierDetails) {
      props.setCarrierDetailsFromLocalStorage(carrierDetails);
      props.setCarrierId(carrierId);
    }
    props.getVehicleAvailability(carrierId).then(res => {
      setAvailableVehicle(res);
      setShowLoader(false);
    });
  }, []);

  const handleRequestSort = (event, property) => {
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

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  return (
    <Fragment>
      {showLoader && <FullPageLoader />}
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className={classes.panelHeader}>
              <h2>{t("AVAILABLE_VEHICLE")}</h2>
            </div>

            <Box sx={{ width: "100%", height: "100%", marginBottom: "16rem" }}>
              <Paper sx={{ width: "100%", mb: 2 }}>
                {rows.length > 0 ? (
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
                          rowCount={rows.length}
                          t={t}
                        />
                        <TableBody>
                          {stableSort(rows, getComparator(order, orderBy))
                            .slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                            .map((row, index) => {
                              const labelId = `enhanced-table-checkbox-${index}`;
                              return (
                                <TableRow>
                                  <TableCell
                                    component="th"
                                    id={labelId}
                                    scope="row"
                                    padding="none"
                                  >
                                    {row.source}
                                  </TableCell>
                                  <TableCell>{row.destination}</TableCell>
                                  <TableCell>{row.dateAvailableFrom}</TableCell>
                                  <TableCell>{row.dateAvailableTill}</TableCell>
                                  <TableCell>{row.type}</TableCell>
                                  <TableCell>{row.Capacity}</TableCell>
                                  <TableCell>{row.About}</TableCell>
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
                      count={rows.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </Fragment>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      padding: "2rem 0"
                    }}
                  >
                    {t("NO_VEHICLE_AVAILABILITY")}
                  </div>
                )}
              </Paper>
            </Box>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default VehicleAvailability;
