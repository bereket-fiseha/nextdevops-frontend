import React, { Fragment } from "react";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";
import { useRouter } from "next/router";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) =>
  createStyles({
    wrapForm: {
      display: "flex",
      justifyContent: "center",
      width: "95%",
      margin: `${theme.spacing(0)} auto`,
    },
    wrapText: {
      width: "100%",
    },
    button: {
      //margin: theme.spacing(1),
    },
    backButton: {
      margin: "0.5rem",
      backgroundColor: "#3f51b5",
      color: "#fff",
      "&:hover": {
        backgroundColor: "#589442",
        color: "white !important",
        cursor: "pointer",
      },
    },
  })
);

export const TextInput = ({ handleNewMessageSend, setMessage, newMessage }) => {
  const classes = useStyles();
  const router = useRouter();
  return (
    <Fragment>
      <div className={classes.wrapForm} noValidate autoComplete="off">
        <TextField
          id="standard-text"
          label="Type Your Message"
          className={classes.wrapText}
          value={newMessage}
          onChange={(e) => setMessage(e.target.value)}
          onKeyUp={(event) => {
            if (event.key === "Enter") handleNewMessageSend(event);
          }}
          //margin="normal"
        />
        <Button variant="contained" color="primary" className={classes.button}>
          <SendIcon onClick={handleNewMessageSend} />
        </Button>
      </div>
      <Button
        className={classes.backButton}
        color="primary"
        onClick={() => router.back()}
      >
        Back
      </Button>
    </Fragment>
  );
};
