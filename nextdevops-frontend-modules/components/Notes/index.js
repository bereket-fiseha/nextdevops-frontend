import React, { useState, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import { TextInput } from "./TextInput";
import { MessageLeft, MessageRight } from "./Message";
import moment from "moment";

const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      width: "80vw",
      height: "80vh",
      maxHeight: "700px",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      position: "relative",
    },
    paper2: {
      width: "80vw",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      position: "relative",
    },
    container: {
      width: "100vw",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 50,
    },
    messagesBody: {
      width: "calc( 100% - 20px )",
      margin: 10,
      overflowY: "scroll",
      height: "calc( 100% - 80px )",
    },
    noMesage: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  })
);

export default function Notes({ quoteId, role, uname, getNotes, postNotes }) {
  const classes = useStyles();
  const [newMessage, setMessage] = useState("");
  const [messagesList, setMessagesList] = useState([]);
  const sortedMessages =
    messagesList.length !== 0 && messagesList.sort((a, b) => a.ts - b.ts);
  const handleGetNotes = () => {
    getNotes(quoteId, role).then((res) => {
      setMessagesList(res.data);
    });
  };
  useEffect(() => {
    handleGetNotes();
  }, []);

  const handleNewMessageSend = (event) => {
    const data = {
      quoteId,
      role,
      msg: newMessage,
      ts: new Date().getTime().toString(),
      uname,
    };
    event.stopPropagation();
    event.preventDefault();
    postNotes(data).then((res) => {
      if (res.status === 200) {
        setMessage("");
        handleGetNotes();
      }
    });
  };

  const handleNoMessage = (noMessage) => {
    if (role === "SHIPPER") {
      return (
        <span className={noMessage}>
          Welcome to your chat window with Carrier
        </span>
      );
    } else {
      return (
        <span className={noMessage}>
          Welcome to your chat window with Shipper
        </span>
      );
    }
  };
  return (
    <div className={classes.container}>
      <Paper className={classes.paper} zDepth={2}>
        <Paper id="style-1" className={classes.messagesBody}>
          {sortedMessages ? (
            sortedMessages.map((message) => {
              const convertableTS = new Date(parseInt(message.ts));
              if (message.uname !== uname) {
                return (
                  <MessageLeft
                    message={message.msg}
                    timestamp={moment(convertableTS).format("lll")}
                    photoURL=""
                    displayName={message.from}
                    avatarDisp={true}
                  />
                );
              } else {
                return (
                  <MessageRight
                    message={message.msg}
                    timestamp={moment(convertableTS).format("lll")}
                    photoURL=""
                    displayName={message.from}
                    avatarDisp={true}
                  />
                );
              }
            })
          ) : (
            <div>{handleNoMessage(classes.noMesage)}</div>
          )}
        </Paper>
        <TextInput
          handleNewMessageSend={handleNewMessageSend}
          setMessage={setMessage}
          newMessage={newMessage}
        />
      </Paper>
    </div>
  );
}
