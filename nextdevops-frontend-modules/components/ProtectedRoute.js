import React from "react";
import { useRouter } from "next/router";
import ProtectedRoutesUser from "./ProtectedRoutesUser";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  let unprotectedRoutes = [
    "/faq",
    "/",
    "/shipper/ShipperLoginPage",
    "/carrier/CarrierLoginPage",
    "/common/about",
    "/common/careers",
    "/common/contact",
    "/common/loadfactor",
    "/common/admin",
    "/services",
    "/LearnMoreShipper",
    "/LearnMoreCarrier",
    "/Tracking",
    "/GetShipmentDeliveryStatus",
    "/LearnMoreCarrier",
    "/LearnMoreShipper",
  ];
  let pathIsProtected = unprotectedRoutes.indexOf(router.pathname) === -1;
  return (
    <ProtectedRoutesUser
      pathIsProtected={pathIsProtected}
      router={router}
      children={children}
    />
  );
};

export default ProtectedRoute;
