import React from "react";
import calculateFreightClass from "../Helper/calculateFreightClass";
import style from "../../styles/Carrier.module.css";
import { withTranslation } from 'react-i18next';


class QuoteItemsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemList: props.data,
      errors: {},
      total: 0,
      subTotal: 0,
    };
  }

  handleChange(index, dataType, value, setFinalData) {
    const newState = this.state.itemList.map((item, i) => {
      if (i == index) {
        return { ...item, [dataType]: value };
      }
      return item;
    });
    this.setState({
      itemList: newState
    }, () => setFinalData(newState));
  }

  handleQuoteRows = (setFinalData) => {
    return (
      <>
        {this.state.itemList.map((row, index) => {
          const { unitPrice, counts, tax, totalWeight, lengthh, width, height } = this.state.itemList[index];

          const freightClass = calculateFreightClass(totalWeight, lengthh, height, width);
          this.state.itemList[index].freightClass = freightClass.toString();
          const taxExcl = unitPrice ? parseFloat(unitPrice) * counts : 0;
          const taxIncl = unitPrice ? (parseFloat(unitPrice) * counts * parseFloat(tax ? tax : 0)) / 100 + taxExcl : 0;
          return (
            <tr>
              <td>
                <input
                  type='text'
                  className='form-control'
                  value={this.state.itemList[index].itemDescription} disabled />
              </td>
              <td>
                <input
                  type='number'
                  className='form-control'
                  value={this.state.itemList[index].counts} disabled />
              </td>
              <td>
                <input
                  type='number'
                  className='form-control'
                  value={totalWeight} disabled />
              </td>
              <td>
                <input
                  type='number'
                  className='form-control'
                  value={freightClass} disabled />
              </td>
              <td>
                <input onChange={(e) => this.handleChange(index, 'unitPrice', e.target.value, setFinalData)}
                  type='number'
                  className='form-control'
                  placeholder='0.00'
                  value={this.state.itemList[index].unitprice} />
              </td>
              <td>
                <input
                  type='text'
                  className='form-control'
                  value={taxExcl} disabled />
              </td>
              <td>
                <input onChange={(e) => this.handleChange(index, 'tax', e.target.value, setFinalData)}
                  type='number'
                  className='form-control'
                  value={this.state.itemList[index].tax} />
              </td>
              <td>
                <input
                  type='text'
                  className='form-control'
                  value={taxIncl} disabled />
              </td>
            </tr>
          );
        })}
      </>
    );
  }

  displaySubTotal = (setSubTotal) => {
    let subTotal = 0;
    this.state.itemList.map((row, index) => {
      const { unitPrice, counts } = this.state.itemList[index]
      const taxExcl = unitPrice ? parseFloat(unitPrice) * counts : 0;
      subTotal = subTotal + taxExcl;
    })
    setSubTotal(subTotal)
    return subTotal;
  }

  displayTotal = (setTotal) => {
    let total = 0;
    let taxExcl = null;
    this.state.itemList.map((row, index) => {
      const { unitPrice, counts, tax } = this.state.itemList[index]
      taxExcl = unitPrice ? parseFloat(unitPrice) * counts : null;
      const taxIncl = unitPrice ? (parseFloat(unitPrice) * counts * parseFloat(tax ? tax : 0)) / 100 + taxExcl : 0;
      total = total + taxIncl;
    })
    setTotal(total);
    return total;
  }

  displayIndividualTax = () => {
    return this.state.itemList.map((row, index) => {
      const { unitPrice, counts, tax } = this.state.itemList[index]
      const taxx = unitPrice ? (parseFloat(unitPrice) * counts * parseFloat(tax ? tax : 0)) / 100 : null;
      return (
        <>
          <div>{taxx}</div>
        </>
      )
    })
  }

  render() {
    const { paymentTerm: { depositPercentage, outstandingDays }, setFinalData, setTotal, setSubTotal, t } = this.props
    return (
      <>
        <table>
          <thead>
            <th>{t("item description")}</th>
            <th>{t("quantity")}</th>
            <th>{t("total weight")}</th>
            <th>{t("freight class")}</th>
            <th>{`${t("unit price")}:`}</th>
            <th>{`${t("amount(tax)")}:`}</th>
            <th>{`${t("tax rate")}:`}</th>
            <th>{`${t("amount(tax incl)")}:`}</th>
          </thead>
          <tbody>{this.handleQuoteRows(setFinalData)}</tbody>
        </table>

        <div className={style.carrier_quote_total}>
          <label className={style.price_label}>{t("_sub total")}</label>
          <span>{this.displaySubTotal(setSubTotal)}</span>
        </div>
        <div className={style.carrier_quote_total}>
          <label className={style.price_label}>{t("total tax")}</label>
          <span>{this.displayIndividualTax()}</span>
        </div>
        <div className={style.carrier_quote_total}>
          <label className={style.price_label}>{t("total")}</label>
          <span>{this.displayTotal(setTotal)}</span>
        </div>
        <div>
          <div>{t("payment term")}</div>
          <label>{t("percentage to paid")}</label>
          <div>{depositPercentage? depositPercentage : 0}</div>
          <label>{t("amount to paid")}</label>
          <div>{outstandingDays}</div>
        </div>
      </>
    );
  }
}

export default withTranslation()(QuoteItemsForm);
