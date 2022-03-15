import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { makeStyles } from "@material-ui/core/styles";

import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    top: "40%",
    justifyContent: "center",
    alignItems: "center",
  },
  modalHeader: {
    borderBottom: "none",
  },
  modalFooter: {
    borderTop: "none",
  },
}));
export default ({ handleClose, show, children, title = "" }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      className={classes.modal}
    >
      <Modal.Header closeButton className={classes.modalHeader}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      {children && <Modal.Body>{children}</Modal.Body>}
      <Modal.Footer className={classes.modalFooter}>
        <Button variant="secondary" onClick={handleClose}>
          {t("close")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
