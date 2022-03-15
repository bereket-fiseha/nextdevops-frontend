import { Button, makeStyles, Typography } from "@material-ui/core";
import Link from "next/link";

const useStyles = makeStyles({
  hero: {
    width: "100%",
    height: "100vh",

    background: (props) =>
      `url(${props.imgUrl}) ${
        props.textPosition === "right" ? "0%" : "100%"
      } 0% no-repeat`,
    backgroundSize: "cover !important",
    display: "grid",
    alignItems: "center",
    justifyContent: "end",
    gridTemplateColumns: "1fr 1fr",
    direction: "row-reverse",
    wrap: "reverse",
    "@media (max-width: 600px)": {
      gridTemplateColumns: "1fr",
      alignItems: (props) =>
        `${props.textPosition === "right" ? "unset" : "end"}`,
    },
  },
  heroContent: {
    padding: "0 30px",
    color: "white",
    "& button": {
      border: 0,
      padding: "20px",
      margin: "10px",
    },
  },
  btnClass: {
    backgroundColor: "#efefef",
    textTransform: "capitalize",
    borderRadius: "0",
    fontWeight: "bold",
    fontSize: "14px",
    border: "0",
    padding: "0.65rem 2rem",
    "&:hover": {
      backgroundColor: "#cbefa5",
    },
  },
});

const HeroSection = ({
  textPosition = "right",
  headingText = "",
  subHeading = "",
  btnText = "",
  btnLink = "",
  btn2Text = "",
  btn2Link = "",
  imgUrl = "",
  btnHideOnLogin = false,
  btn2HideOnLogin = false,
}) => {
  const classes = useStyles({ imgUrl, textPosition });
  const login = Boolean(localStorage.getItem("user") || "");

  return (
    <div className={classes.hero}>
      {textPosition === "right" && <div></div>}

      <div className={classes.heroContent}>
        <Typography variant="h3" component="h2" className="carrier_heading">
          {headingText}
        </Typography>
        <Typography variant="h5" component="h2">
          {subHeading}
        </Typography>
        <div style={{ display: "flex" }}>
          {((!login && btnHideOnLogin) || !btnHideOnLogin) && btnText && (
            <Link href={btnLink}>
              <Button className={classes.btnClass}>{btnText}</Button>
            </Link>
          )}

          {((!login && btn2HideOnLogin) || !btn2HideOnLogin) && btn2Text && (
            <Link href={btn2Link}>
              <Button className={classes.btnClass}>{btn2Text}</Button>
            </Link>
          )}
        </div>
      </div>
      {textPosition === "left" && <div></div>}
    </div>
  );
};

export default HeroSection;
