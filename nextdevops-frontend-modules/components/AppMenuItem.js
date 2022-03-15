import React from "react";
import styles from "../styles/Nav.module.css";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Collapse from "@material-ui/core/Collapse";
import IconExpandLess from "@material-ui/icons/ExpandLess";
import IconExpandMore from "@material-ui/icons/ExpandMore";
import AppMenuItemComponent from "./AppMenuItemComponent";
import { connect } from "react-redux";

const AppMenuItem = (props) => {
  const {
    name,
    link,
    Icon,
    items = [],
    hideDrawer,
    activeLink,
    parent = "",
    shipperUserId,
  } = props;
  // variable to check if it is single element or nested links
  const isExpandable = items && items.length > 0;
  // state to maintain expand/shrink nested links
  const [open, setOpen] = React.useState(false);
  // toggle func to expand/shrink items
  function handleClick() {
    setOpen(!open);
  }

  // render root element
  const MenuItemRoot = (
    // custom component for actual nav item
    <AppMenuItemComponent
      hideDrawer={hideDrawer}
      activeLink={activeLink}
      name={name}
      className={styles.menuItem}
      link={link}
      onClick={handleClick}
      parent={parent}
      customerType={shipperUserId ? "shipper" : "carrier"}
    >
      {name}
      {/* show expand or shrink icon based on current state */}
      {isExpandable && !open && <IconExpandMore className={styles.iconRight} />}
      {isExpandable && open && <IconExpandLess className={styles.iconRight} />}
    </AppMenuItemComponent>
  );

  // render child elements
  const MenuItemChildren = isExpandable ? (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <Divider />
      <List component="div" disablePadding style={{ marginLeft: "1rem" }}>
        {items.map((item, index) => (
          // recursive render for child nav links
          <AppMenuItem
            hideDrawer={hideDrawer}
            activeLink={activeLink}
            {...item}
            key={index}
            parent={name}
          ></AppMenuItem>
        ))}
      </List>
    </Collapse>
  ) : null;

  return (
    <>
      {MenuItemRoot}
      {MenuItemChildren}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    shipperUserId: state.shipperDetails.loggedInUserId,
    carrierUserId: state.carrierDetails.loggedInUserId,
  };
};

export default connect(mapStateToProps, null)(AppMenuItem);
