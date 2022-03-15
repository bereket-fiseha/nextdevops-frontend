import HomeAbout from "../HomeAbout/HomeAbout";
import Link from "next/link";
import { useTranslation } from 'react-i18next';

const learnMoreCarrier = () => {
  const {t} = useTranslation();
  return (
    <>
      <HomeAbout nobutton={true} />
      <HomeAbout right nobutton={true} />
      <HomeAbout nobutton={true} />
      <div>
        <Link href="/carrier/CarrierLoginPage" passHref>
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

export default learnMoreCarrier;
