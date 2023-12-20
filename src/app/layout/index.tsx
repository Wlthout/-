import { Outlet } from "react-router-dom";
import styles from "./layout.module.css";
import { Header } from "../../widgets/header";
import containerStyles from "../../assets/styles/mainContainer.module.css";
import { Suspense } from "react";
import { CircularProgress } from "@mui/material";

export const Layout = () => {
  return (
    <div className={styles.layoutContainer}>
      <Header />
      <div className={containerStyles.mainContainer}>
        <Suspense
          fallback={
            <div className={styles.loader}>
              <CircularProgress />
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};
