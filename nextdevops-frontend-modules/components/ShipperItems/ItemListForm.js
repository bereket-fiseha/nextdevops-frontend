import { TextField } from "@material-ui/core";
import React from "react";
import Input from "../BOL/Input";
import { withTranslation } from 'react-i18next';

const RESET_VALUES = {
  id: "",
  totalWeight: "",
  lengthh: "",
  width: "",
  height: "",
  itemDescription: "",
  counts: "",
};

class ItemListForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemList: Object.assign({}, RESET_VALUES),
      errors: {},
    };
  }
  handleChange = (e) => {
    this.setState((prevState) => {
      prevState.itemList[e.target.name] = e.target.value;
      return { itemList: prevState.itemList };
    });
    if(e.target.value) {
      let err = {...this.state.errors};
      err[e.target.name] = false;
      this.setState({ errors: err });
    }
  };
  handleSave = (e) => {
    e.preventDefault();
    const err = {};
    const { totalWeight, lengthh, width, height, counts } = this.state.itemList;
    if(!totalWeight) {
      err.totalWeight = true;
    } if(!lengthh) {
      err.lengthh = true;
    } if(!width) {
      err.width = true;
    } if(!height) {
      err.height = true;
    } if(!counts) {
      err.counts = true;
    }
    if(Object.keys(err).length) {
      this.setState({ errors: err });
      return false;
    }
    this.props.onSave(this.state.itemList);
    this.setState({
      itemList: Object.assign({}, RESET_VALUES),
      errors: {},
    });
    this.setState({errors: {}})
  };
  render() {
    const { errors } = this.state;
    const {t} = this.props;
    return (
      <>
        <h2
          style={{
            color: "black",
            padding: "5px",
            backgroundColor: "#589442",
            textAlign: "center",
            fontWeight: "bold",
            border: "1px solid white",
            borderRadius: "5px",
            padding: "5px",
          }}
        >
          {t("enter class name")}
        </h2>
        <div className="list-item">
          <p>
          {t("weight(lbs)")}:
            <Input
              name="totalWeight"
              value={this.state.itemList.totalWeight}
              onchange={this.handleChange}
              fullWidth={false}
              error={!!errors.totalWeight}
            />
          </p>
          <p>
            {t("length(ft)")}:
            <Input
              htmlType="number"
              name="lengthh"
              value={this.state.itemList.lengthh}
              onchange={this.handleChange}
              fullWidth={false}
              error={!!errors.lengthh}
            />
          </p>
          <p>
            {t("width(ft)")}:
            <Input
              htmlType="number"
              name="width"
              value={this.state.itemList.width}
              onchange={this.handleChange}
              fullWidth={false}
              error={!!errors.width}
            />
          </p>
          <p>
            {t("height(ft)")}:
            <Input
              htmlType="number"
              name="height"
              value={this.state.itemList.height}
              onchange={this.handleChange}
              fullWidth={false}
              error={!!errors.height}
            />
          </p>
          <p>
            {t("number of units")}:
            <Input
              htmlType="number"
              name="counts"
              value={this.state.itemList.counts}
              onchange={this.handleChange}
              fullWidth={false}
              error={!!errors.counts}
            />
          </p>
          <p>
            <TextField
              id="outlined-multiline-static"
              label={t("item description")}
              name="itemDescription"
              multiline
              rows={4}
              variant="outlined"
              onChange={this.handleChange}
              value={this.state.itemList.itemDescription}
            />
          </p>
          <button className="primary-submit-button-small" style={{ width: '100%'}} onClick={this.handleSave}>{t("add item")}</button>
        </div>
      </>
    );
  }
}

export default withTranslation()(ItemListForm);
