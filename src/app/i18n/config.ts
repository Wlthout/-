import i18n from "i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { z } from "zod";
import { zodI18nMap } from "zod-i18n-map";

const apiKey = "uxrb-Tf5WTU1-69gYWFwZQ";
const loadPath = `https://api.i18nexus.com/project_resources/translations/{{lng}}/{{ns}}.json?api_key=${apiKey}`;

void i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "ru",

    ns: ["default"],
    defaultNS: "default",

    supportedLngs: ["ru","en"],

    backend: {
      loadPath: loadPath
    }
  })

z.setErrorMap(zodI18nMap);

export default i18n;