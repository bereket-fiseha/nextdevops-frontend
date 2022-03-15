import React, { useState } from "react";
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
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { visuallyHidden } from "@mui/utils";
import { useTranslation } from 'react-i18next';

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
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort, t } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  const headCells = [
    {
      id: "firstName",
      numeric: false,
      disablePadding: true,
      label: `${t("firstName")}`,
    },
    {
      id: "lastName",
      numeric: false,
      disablePadding: false,
      label: `${t("lastName")}`,
    },
    {
      id: "email",
      numeric: false,
      disablePadding: false,
      label: `${t("email")}`,
    },
    {
      id: "phoneNumber",
      numeric: true,
      disablePadding: false,
      label: `${t("phone")}`,
    },
    {
      id: "remove",
      numeric: true,
      disablePadding: false,
      label: `${t("remove")}`,
    },
  ];

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
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
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = ({t}) => {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        {t("newly added driver")}
      </Typography>
    </Toolbar>
  );
};

const DriverDetailsTable = (props) => {
  let rows =
    props.items &&
    Object.keys(props.items).map((itemid) => props.items[itemid]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("firstName");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const {t} = useTranslation();

  const handleRemove = (id) => {
    props.onDestroy(id);
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <Box sx={{ width: "100%" }}>
            <Paper sx={{ width: "100%", mb: 2 }}>
              <EnhancedTableToolbar t={t} />
              {rows.length > 0 ? (
                <>
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
                                  {row.firstName}
                                </TableCell>
                                <TableCell>{row.lastName}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell align="right">
                                  {row.phoneNumber}
                                </TableCell>
                                <TableCell
                                  align="right"
                                  onClick={() => handleRemove(row.driverId)}
                                >
                                 <RemoveCircleIcon style={{fill:"red"}}/>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        {emptyRows > 0 && (
                          <TableRow
                            style={{
                              height: (dense ? 33 : 53) * emptyRows,
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
                </>
              ) : (
                <div style={{display: "flex", justifyContent: "center", padding: "10px"}}>{t("no details")}</div>
              )}
            </Paper>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default DriverDetailsTable;
