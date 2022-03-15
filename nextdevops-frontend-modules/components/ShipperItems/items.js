import React from "react";
import ItemListTable from "./ItemListTable";
import ItemListForm from "./ItemListForm";

class Items extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      items: { items },
      saveItems,
      handleDestroy,
    } = this.props;
    return (
      <div>
        <ItemListForm onSave={saveItems} />
        <ItemListTable items={items} onDestroy={handleDestroy} />
      </div>
    );
  }
}

export default Items;
