import React from "react";
import styles from "../../styles/AboutContent.module.css";
import { useTranslation } from "react-i18next";
import Button from "@material-ui/core/Button";
import Link from "next/link";
import { Carousel } from "react-bootstrap";

const HomeAbout = ({
  right,
  nobutton,
  title,
  header,
  body,
  image1,
  image2,
  image3,
  btnText = "Carrier Learn More",
  link = "/LearnMoreCarrier",
  btn2Text = "",
  btn2Link = "",
  tagLine = "",
  slider = [],
  btnHideOnLogin = false,
  btn2HideOnLogin = false,
}) => {
  const { t } = useTranslation();
  const login = Boolean(localStorage.getItem("user") || "");
  const defaultTitle = t("about us page about title");
  const defaultHeader =
    "defaultHeader Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt labore dolore magna aliqua.";
  const defaultBody =
    "defaultBody Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.Lorem Ipsum is simply dummy text of the printing and typesetting industry.";

  return (
    <section className={styles.about_section}>
      <div className="container-fluid">
        {right ? (
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12">
              <div className={`pr-5 mt-4 ${styles.about_area_content}`}>
                <h3>{title}</h3>
                <strong>{header}</strong>
                <p>{body}</p>
                {tagLine && <h4>{tagLine}</h4>}
                {nobutton ? (
                  ""
                ) : (
                  <div className={styles.learn_more_button_style}>
                    <Link href="/LearnMoreShipper" passHref>
                      <Button variant="outlined" size="medium" color="primary">
                        {btnText ? btnText : "Shipper Learn More"}
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="about-image">
                <img
                  src={image1 || require("../../image/log.jpg")}
                  alt="image"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12">
              <div className="about-image">
                {slider.length ? (
                  <Carousel
                    style={{ maxHeight: 500, height: 500, }}
                    controls={false}
                    interval={2000}
                    pause={false}
                  >
                    {slider.map((item, key) => (
                      <Carousel.Item style={{ maxHeight: 500, height: 500, }} key={key}>
                        <img
                          style={{ height: 500, minWidth: 800 }}
                          src={item.imgUrl}
                          alt="Slider"
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                ) : (
                  <img
                    src={image2 || require("../../image/about-image.png")}
                    alt="image"
                  />
                )}
              </div>
            </div>

            <div className="col-lg-6 col-md-12">
              <div className={`pl-5 mt-4 ${styles.about_area_content}`}>
                <h3>{title || defaultTitle}</h3>
                <strong>{header}</strong>
                <p>{body || defaultBody}</p>
                {tagLine && <h4>{tagLine}</h4>}

                {nobutton ? (
                  ""
                ) : (
                  <div className={styles.learn_more_button_style}>
                    {((!login && btnHideOnLogin) || !btnHideOnLogin) &&
                      btnText && (
                        <Link href={link} passHref>
                          <Button
                            variant="outlined"
                            size="medium"
                              color="primary"
                              className="m-2"
                          >
                            {btnText}
                          </Button>
                        </Link>
                      )}

                    {((!login && btn2HideOnLogin) || !btn2HideOnLogin) &&
                      btn2Text && (
                        <Link href={btn2Link} passHref>
                          <Button
                            className="m-2"
                            variant="outlined"
                            size="medium"
                            color="primary"
                          >
                            {btn2Text}
                          </Button>
                        </Link>
                      )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HomeAbout;
