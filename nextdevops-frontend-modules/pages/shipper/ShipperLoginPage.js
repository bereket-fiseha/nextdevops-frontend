import { withAuthenticator } from "@aws-amplify/ui-react";
import Shipper from '../../components/Shipper/ShipperHome';

const ComponentShipper = () => {
    return (
        <div>
            <Shipper />
        </div>
    )
}

const ShipperLoginPage = () => {
        return <ComponentShipper />
};

export default withAuthenticator(ShipperLoginPage);
