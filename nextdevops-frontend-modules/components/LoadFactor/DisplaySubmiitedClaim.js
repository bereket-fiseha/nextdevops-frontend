import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useTranslation } from 'react-i18next';

const DisplaySubmittedClaim = ({ submittedClaimsDetails, setToggleSearchBar, setQuoteId }) => {
  const {t} = useTranslation();
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{t("qoute id")}</TableCell>
              <TableCell align="right">{t("account number")}</TableCell>
              <TableCell align="right">{t("bank name")}</TableCell>
              <TableCell align="right">{t("account holder")}</TableCell>
              <TableCell align="right">{t("submission date")}</TableCell>
              <TableCell align="right">{t("status")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {submittedClaimsDetails.length > 0 &&
              submittedClaimsDetails.map((row) => (
                <TableRow
                  key={row.quoteId}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {row.quoteId}
                  </TableCell>
                  <TableCell align="right">{row.bankDetails.accountNumber}</TableCell>
                  <TableCell align="right">{row.bankDetails.bankName}</TableCell>
                  <TableCell align="right">{row.bankDetails.accHolderName}</TableCell>
                  <TableCell align="right">{row.claimSubmissionDate}</TableCell>
                  <TableCell align="right">{row.status ? status : 'Pending'}</TableCell>

                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="row w-100">
        <button
          onClick={() => {setToggleSearchBar(true); setQuoteId('')}}
          className="primary-submit-button-small"
        >
          {t("back")}
        </button>
      </div>
    </>
  );
};

export default DisplaySubmittedClaim;
