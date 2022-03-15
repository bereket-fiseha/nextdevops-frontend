import React from "react";
import DriverDetailsForm from "./DriverDetailsForm";
import DriverDetailsTable from "./DriverDetailsTable";

const DriverDetailsFormTable = props => {
  const {
    items: { items },
    saveItems,
    handleDestroy
  } = props;

  return (
    <>
      <DriverDetailsForm onSave={saveItems} />
      <DriverDetailsTable items={items} onDestroy={handleDestroy} />
    </>
  );
};

export default DriverDetailsFormTable;
