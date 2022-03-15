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
import Input from "./Input";
import { useTranslation } from "react-i18next";

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
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(700px, 1fr))",
    ["@media (max-width:780px)"]: {
      display: 'inline'
    },
  },
});

export const ShipmentInfo = ({
  tableData = [],
  updateTableData = () => {},
}) => {
  const classes = useStyles();
  const {t} = useTranslation();

  const isInputChecked = ({ name, edit }) => {
    if (edit) {
      return (
        <>
          <Input hideLabel={true} hookForm={true} defaultValue={name} />
        </>
      );
    } else {
      return name;
    }
  };

  return (
    <Box className={classes.root}>
      <Box>
        <h6> {t("shipment/freight info")}</h6>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>
                  {t("ID")}
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
                <StyledTableCell>{t("total")}</StyledTableCell>
                {/* <StyledTableCell align="center">Action</StyledTableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {isInputChecked({ name: row.id, edit: row.edit })}
                  </StyledTableCell>
                  <StyledTableCell>
                    {isInputChecked({
                      name: row.itemDescription,
                      edit: row.edit,
                    })}
                  </StyledTableCell>
                  <StyledTableCell>
                    {isInputChecked({ name: row.totalWeight, edit: row.edit })}
                  </StyledTableCell>
                  <StyledTableCell>
                    {isInputChecked({ name: row.height, edit: row.edit })}
                  </StyledTableCell>
                  <StyledTableCell>
                    {isInputChecked({ name: row.width, edit: row.edit })}
                  </StyledTableCell>
                  <StyledTableCell>
                    {isInputChecked({ name: row.counts, edit: row.edit })}
                  </StyledTableCell>
                  <StyledTableCell>
                    {isInputChecked({ name: row.unitPrice, edit: row.edit })}
                  </StyledTableCell>
                  {/* <StyledTableCell align="center">
                    <ButtonGroup
                      disableElevation
                      variant="contained"
                      color="red"
                    >
                      {row.edit ? (
                        <Button onClick={() => rowEditHandler(index)}>
                          Update
                        </Button>
                      ) : (
                        <Button onClick={() => rowEditHandler(index)}>
                          Edit
                        </Button>
                      )}
                      <Button>Delete</Button>
                    </ButtonGroup>
                  </StyledTableCell> */}
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <Box style={{ display: "flex", justifyContent: "end" }}>
          <Button onClick={newRowInsert}>Add Row</Button>
        </Box> */}
      </Box>
    </Box>
  );
};
