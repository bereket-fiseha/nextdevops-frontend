import React, { useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from 'react-i18next';
import S3 from "react-aws-s3";
// import S3FileUpload from "react-s3";

const useStyles = makeStyles((theme) => ({
    uploadSteps: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        
    }
  }));
function Upload() {
  const classes = useStyles();
  const fileInput = useRef();
  const {t} = useTranslation();

  const handleClick = (event) => {
    event.preventDefault();
    let file = fileInput.current.files[0];
    let newFileName = fileInput.current.files[0].name.replace(/\..+$/, "");
    const config = {
      bucketName: 'loadhitch-file',
      region: 'us-east-1',
      accessKeyId: 'AKIAQ6VZ5Z6I3NLIA6YR',
      secretAccessKey: 'V8V8lqj9I0e20ykDdYiCMqufFWvrqHF9thIHArLj',
    };
    const ReactS3Client = new S3(config);
    // const ReactS3Client = new S3FileUpload(config);
    ReactS3Client.uploadFile(file, newFileName).then((data) => {
      console.log(data);
      if (data.status === 204) {
        console.log("success");
      } else {
        console.log("fail");
      }
    });
  };

  return (
    <>
      <form className={classes.uploadSteps} onSubmit={handleClick}>
        <label>
          {`${t("upload documents")}:`}
          <input type='file' ref={fileInput} />
        </label>
        <br />
        <button type='submit'>{t("upload")}</button>
      </form>
    </>
  );
}

export default Upload;