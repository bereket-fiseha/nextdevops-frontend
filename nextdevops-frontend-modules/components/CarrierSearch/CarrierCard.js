import React, { Component, Fragment } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Checkbox,
} from "@material-ui/core";
import moment from "moment";
import { withTranslation } from 'react-i18next';
class MediaCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [...props.carrierId],
      checkedItems: new Map(),
    };
  }

  handleChange = (event) => {
    var isChecked = event.target.checked;
    var item = event.target.value;
    this.setState((prevState) => ({
      checkedItems: prevState.checkedItems.set(item, isChecked),
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let carrierIds = [];
    for (let ele of this.state.checkedItems.keys()) {
      carrierIds.push(ele);
    }
    this.props.selectedCarrierHandle(carrierIds);
  };

  render() {
    const {t} = this.props;
    return (
      <>
        <Typography variant="h5" component="h2">
          {t("carrier routes")}
        </Typography>
        <div
          style={{
            display: "flex",
            // justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 25,
          }}
        >
          {this.state.categories.map((item) => (
            <Card
              className={this.props.classes.root}
              variant="outlined"
              style={{
                marginTop: "1.25rem",
                minWidth: "30%",
                boxShadow: "2px 10px 48px 7px rgba(0,0,0,0.25)",
              }}
            >
              <CardContent>
                <Typography variant="h5" style={{ textTransform: "uppercase" }}>
                  {item.carrierName}
                </Typography>
                <Typography variant="h5">
                  {item.source} - {item.destination}
                </Typography>
                <Typography variant="h6" style={{ fontSize: "14px" }}>
                  <b>{t("availability")}</b>
                  <br />
                  {`From: ${moment(item.dateAvailableFrom).format("LLLL")}`}
                  <br />
                  {`To: ${moment(item.dateAvailableTill).format("LLLL")}`}
                </Typography>
                <Typography variant="body2" component="p">
                  <Fragment key={item.carrierId}>
                    <Checkbox
                      // defaultChecked
                      color="primary"
                      inputProps={{ "aria-label": "secondary checkbox" }}
                      value={item.carrierId}
                      onChange={this.handleChange}
                    />
                    {`Type: ${item.type}`}
                  </Fragment>
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
        <CardActions style={{ justifyContent: "flex-end" }}>
          <Button
            disabled={this.state.checkedItems.size === 0}
            size="small"
            className={this.props.classes.addButton}
            onClick={this.handleSubmit}
          >
            {t("send qoute")}
          </Button>
        </CardActions>
      </>
    );
  }
}

export default withTranslation()(MediaCard);
