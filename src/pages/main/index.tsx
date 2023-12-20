import { useUserInfoStore } from "../../entities/userInfo/store.ts";
import { Navigate } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { ruRU } from "@mui/x-date-pickers/locales";
import "dayjs/locale/ru";
import styles from "./main.module.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { useGetNews } from "../../shared/api/hooks/useGetNews.ts";
import { CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNewsStore } from "../../entities/news/store.ts";

export const MainPage = () => {
  const { t } = useTranslation();

  const isLoggedIn = useUserInfoStore((state) => state.isLoggedIn);

  const [news, setNews] = useNewsStore((state) => [state.news, state.setNews]);

  const { getNews, isLoading } = useGetNews();

  const fetchNews = async () => {
    try {
      const res = await getNews();

      if (res) {
        setNews(res.News);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  if (!isLoggedIn) {
    return <Navigate to={"/auth/login"} />;
  }

  return (
    <div className={styles.mainPage}>
      {!(!isLoading || news) ? (
        <div className={styles.loading}>
          <CircularProgress />
        </div>
      ) : (
        <div className={styles.news}>
          {news && news.length > 0 ? (
            news.map((item) => (
              <Card sx={{ width: "100%" }}>
                <CardMedia sx={{ height: 140 }} image={item.ImageSrc} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.Title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.Text}
                  </Typography>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className={styles.noNews}>{t("noNews")}</div>
          )}
        </div>
      )}
      <div className={styles.calendar}>
        <LocalizationProvider
          adapterLocale={"ru"}
          localeText={
            ruRU.components.MuiLocalizationProvider.defaultProps.localeText
          }
          dateAdapter={AdapterDayjs}
        >
          <DateCalendar />
        </LocalizationProvider>
      </div>
    </div>
  );
};
