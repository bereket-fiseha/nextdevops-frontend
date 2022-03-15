import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import detector from "i18next-browser-languagedetector";
import translationEN from "./translations/en.json";
import translationFR from "./translations/fr.json";

const resources = {
  en: {
    translation: translationEN
  },
  fr: {
    translation: translationFR
  }
};



i18n
  .use(detector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    detection: {
      order: ["localStorage", "navigator"],
      lookupQuerystring: "lng",
      lookupLocalStorage: 'I18N_LANGUAGE',
      caches: ["localStorage"]
    },
    resources,
    debug: false,
    fallbackLng: 'en',
    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
