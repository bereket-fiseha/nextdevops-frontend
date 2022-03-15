import React, { useEffect } from "react";
import List from "@material-ui/core/List";
import AppMenuItem from "./AppMenuItem";
import { useTranslation } from "react-i18next";

// required sidebar navigation items data

export const checkParent = ({ activeLink, customerType }) => {
  const { t } = useTranslation();
  const appMenuItemsShipper = [
    {
      name: `${t("My Dashboard")}`,
      link: "/Dashboard",
    },
    {
      name: `${t("My Profile")}`,
      items: [
        {
          name: `${t("Company Profile")}`,
          link: "/shipper/ShipperCompanyProfile",
        },
      ],
    },
    {
      name: `${t("Search Carrier")}`,
      link: "/ShipperPostLoad",
    },
    {
      name: `${t("qoute details")}`,
      link: "/QuotesReceivedShipper",
    },
  ];

  const appMenuItemsCarrier = [
    {
      name: `${t("My Dashboard")}`,
      link: "/Dashboard",
    },
    {
      name: `${t("My Profile")}`,
      items: [
        {
          name: `${t("Company Profile")}`,
          link: "/carrier/CarrierCompanyProfile",
        },
      ],
    },
    {
      name: `${t("Post availability")}`,
      link: "/postAvailability",
    },
    {
      name: `${t("Quote Received")}`,
      link: "/carrierQuotes",
    },
    {
      name: `${t("Driver")}`,
      items: [
        {
          name: `${t("Add Drivers")}`,
          link: "/carrier/AddDriverDetails",
        },
        {
          name: `${t("Get Drivers")}`,
          link: "/carrier/DriverDetails",
        },
      ],
    },
  ];
  let parent = "";
  customerType === "shipper"
    ? appMenuItemsShipper.map((item) => {
        if (item.items && item.items.length > 0) {
          const found = item.items.some((el) => {
            if (el.link === activeLink) {
              parent = item.name;
            }
          });
        }
      })
    : appMenuItemsCarrier.map((item) => {
        if (item.items && item.items.length > 0) {
          const found = item.items.some((el) => {
            if (el.link === activeLink) {
              parent = item.name;
            }
          });
        }
      });
  return parent;
};

const AppMenu = ({
  hideDrawer,
  activeLink,
  customerType,
  carrierFirstName,
  shipperFirstName,
}) => {
  const { t } = useTranslation();
  const appMenuItemsShipper = [
    {
      name: `${t("My Dashboard")}`,
      link: "/Dashboard",
    },
    {
      name: `${t("My Profile")}`,
      items: [
        {
          name: `${t("Company Profile")}`,
          link: "/shipper/ShipperCompanyProfile",
        },
      ],
    },
    {
      name: `${t("Search Carrier")}`,
      link: "/ShipperPostLoad",
    },
    {
      name: `${t("qoute details")}`,
      link: "/QuotesReceivedShipper",
    },
  ];

  const appMenuItemsCarrierNoRegistration = [
    {
      name: `${t("Register")}`,
      link: "/carrier/carrierDash",
    },
  ];

  const appMenuItemsShipperNoRegistration = [
    {
      name: `${t("Register")}`,
      link: "/shipper/shipperDash",
    },
  ];

  const appMenuItemsCarrier = [
    {
      name: `${t("My Dashboard")}`,
      link: "/Dashboard",
    },
    {
      name: `${t("My Profile")}`,
      items: [
        {
          name: `${t("Company Profile")}`,
          link: "/carrier/CarrierCompanyProfile",
        },
      ],
    },
    {
      name: `${t("VEHICLE")}`,
      items: [
        {
          name: `${t("Post availability")}`,
          link: "/postAvailability",
        },
        {
          name: `${t("GET_AVAILABILITY")}`,
          link: "/carrier/GetAvailability",
        },
      ],
    },
    {
      name: `${t("Quote Received")}`,
      link: "/carrierQuotes",
    },
    {
      name: `${t("Driver")}`,
      items: [
        {
          name: `${t("Add Drivers")}`,
          link: "/carrier/AddDriverDetails",
        },
        {
          name: `${t("Get Drivers")}`,
          link: "/carrier/DriverDetails",
        },
      ],
    },
  ];

  const handleMenuDisplay = () => {
    if (customerType === "shipper") {
      if (shipperFirstName) {
        return appMenuItemsShipper.map((item, index) => (
          //custom component which iterate through each nav item
          <AppMenuItem
            hideDrawer={hideDrawer}
            activeLink={activeLink}
            {...item}
            key={index}
          />
        ));
      } else {
        return appMenuItemsShipperNoRegistration.map((item, index) => (
          //custom component which iterate through each nav item
          <AppMenuItem
            hideDrawer={hideDrawer}
            activeLink={activeLink}
            {...item}
            key={index}
          />
        ));
      }
    } else {
      if (carrierFirstName) {
        return appMenuItemsCarrier.map((item, index) => (
          //custom component which iterate through each nav item
          <AppMenuItem
            hideDrawer={hideDrawer}
            activeLink={activeLink}
            {...item}
            key={index}
          />
        ));
      } else {
        return appMenuItemsCarrierNoRegistration.map((item, index) => (
          //custom component which iterate through each nav item
          <AppMenuItem
            hideDrawer={hideDrawer}
            activeLink={activeLink}
            {...item}
            key={index}
          />
        ));
      }
    }
  };
  return (
    <List component="nav" disablePadding>
      {/* {handleMenuDisplay()} */}
      {customerType === "shipper"
        ? appMenuItemsShipper.map((item, index) => (
            //custom component which iterate through each nav item
            <AppMenuItem
              hideDrawer={hideDrawer}
              activeLink={activeLink}
              {...item}
              key={index}
            />
          ))
        : appMenuItemsCarrier.map((item, index) => (
            //custom component which iterate through each nav item
            <AppMenuItem
              hideDrawer={hideDrawer}
              activeLink={activeLink}
              {...item}
              key={index}
            />
          ))}
    </List>
  );
};

export default AppMenu;
