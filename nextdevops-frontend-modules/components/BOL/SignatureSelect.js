import React from "react";
import Input from "./Input";
import {
  Box,
  makeStyles,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";

const useStyles = makeStyles({
  selectSignature: {},
  selectList: {
    zIndex: "9999999",
    background: "white",
    width: "100%",
    maxHeight: "200px",
    overflowY: "auto",
    borderLeft: "1px solid green",
    borderRight: "1px solid green",
  },
});

const SignatureSelect = ({
  onSelectSignature = () => {},
  onChangeValue = () => {},
  signatureValue = "",
}) => {
  const classes = useStyles();
  const fontFamilyList = [
    "AAutoSignature",
    "BrittanySignature",
    "BrothersideSignature",
    "SevenDaySignature",
  ];
  return (
    <>
      <Box className={classes.selectSignature}>
        <Input
          label="Signatures"
          onchange={onChangeValue}
          value={signatureValue}
        />
        <Box className={classes.selectList}>
          <List component="nav" aria-label="secondary mailbox folders">
            {fontFamilyList.map((item, index) => (
              <ListItem
                key={index}
                button
                onClick={() => {
                  onSelectSignature(signatureValue, item);
                }}
              >
                <ListItemText>
                  <span
                    style={{
                      fontFamily: item,
                      fontSize: "35px",
                      color: "black",
                    }}
                  >
                    {signatureValue}
                  </span>
                </ListItemText>
              </ListItem>
            ))}

            {/*  */}
          </List>
        </Box>
      </Box>
    </>
  );
};
export default SignatureSelect;
