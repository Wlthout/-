import styles from "./register.module.css";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  Link,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  registerFormSchema,
  RegisterFormType,
} from "../../../entities/registerForm/types.ts";
import { useTranslation } from "react-i18next";
import { useRegister } from "../../../shared/api/hooks";

export const RegisterPage = () => {
  const { t } = useTranslation(["auth", "lk"]);

  const { registerHandler } = useRegister();

  const [isShowPass, setIsShowPass] = useState(false);
  const [isShowConfirmPass, setIsShowConfirmPass] = useState(false);

  const navigate = useNavigate();

  const {
    setValue,
    watch,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormType>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      accountType: "PHYSICAL",
      userType: "DRIVER",
    },
  });

  const accountType = watch("accountType");

  useEffect(() => {
    if (accountType === "PHYSICAL") {
      setValue("companyName", "");
    }
  }, [setValue, accountType]);

  const onSubmit: SubmitHandler<RegisterFormType> = async (data) => {
    console.log(data);
    try {
      const res = await registerHandler(data);

      if (res?.Status === "SUCCEDED") {
        navigate("/auth/login");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const alreadyHaveAccountHandler = useCallback(() => {
    navigate("/auth/login");
  }, [navigate]);

  const setIsShowPassHandler = useCallback(() => {
    setIsShowPass(!isShowPass);
  }, [isShowPass, setIsShowPass]);

  const setIsShowConfirmPassHandler = useCallback(() => {
    setIsShowConfirmPass(!isShowConfirmPass);
  }, [isShowConfirmPass, setIsShowConfirmPass]);

  return (
    <div>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.label}>{t("registerFormLabel")}</div>
          <div className={styles.fieldsContainer}>
            <div className={styles.userInfo}>
              <div className={styles.field}>
                <TextField
                  label={t("lastName")}
                  fullWidth
                  size={"small"}
                  {...register("surname")}
                  error={!!errors.surname}
                />
                {errors.surname && (
                  <span className={styles.warning}>
                    {errors.surname.message}
                  </span>
                )}
              </div>
              <div className={styles.field}>
                <TextField
                  label={t("firstName")}
                  fullWidth
                  size={"small"}
                  {...register("firstname")}
                  error={!!errors.firstname}
                />
                {errors.firstname && (
                  <span className={styles.warning}>
                    {errors.firstname.message}
                  </span>
                )}
              </div>
              <div className={styles.field}>
                <TextField
                  label={t("middleName")}
                  fullWidth
                  size={"small"}
                  {...register("middlename")}
                  error={!!errors.middlename}
                />
                {errors.middlename && (
                  <span className={styles.warning}>
                    {errors.middlename.message}
                  </span>
                )}
              </div>
              <div className={styles.field}>
                <Controller
                  control={control}
                  name={"userType"}
                  render={({ field }) => (
                    <FormControl size={"small"} fullWidth>
                      <Select {...field}>
                        <MenuItem value="DRIVER">
                          {t("driver", { ns: "lk" })}
                        </MenuItem>
                        <MenuItem value="OWNER">
                          {t("owner", { ns: "lk" })}
                        </MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              </div>
              <div className={styles.field}>
                <Controller
                  control={control}
                  name={"accountType"}
                  render={({ field }) => (
                    <FormControl size={"small"} fullWidth>
                      <Select {...field}>
                        <MenuItem value="PHYSICAL">
                          {t("physicalPerson")}
                        </MenuItem>
                        <MenuItem value="LEGAL">{t("legalPerson")}</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              </div>
              <div className={styles.field}>
                {accountType === "LEGAL" && (
                  <div className={styles.field}>
                    <TextField
                      label={t("companyName")}
                      fullWidth
                      size={"small"}
                      {...register("companyName")}
                      error={!!errors.companyName}
                    />
                    {errors.companyName && (
                      <span className={styles.warning}>
                        {errors.companyName.message}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className={styles.authFields}>
              <div className={styles.field}>
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
              <div className={styles.field}>
                <TextField
                  label={t("password")}
                  fullWidth
                  size={"small"}
                  type={isShowPass ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={setIsShowPassHandler}>
                          {isShowPass ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  {...register("password")}
                  error={!!errors.password}
                />
                {errors.password && (
                  <span className={styles.warning}>
                    {errors.password.message}
                  </span>
                )}
              </div>
              <div className={styles.field}>
                <TextField
                  label={t("confirmPassword")}
                  fullWidth
                  size={"small"}
                  type={isShowConfirmPass ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={setIsShowConfirmPassHandler}>
                          {isShowConfirmPass ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  {...register("confirmPassword")}
                  error={!!errors.password}
                />
                {errors.confirmPassword && (
                  <span className={styles.warning}>
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className={styles.btnContainer}>
            <div className={styles.forgotPass}>
              <Link onClick={alreadyHaveAccountHandler} className={styles.link}>
                {t("alreadyHaveAccount")}
              </Link>
            </div>
            <div className={styles.btn}>
              <Button type={"submit"} variant={"contained"} fullWidth>
                {t("registerButton")}
              </Button>
            </div>
          </div>
        </form>
      </div>
      <div className={styles.overlay} />
    </div>
  );
};
