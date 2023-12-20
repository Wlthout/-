import {
  Button,
  IconButton,
  InputAdornment,
  Link,
  TextField,
} from "@mui/material";
import styles from "./login.module.css";
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  loginFormSchema,
  LoginFormType,
} from "../../../entities/loginForm/types.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "../../../shared/api/hooks";
import { useTranslation } from "react-i18next";
import { useUserInfoStore } from "../../../entities/userInfo/store.ts";

export const LoginPage = () => {
  const { t } = useTranslation("auth");

  const [setIsLoggedIn, setUserInfo] = useUserInfoStore((state) => [
    state.setIsLoggedIn,
    state.setUserInfo,
  ]);

  const [isShowPass, setIsShowPass] = useState(false);

  const { loginHandler } = useLogin();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit: SubmitHandler<LoginFormType> = async (data) => {
    try {
      const res = await loginHandler(data);

      if (res?.Status === "SUCCEDED") {
        setUserInfo({
          Id: res.Id,
          UserType: res.UserType,
          Firstname: res.Firstname,
          Middlename: res.Middlename,
          Surname: res.Surname,
          ViolationsInfo: res.ViolationsInfo,
        });

        setIsLoggedIn(true);

        navigate("/me");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const forgotPassHandler = useCallback(() => {
    navigate("/auth/register");
  }, [navigate]);

  const setIsShowPassHandler = useCallback(() => {
    setIsShowPass(!isShowPass);
  }, [isShowPass, setIsShowPass]);

  return (
    <div>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.label}>{t("loginFormLabel")}</div>
          <div className={styles.login}>
            <TextField
              label={t("login")}
              fullWidth
              size={"small"}
              {...register("login")}
              error={!!errors.login}
            />
            {errors.login && (
              <span className={styles.warning}>{errors.login.message}</span>
            )}
          </div>
          <div className={styles.pass}>
            <TextField
              label={t("password")}
              fullWidth
              size={"small"}
              type={isShowPass ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={setIsShowPassHandler}>
                      {isShowPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              {...register("password")}
              error={!!errors.password}
            />
            {errors.password && (
              <span className={styles.warning}>{errors.password.message}</span>
            )}
          </div>
          <div className={styles.btnContainer}>
            <div className={styles.forgotPass}>
              <Link onClick={forgotPassHandler} className={styles.link}>
                {t("dontHaveAccount")}
              </Link>
            </div>
            <div className={styles.btn}>
              <Button type={"submit"} variant={"contained"} fullWidth>
                {t("loginButton")}
              </Button>
            </div>
          </div>
        </form>
      </div>
      <div className={styles.overlay} />
    </div>
  );
};
