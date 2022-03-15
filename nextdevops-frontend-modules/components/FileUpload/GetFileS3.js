import React from "react";
import { Storage } from "aws-amplify";
import { useTranslation } from 'react-i18next';

function GetFileS3(props) {
  const {t} = useTranslation();
  const [state, setState] = React.useState({
    fileUrl: "",
  });

  const fetchImage = (fileName) => {
    Storage.get(fileName)
      .then((data) => {
        setState({
          fileUrl: data,
        });
      })
      .catch((err) => {
        console.log("Error fetching the image");
      });
  };
  return <div>
    <button onClick={fetchImage('1639459695Untitled.png')}>{t("fetch file")}</button>
    <img src={state.fileUrl} />

  </div>;
}

export default GetFileS3;
