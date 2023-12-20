import { ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n/config.ts";
import { BrowserRouter } from "react-router-dom";

export const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>{children}</BrowserRouter>
    </I18nextProvider>
  );
};
