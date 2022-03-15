import HomeAbout from "../HomeAbout/HomeAbout";
import Video from "../Video";
import Link from "next/link";
import { useTranslation } from 'react-i18next';

const learnMoreShipper = () => {
  const {t} = useTranslation();
  return (
    <>
      <HomeAbout nobutton={true} />
      <HomeAbout right nobutton={true} />
      <Video />
      <HomeAbout nobutton={true} />
      <div>
        <Link href="/shipper/ShipperLoginPage" passHref>
          <div className="row w-100">
            <button className="primary-submit-button">
              {t("lets sign up")}
            </button>
          </div>
        </Link>
      </div>
    </>
  );
};

export default learnMoreShipper;
