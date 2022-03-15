import React from "react";
import {
  Box,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  withStyles,
} from "@material-ui/core";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { useTranslation } from 'react-i18next';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#87dd62",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
  },
});

const ItemListTable = (props) => {
  const classes = useStyles();
  const {t} = useTranslation();

  const handleDestroy = (id) => {
    props.onDestroy(id);
  };

  const itemsAsArray =
    props.items &&
    Object.keys(props.items).map((itemid) => props.items[itemid]);

  const renderTable = () => (
    <Box className={classes.root}>
      <h6 style={{ fontWeight: "bold", paddingTop: "1rem" }}>
        {t("item detail info")}
      </h6>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>
                {t("ID")}
                <Tooltip
                  title="Number of Shipping Units"
                  placement="top-center"
                >
                  <HelpOutlineIcon />
                </Tooltip>
              </StyledTableCell>
              <StyledTableCell>
                {t("description")}
                <Tooltip
                  title="Kinds of Packaging, Description of Articles, Special Marks and Exceptions"
                  placement="top-center"
                >
                  <HelpOutlineIcon />
                </Tooltip>
              </StyledTableCell>
              <StyledTableCell>
                {t("weight")}
                <Tooltip
                  title="Weight Subject to Correction"
                  placement="top-center"
                >
                  <HelpOutlineIcon />
                </Tooltip>
              </StyledTableCell>
              <StyledTableCell>{t("height")}</StyledTableCell>
              <StyledTableCell>{t("width")}</StyledTableCell>
              <StyledTableCell>
                {t("count")}
                <Tooltip
                  title="Number of Shipping Units"
                  placement="top-center"
                >
                  <HelpOutlineIcon />
                </Tooltip>
              </StyledTableCell>

              <StyledTableCell>{t("action")}</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {itemsAsArray.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.id}
                </StyledTableCell>
                <StyledTableCell>{row.itemDescription}</StyledTableCell>
                <StyledTableCell>{row.totalWeight}</StyledTableCell>
                <StyledTableCell>{row.height}</StyledTableCell>
                <StyledTableCell>{row.width}</StyledTableCell>
                <StyledTableCell>{row.counts}</StyledTableCell>
                <StyledTableCell>
                  <button onClick={() => handleDestroy(row.id)}> X</button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );

  if (!itemsAsArray.length) {
    return (
      <div>
        <h6 style={{ fontWeight: "bold", paddingTop: "1rem" }}>
          {t("no item added")}
        </h6>
      </div>
    );
  }
  return itemsAsArray.length && renderTable();
};

export default ItemListTable;
