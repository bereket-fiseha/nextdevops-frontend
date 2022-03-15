import React, { useState } from "react";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
// import Button from "@material-ui/core/Button";
import Button from "react-bootstrap/Button";
import UploadS3 from "../FileUpload/UploadS3";
import Modal from "../Modal";
import { Typography } from "@material-ui/core";
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
  table: {
    minWidth: 200,
  },
  backButton: {
    display: "flex",
    justifyContent: "center",
    margin: "10px",
  },
  statusContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  uploadDocument: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "20px",
  },
  uploadButtonContainer: {
    marginLeft: "50px",
    flexDirection: "column",
    display: "flex",
    alignItems: "center"
  },
  uploadButton: {
    marginTop: "10px",
    width: "100px",
    justifyContent: "center"
  },
  newDelivery: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    padding: "20px"
  },
  acceptButton: {
    marginTop: "10px",
  }
});

//Dummy data

const data = [
  {
    status: "Started",
    city: "Fredericton",
    province: "New Brunswick",
    country: "Canada",
    ts: 1631094592163,
    quoteId: "8a2d88a0-2e5d-4d5f-9b3c-bcac82f7e46cc1",
  },
  {
    status: "In Transit",
    city: "Moncton",
    province: "New Brunswick",
    country: "Canada",
    ts: 1631190592163,
    quoteId: "8a2d88a0-2e5d-4d5f-9b3c-bcac82f7e46cc2",
  },
  {
    status: "In transit",
    city: "Saint John",
    province: "New Brunswick",
    country: "Canada",
    ts: 1631194592163,
    quoteId: "8a2d88a0-2e5d-4d5f-9b3c-bcac82f7e46cc3",
  },
  {
    status: "In transit",
    city: "Dieppe",
    province: "New Brunswick",
    country: "Canada",
    ts: 1631194592163,
    quoteId: "8a2d88a0-2e5d-4d5f-9b3c-bcac82f7e46cc4",
  },
  {
    status: "In transit",
    city: "Maryland",
    province: "New York",
    country: "USA",
    ts: 1631194592163,
    quoteId: "8a2d88a0-2e5d-4d5f-9b3c-bcac82f7e46cc5",
  },
  {
    status: "Completed",
    city: "Bronco",
    province: "New York",
    country: "USA",
    ts: 1631194592163,
    quoteId: "8a2d88a0-2e5d-4d5f-9b3c-bcac82f7e46cc6",
  },
];

// function to fetch date and time from ts

const rows = data.reverse().map((item) => {
  const date = new Date(item.ts);
  const month = date.toLocaleString("default", {
    month: "short",
  });
  const formattedDate = date.getDate();
  const time = date.toLocaleTimeString();
  return { ...item, date: `${month}. ${formattedDate}`, time };
});

function GetShipmentStatus(props) {
  const classes = useStyles();
  const router = useRouter();
  const [uploadedFileName, setUploadedFileName] = useState([]);
  const [showModal, toggleModal] = useState(false);
  const {t} = useTranslation();
  return (
    <div style={{ paddingTop: "6rem", paddingLeft: "2rem" }}>
      <Typography variant="h5" component="h5">
        {t("delivery progress")}
      </Typography>
      <Typography variant="h6" component="h6">
        {t("updated info")}: {rows[0].date}
      </Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{t("date")}</TableCell>
              <TableCell>{t("time")}</TableCell>
              <TableCell>{t("progress")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={row.quoteId}>
                <TableCell component="th" scope="row">
                  {(index === 0 ||
                    (index > 0 && row.date !== rows[index - 1].date)) &&
                    row.date}
                </TableCell>
                <TableCell>{row.time}</TableCell>
                <TableCell>
                  <div className={classes.statusContainer}>
                    <p>{row.status}</p>
                    {row.status === "Completed" && (
                      <div className={classes.uploadButtonContainer}>
                        {t("click to upload")}
                        <Button variant="success" className={classes.uploadButton} onClick={() => toggleModal(true)}>
                          {t("upload")}
                        </Button>
                      </div>
                    )}
                  </div>
                  <Modal
                    show={showModal}
                    handleClose={() => toggleModal(false)}
                  >
                    <>
                      {uploadedFileName.length === 0 && (
                        <div className={classes.uploadDocument}>
                          {t("upload proof of delivery")}
                          <UploadS3
                            setUploadedFileName={setUploadedFileName}
                            uploadedFileName={uploadedFileName}
                          />
                        </div>
                      )}
                    </>
                    {uploadedFileName.length !== 0 && (
                      <div className={classes.newDelivery}>
                        `${t("are you available")}`
                        <div className={classes.acceptButton}>
                          <Button variant="success" onClick={()=> {}}>
                            {t("yes")}
                          </Button>
                          <Button variant="danger" style={{ marginLeft: "20px" }} onClick={() => {}}>
                            {t("no")}
                          </Button>
                        </div>
                      </div>
                    )}
                  </Modal>
                  <p>{`${row.city}, ${row.province}, ${row.country}`}</p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {router.components && Object.keys(router.components).indexOf("/carrierQuotes") !== -1 && (
        <Button variant="success" className={classes.backButton} onClick={() => router.back()}>
          {t("go back")}
        </Button>
      )}
    </div>
  );
}

export default GetShipmentStatus;
