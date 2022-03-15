import React from "react";
import QuoteItemsForm from './QuoteItemsForm';

class QuoteItems extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { saveItems, data, paymentTerm, setFinalData, setTotal, setSubTotal } = this.props
    return (
      <div>
        <QuoteItemsForm onSave={saveItems} data={data} paymentTerm={paymentTerm} setFinalData={setFinalData} setTotal={setTotal} setSubTotal={setSubTotal}/>
      </div>
    );
  }
}

export default QuoteItems;
