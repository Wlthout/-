import { LoginPage } from "../../pages/auth/login";
import { Layout } from "../layout";
import { Navigate, Route, Routes } from "react-router-dom";
import { RegisterPage } from "../../pages/auth/register";
import { MainPage } from "../../pages/main";
import { LawPage } from "../../pages/law";
import { LkPage } from "../../pages/lk";

export const App = () => {
  return (
    <Routes>
      <Route path={`/`} element={<Layout />}>
        <Route path={`/`} element={<Navigate to={"/auth/login"} />} />
        <Route path={`/auth/login`} element={<LoginPage />} index />
        <Route path={`/auth/register`} element={<RegisterPage />} />

        <Route path={`/main`} element={<MainPage />} />
        <Route path={`/law`} element={<LawPage />} />
        <Route path={`/me`} element={<LkPage />} />
      </Route>
    </Routes>
  );
};
