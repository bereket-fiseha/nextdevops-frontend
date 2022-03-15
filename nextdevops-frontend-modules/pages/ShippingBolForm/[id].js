import React from "react";
import ShippingBOLForm from "../../components/BOL";
import { useRouter } from "next/router";
import { makeStyles, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "100px 40px",
    padding: "30px",
  },
}));


const ShippingBolFormPage = () => {
  const classes = useStyles();
  const router = useRouter();
  const { id, quoteId } = router.query;
  return (
      <Paper className={classes.root} elevation={3}>
        <ShippingBOLForm bolId={id} quoteId={quoteId} />
      </Paper>
  );
};

export default ShippingBolFormPage;
