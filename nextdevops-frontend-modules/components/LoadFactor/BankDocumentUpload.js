import React from "react";
import UploadS3 from "../FileUpload/UploadS3";
import TextField from "@material-ui/core/TextField";
import { useTranslation } from 'react-i18next';

const BankDocumentUpload = ({
  handleSubmit,
  onSubmit,
  register,
  bankDetailsClass,
  fieldAreaClass,
  setUploadedFileName,
  uploadedFileName,
}) => {
  const {t} = useTranslation();
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} autocomplete="off">
        <div className={bankDetailsClass}>
          <div>{t("bank details")}</div>
        </div>

        <div className={fieldAreaClass}>
          <div className="d-flex w-100">
            <TextField
              label={t("account number")}
              type="number"
              inputRef={register}
              name="accountNumber"
              variant="outlined"
              margin="normal"
              required
              fullWidth
            />
          </div>
          <div className="d-flex w-100">
            <TextField
              label={t("institution code")}
              type="number"
              inputRef={register}
              name="institutionCode"
              variant="outlined"
              margin="normal"
              required
              fullWidth
            />
          </div>
          <div className="d-flex w-100">
            <TextField
              label={t("transit number")}
              type="number"
              inputRef={register}
              name="transitNumber"
              variant="outlined"
              margin="normal"
              required
              fullWidth
            />
          </div>
          <div className="d-flex w-100">
            <TextField
              label={t("bank name")}
              type="string"
              inputRef={register}
              name="bankName"
              variant="outlined"
              margin="normal"
              required
              fullWidth
            />
          </div>

          <div className="d-flex w-100">
            <TextField
              label={t("account holder")}
              type="string"
              inputRef={register}
              name="accHolderName"
              variant="outlined"
              margin="normal"
              required
              fullWidth
            />
          </div>
        </div>
        <br />
        <UploadS3
          setUploadedFileName={setUploadedFileName}
          uploadedFileName={uploadedFileName}
        />
        <div className="row w-100">
          <button type="submit" className="primary-submit-button">
            {t("submit")}
          </button>
        </div>
      </form>
    </>
  );
};

export default BankDocumentUpload;
