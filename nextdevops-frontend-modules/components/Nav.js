import React, { Fragment, useState, useEffect } from "react";
import { Drawer, IconButton, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Link from "next/link";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import { Container, Navbar, NavDropdown, Nav } from "react-bootstrap";
import i18n from "i18next";
import styles from "../styles/Nav.module.css";
import clsx from "clsx";
import AppMenu from "./AppMenu";
import FullPageLoader from "./Helper/FullPageLoader";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { connect } from "react-redux";
import {
  setShipperId,
  setShipperDetailsFromLocalStorage
} from "../redux/actions/shipperRegistration";
import {
  setCarrierId,
  setCarrierDetailsFromLocalStorage
} from "../redux/actions/carrierRegistration";
import { setLoadFactorUserId } from "../redux/actions/loadFactorUserRegistration";
import { setAdminId } from "../redux/actions/adminRegistration";
import { useTranslation } from "react-i18next";

const Navi = props => {
  const router = useRouter();
  const { t } = useTranslation();

  // state to open/close sidebar
  const [open, setOpen] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  //state to store active link
  const [activeLink, setActiveLink] = useState("");
  const [user, setUser] = useState(null);

  const handleSideNavBar = async userId => {
    if (localStorage.getItem("shipperDetails")) {
      props.setShipperId(userId);
      await props.setShipperDetailsFromLocalStorage(
        JSON.parse(localStorage.getItem("shipperDetails"))
      );
    } else if (localStorage.getItem("carrierDetails")) {
      await props.setCarrierDetailsFromLocalStorage(
        JSON.parse(localStorage.getItem("carrierDetails"))
      );
      props.setCarrierId(userId);
    }
  };
  useEffect(() => {
    // Access the user session on the client
    Auth.currentAuthenticatedUser()
      .then(async user => {
        const userId = user.attributes.sub;
        props.setAuth(Boolean(localStorage.getItem("user") || ""));
        setUser(Boolean(localStorage.getItem("user") || ""));
        if (
          !localStorage.getItem("loadfactorUser") &&
          !localStorage.getItem("admin")
        ) {
          handleSideNavBar(userId);
        } else if (localStorage.getItem("admin")) {
          await props.setAdminId(userId);
        } else if (localStorage.getItem("loadfactorUser")) {
          await props.setLoadFactorUserId(userId);
        }
      })
      .catch(err => setUser(null));
  }, [props.shipperUserId, props.carrierUserId]);

  //set active link on load
  useEffect(() => {
    if (typeof window !== "undefined") {
      setActiveLink(window.location.pathname);
    }
  }, []);

  // open sidebar
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleChange = value => {
    i18n.changeLanguage(value);
  };
  // close sidebar
  const handleDrawerClose = () => {
    setOpen(false);
  };
  //close drawer and set active link
  const drawerClose = link => {
    setActiveLink(link);
    setOpen(false);
  };

  const handleSignOut = () => {
    props.setShipperId("");
    props.setCarrierId("");
    props.setLoadFactorUserId("");
    props.setAdminId("");
    setShowLoader(true);
    Auth.signOut().then(res => {
      router.push("/").then(() => {
        router.reload();
      });
      localStorage.clear();
      setTimeout(() => {
        setShowLoader(false);
      }, 2000);
    });
  };

  const {
    shipperDetails: { shipperInfo },
    carrierDetails: { carrierInfo }
  } = props;
  //Get the current user name of the logged in user if its carrier or shipper else show loadhitch user
  const loggedInCarriername =
    carrierInfo?.carrierCompName !== "" && carrierInfo?.carrierCompName;
  const loggedInShippername =
    shipperInfo?.shipperCompName !== "" && shipperInfo?.shipperCompName;
  const currentUser =
    loggedInCarriername || loggedInShippername || "LoadHitch User";

  return (
    <Fragment>
      {/* component for hide sidebar by clicking outside */}
      {showLoader && <FullPageLoader />}
      <ClickAwayListener onClickAway={handleDrawerClose}>
        <div className={styles.root}>
          {/* Sidebar Drawer component */}
          <Drawer
            className={styles.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
              paper: styles.drawerPaper
            }}
          >
            {/* user Icon and name */}
            <div className={styles.drawerHeader}>
              <AccountCircleIcon className={styles.userIcon} />
              <Typography className={styles.userText}>{currentUser}</Typography>
            </div>
            {/* custome component which render sidebar items */}
            <AppMenu
              hideDrawer={drawerClose}
              activeLink={activeLink}
              customerType={
                props.shipperUserId || shipperInfo?.firstName
                  ? "shipper"
                  : "carrier"
              }
              carrierFirstName={carrierInfo && carrierInfo.firstName}
              shipperFirstName={shipperInfo && shipperInfo.firstName}
            />
          </Drawer>

          <main
            className={clsx(styles.content, {
              [styles.contentShift]: open
              // [styles.backdrop]: open,
            })}
          >
            <Container>
              {/* MenuIcon to open sidebar */}
              <Navbar
                collapseOnSelect
                expand="lg"
                fixed="top"
                variant="dark"
                className={styles.navBlack}
              >
                {/* the menu drawer should be dynamic for shipper and carrier */}
                {(shipperInfo && shipperInfo.firstName !== "") ||
                (carrierInfo && carrierInfo.firstName !== "") ? (
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    className={clsx(styles.menuButton, open && styles.hide)}
                  >
                    <MenuIcon />
                  </IconButton>
                ) : (
                  <Fragment></Fragment>
                )}

                <Link href="/" passHref>
                  <Navbar.Brand>
                    <img
                      src="/logo.png"
                      width="300"
                      className="align-top d-inline-block"
                      alt="Loadhitch logo"
                    />
                  </Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="ml-auto align-items-center bg-theme-dark ">
                    <div className="d-flex">
                      <Link
                        href="/"
                        passHref
                        className={router.pathname == "/" ? "active" : ""}
                      >
                        <Nav.Link as="a" href="/">
                          {t("Home")}
                        </Nav.Link>
                      </Link>

                      <NavDropdown
                        title=""
                        className="ml-2"
                        id="collasible-nav-dropdown"
                      >
                        <Link
                          href="/services"
                          passHref
                          className={
                            router.pathname == "/services" ? "active" : ""
                          }
                        >
                          <NavDropdown.Item href="/services">
                            {t("services")}
                          </NavDropdown.Item>
                        </Link>
                        <Link
                          href="/careers"
                          passHref
                          className={
                            router.pathname == "/careers" ? "active" : ""
                          }
                        >
                          <NavDropdown.Item href="/careers">
                            {t("careers")}
                          </NavDropdown.Item>
                        </Link>
                        <Link
                          href="/common/about"
                          passHref
                          className={
                            router.pathname == "/common/about" ? "active" : ""
                          }
                        >
                          <NavDropdown.Item href="/common/about">
                            {t("about")}
                          </NavDropdown.Item>
                        </Link>
                        <Link
                          href="/contact"
                          passHref
                          className={
                            router.pathname == "/contact" ? "active" : ""
                          }
                        >
                          <NavDropdown.Item href="/common/about">
                            {t("contact")}
                          </NavDropdown.Item>
                        </Link>
                        <Link
                          href="/faq"
                          passHref
                          className={router.pathname == "/faq" ? "active" : ""}
                        >
                          <NavDropdown.Item href="/faq">FAQ</NavDropdown.Item>
                        </Link>
                      </NavDropdown>
                    </div>

                    <div>
                      <NavDropdown
                        title={t("Language")}
                        id="collasible-nav-dropdown"
                      >
                        <NavDropdown.Item onClick={() => handleChange("en")}>
                          English
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={() => handleChange("fr")}>
                          French
                        </NavDropdown.Item>
                      </NavDropdown>
                    </div>
                    <div>
                      <Nav>
                        {props.shipperUserId ||
                        props.carrierUserId ||
                        shipperInfo.firstName ||
                        carrierInfo.firstName ||
                        props.loadfactorUserId ||
                        props.adminId ? (
                          <Nav.Link onClick={handleSignOut}>Sign Out</Nav.Link>
                        ) : (
                          <Fragment></Fragment>
                        )}
                      </Nav>
                    </div>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            </Container>
          </main>
        </div>
      </ClickAwayListener>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    shipperDetails: state.shipperDetails,
    carrierDetails: state.carrierDetails,
    shipperUserId: state.shipperDetails.loggedInUserId,
    carrierUserId: state.carrierDetails.loggedInUserId,
    loadfactorUserId: state.loadfactorDetails.loggedInUserId,
    adminId: state.adminDetails.loggedInUserId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setShipperId: shipperId => setShipperId(dispatch, shipperId),
    setCarrierId: carrierId => setCarrierId(dispatch, carrierId),
    setLoadFactorUserId: loadfactorUserId =>
      setLoadFactorUserId(dispatch, loadfactorUserId),
    setAdminId: adminId => setAdminId(dispatch, adminId),
    setShipperDetailsFromLocalStorage: shipperDetails =>
      setShipperDetailsFromLocalStorage(dispatch, shipperDetails),
    setCarrierDetailsFromLocalStorage: carrierDetails =>
      setCarrierDetailsFromLocalStorage(dispatch, carrierDetails)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navi);
