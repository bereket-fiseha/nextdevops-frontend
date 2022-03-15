import React from "react";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import {
  ButtonGroup,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    overflow: "hidden",
  },
  image: {
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  flexBox: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    padding: "3rem",
  },
  typoClass: {
    paddingTop: "1.5rem",
    paddingBottom: "1.5rem",
    fontSize: "30px",
    color: "black !important",
    textAlign: "left",
    fontWeight: "bold",
    lineHeight: "1.1",
  },
  sectionHeading: {
    fontSize: "40px",
    textAlign: "left !important",
    fontWeight: "bold",
    lineHeight: "1.1",
  },
  itemLi: {
    "& span": {
      fontSize: "18px",
      lineHeight: "1 !important",
      color: "black !important",
    },
  },
  itemClass: {
    paddingTop: "0 !important",
    paddingBottom: "0 !important",
  },
  buttnGroup: {
    display: "flex",
    justifyContent: "space-around",
  },
  btnClass: {
    backgroundColor: "#92d050",
    textTransform: "capitalize",
    borderRadius: "0",
    fontWeight: "bold",
    fontSize: "14px",
    border: "0",
    padding: "0.65rem 2rem",
  },
  paraClass: {
    color: "black !important",
    fontSize: "20px",
    lineHeight: "1.3",
    marginBottom: "32px",
  },
}));

const Section = ({
  headingText = "",
  description,
  conditions = [],
  btnText = "",
  btnLink = "",
  btn2Text = "",
  btn2Link = "",
  imgUrl = "",
  content = "",
}) => {
  const classes = useStyles();

  const ItemsList = () => (
    <List style={{ paddingBottom: "1.5rem" }}>
      {conditions.map((value) => {
        const labelId = `checkbox-list-label-${value}`;
        return (
          <ListItem key={value} className={classes.itemClass}>
            <ListItemIcon>
              <CheckIcon
                edge="start"
                disableRipple
                inputProps={{ "aria-labelledby": labelId }}
              />
            </ListItemIcon>
            <ListItemText
              id={labelId}
              primary={value}
              className={classes.itemLi}
            />
          </ListItem>
        );
      })}
    </List>
  );

  return (
    <Grid
      container
      component="section"
      className={`${classes.root}  section-space`}
    >
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        className={classes.image}
        style={{
          backgroundImage: `url(${imgUrl})`,
        }}
      />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        // component={Paper}
        elevation={6}
        square
        className={classes.flexBox}
      >
        <Typography
          component="h1"
          variant="h5"
          className={classes.sectionHeading}
        >
          {headingText}
        </Typography>
        <Typography className={classes.typoClass}>{description}</Typography>
        {content.length > 0 ? (
          content.map((item) => (
            <Typography className={classes.paraClass}>{item}</Typography>
          ))
        ) : (
          <ItemsList />
        )}
        <ButtonGroup className={classes.buttnGroup}>
          {btnText && (
            <Link href={btnLink}>
              <Button className={classes.btnClass}>{btnText}</Button>
            </Link>
          )}
          <Link href={btn2Link}>
            <Button className={classes.btnClass}>{btn2Text}</Button>
          </Link>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};
export default Section;
