import React from "react";
import { Carousel } from "react-bootstrap";
import styles from "../styles/Slider.module.css";
import { useTranslation } from "react-i18next";
const Slider = () => {
  const { t } = useTranslation();
  const values = [
    {
      title: t("Hazmat"),
      imgUrl: '/images/slider1.jpeg',
      buttonText: t("home slider button text"),
    },
    {
      title: t("Reefer"),
      imgUrl: '/images/slider2.jpeg',
      buttonText: t("home slider button text"),
    },
    {
      title: t("Dry Van"),
      imgUrl: '/images/slider3.jpeg',
      buttonText: t("home slider button text"),
    },
    {
      title: t("Flatbed"),
      imgUrl: '/images/slider4.jpeg',
      buttonText: t("home slider button text"),
    },
  ];

  return (
    <div className={styles.slider} style={{ paddingTop: '2rem'}}>
      <Carousel controls={false} interval={2000} pause={false}>
        {values.map((item, key) => (
          <Carousel.Item key={key}>
            <img className="w-100" src={item.imgUrl} alt="Slider" />
            <Carousel.Caption>
              <h1>{item.title}</h1>
              {/*<button>{item.buttonText}</button>*/}

            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Slider;
