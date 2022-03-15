import { withAuthenticator } from "@aws-amplify/ui-react";
import Carrier from "../../components/Carrier/CarrierHome";

const ComponentCarrier = () => {
  return (
    <div>
      <Carrier />
    </div>
  );
};
const carrierLoginPage = () => {
  return <ComponentCarrier />;
};

export default withAuthenticator(carrierLoginPage);
