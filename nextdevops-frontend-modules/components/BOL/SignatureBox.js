import React, { forwardRef, useState } from "react";
import { Box, Button, makeStyles, Tooltip } from "@material-ui/core";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import SignaturePad from "react-signature-canvas";
import Input from "./Input";
import SignatureSelect from "./SignatureSelect";
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
  root: {
    ["@media (max-width:780px)"]: {
      maxWidth: '15rem',
    },
  },
  signatureBox: {
    // border: "1px solid rgb(153, 153, 153)",
    // maxHeight: '15rem',
    ["@media (max-width:780px)"]: {
      maxWidth: '15rem',
    },
  },
  btnRow: {
    display: "flex",
    justifyContent: "space-between",
  },
});

export const SignatureBox = forwardRef((props, ref) => {
  const { title,
  tooltip,
  selectedSignature = "",
  onSelectSignature = () => {},
  onChangeValue = () => {},
  signatureValue = "",
  handleChange,
  setSign,
  selectedSignatureFont,
  values } = props;
  const [selectSign, setSelectSign] = useState(false);
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <>
      <Box className={classes.root}>
        <h6>
          {title}
          <Tooltip title={tooltip} placement="top-center">
            <HelpOutlineIcon />
          </Tooltip>
        </h6>

        {selectedSignature !== "" ? (
          <Box
          id="txt_signature"
            style={{
              fontFamily: selectedSignatureFont,
              margin: "25px",
              fontSize: "55px",
            }}
          >
            {selectedSignature}
          </Box>
        ) : !selectSign ? (
          <Box className={classes.signatureBox}>
            <SignaturePad
              ref={ref}
              canvasProps={{width: 300, height: 200, border: "1px solid rgb(153, 153, 153)", className: 'sigCanvas'}}
              penColor='black'
            />
          </Box>
        ) : (
          <SignatureSelect
            onSelectSignature={onSelectSignature}
            signatureValue={signatureValue?.target?.value ?? signatureValue}
            onChangeValue={onChangeValue}
          />
        )}

        <Box className={classes.btnRow}>
          {!selectSign && (
            <Button onClick={() => {
              if(ref?.current?.isEmpty()) {
                setSelectSign(true)
              }
              ref?.current?.clear();
              }}>
              {t("clear")}
            </Button>
          )}
          {selectedSignature !== "" ? (
            <Button onClick={() => onSelectSignature("")}>
              {t("Update Signature")}
            </Button>
          ) : (
            <>
            {!selectSign ? <Button onClick={() => {
              if(ref.current) {
                setSign(ref.current.getTrimmedCanvas().toDataURL("image/png"))
              }
                setSelectSign(true)}}>
              {t("Create Signature")}
            </Button>:
            <Button onClick={() =>
                setSelectSign(false)}>
              {t("Draw Signature")}
            </Button>}
            </>
          )}
        </Box>
        <Input
          htmlType="date"
          label={t("date")}
          name="curr_date"
          value={values.curr_date}
          onchange={handleChange}
        />
      </Box>
    </>
  );
});
