import React from "react";
import Button from 'react-bootstrap/Button';
import { Storage } from "aws-amplify";

function UploadS3({ setUploadedFileName = () => {}, uploadedFileName = [] }) {
  const [state, setState] = React.useState({
    fileUrl: "",
    file: "",
    fileName: "",
  });

  const handleChange = (e) => {
    const file = e.target.files[0];
    setState({
      fileUrl: URL.createObjectURL(file),
      file,
      fileName: Math.floor(Date.now() / 1000) + file.name,
    });
  };

  const clearImageContainer = () => {
    setState({
      fileUrl: "",
      file: "",
      fileName: "",
    });
  };

  const saveFile = () => {
    Storage.put(state.fileName, state.file)
      .then(() => {
        console.log("successfully saved");
        setUploadedFileName([...uploadedFileName, state.fileName]);
        setState({
          fileUrl: "",
          file: "",
          fileName: "",
        });
      })
      .catch((err) => {
        console.log("error uploading file!", err);
      });
  };
  return (
    <div style={{ margin: "30px 10px" }}>
      <input type="file" onChange={handleChange} />
      {state.fileUrl !== "" && (
        <img style={{ width: "100px", height: "100px" }} src={state.fileUrl} />
      )}
      <div style={{ margin: "20px 0" }}>
        {/* <button onClick={saveFile}>Save file</button>
        <button style={{ marginLeft: "20px" }} onClick={clearImageContainer}>
          Clear
        </button> */}
        <Button variant="success" onClick={saveFile}>Save file</Button>
        <Button variant="danger" style={{ marginLeft: "20px" }} onClick={clearImageContainer}>
          Clear
        </Button>
      </div>
    </div>
  );
}

export default UploadS3;
