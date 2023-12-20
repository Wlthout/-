import logo from "../../assets/header-icon.svg";
import styles from "./header.module.css";
import { Button, Link, Popover } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import HomeIcon from "@mui/icons-material/Home";
import GavelIcon from "@mui/icons-material/Gavel";
import { ReactNode, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SelectLanguage } from "../../features/select-language";
import { useTranslation } from "react-i18next";
import { useUserInfoStore } from "../../entities/userInfo/store.ts";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import LanguageIcon from "@mui/icons-material/Language";

const menuItems: { icon: ReactNode; key: string; link: string }[] = [
  { icon: <HomeIcon />, key: "mainPage", link: "/main" },
  { icon: <GavelIcon />, key: "lawPage", link: "/law" },
  { icon: <AccountBoxIcon />, key: "lkPage", link: "/me" },
];

export const Header = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const isLoggedIn = useUserInfoStore((state) => state.isLoggedIn);

  const { t } = useTranslation("navigation");

  const navigate = useNavigate();

  const navigateHandler = useCallback(
    (to: string) => {
      navigate(to);
    },
    [navigate],
  );

  return (
    <div className={styles.headerContainer}>
      <div className={styles.mainContainer}>
        <div className={styles.headerContent}>
          <img src={logo} alt="logo" width={50} height={"auto"} />
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={styles.menuItem}
              onClick={() => navigateHandler(item.link)}
              style={{
                pointerEvents: isLoggedIn ? "all" : "none",
                color: isLoggedIn ? "" : "gray",
              }}
            >
              {item.icon}
              <Link
                color={isLoggedIn ? "#1976d2" : "lightgray"}
                underline={"none"}
              >
                {t(item.key)}
              </Link>
            </div>
          ))}
        </div>
        <div className={styles.additionalInfo}>
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <div className={styles.popoverContent}>
              <div className={styles.item}>
                <PhoneIphoneIcon />
                +375 17 292-10-11
              </div>
              <div className={styles.item}>
                <LanguageIcon />
                <Link
                  target={"_blank"}
                  href="https://bntu.by/"
                  underline="none"
                >
                  bntu.by
                </Link>
              </div>
            </div>
          </Popover>
          <Button onClick={handleClick}>{t("contactsPage")}</Button>
          <SelectLanguage />
        </div>
      </div>
    </div>
  );
};
