import { useUserInfoStore } from "../../entities/userInfo/store.ts";
import Avatar from "@mui/material/Avatar";
import styles from "./lk.module.css";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import {
  Button,
  FormControl,
  IconButton,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { ViolationsTable } from "../../entities/violationsTable";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useAddNewCarNumber } from "../../shared/api/hooks";
import { InfoType } from "../../shared/api/types.ts";

export const LkPage = () => {
  const [isLoggedIn, userInfo, setUserInfo] = useUserInfoStore((state) => [
    state.isLoggedIn,
    state.userInfo,
    state.setUserInfo,
  ]);

  const [registerNumber, setRegisterNumber] = useState("");
  const [series, setSeries] = useState("");
  const [region, setRegion] = useState(7);

  const [addModalIsOpen, setAddModalIsOpen] = useState(false);

  const handleClose = () => {
    setRegisterNumber("");
    setSeries("");
    setRegion(7);
    setAddModalIsOpen(false);
  };

  const handleOpen = () => setAddModalIsOpen(true);

  const { addNewCarNumber } = useAddNewCarNumber();

  const [selectedCarNumber, setSelectedCarNumber] = useState("8892КВ-7");

  const { t } = useTranslation("lk");

  const changeCarNumberHandler = (carNumber: string) => {
    setSelectedCarNumber(carNumber);
  };

  const addCarNumberHandler = async () => {
    const fullNumber = `${registerNumber}${series}-${region}`;

    try {
      if (userInfo) {
        const newViolations: InfoType[] = [
          ...userInfo.ViolationsInfo??[],
          { CarNumber: fullNumber, Violations: [] },
        ];

        const res = await addNewCarNumber({
          id: userInfo.Id,
          CarNumber: fullNumber,
        });

        if (res?.Status === "SUCCEDED") {
          if (userInfo) {
            setUserInfo({
              ...userInfo,
              ViolationsInfo: newViolations,
            });
          }
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      handleClose();
    }
  };

  const violations = userInfo?.ViolationsInfo?.filter(
    (info) => info.CarNumber === selectedCarNumber,
  );

  const accountType = userInfo?.UserType === "DRIVER" ? "driver" : "owner";

  if (!isLoggedIn) {
    return <Navigate to={"/auth/login"} />;
  }

  return (
    <div className={styles.lkPage}>
      <div className={styles.userInfo}>
        <Avatar
          src="/broken-image.jpg"
          variant={"square"}
          style={{ width: "200px", height: "200px" }}
        />
        <div className={styles.infoWithButton}>
          <div className={styles.info}>
            <div className={styles.name}>
              <span className={styles.boldText}>{t("fullName")}:</span>{" "}
              {userInfo?.Surname} {userInfo?.Firstname} {userInfo?.Middlename}
            </div>
            <div>
              <span className={styles.boldText}>{t("accountType")}:</span>{" "}
              {t(accountType)}
            </div>
            <div className={styles.carNumber}>
              {userInfo && userInfo.ViolationsInfo?.length > 0 && (
                <>
                  <span className={styles.boldText}>{t("carNumber")}: </span>
                  <FormControl size={"small"}>
                    <Select
                      value={selectedCarNumber}
                      onChange={(e) => changeCarNumberHandler(e.target.value)}
                    >
                      {userInfo?.ViolationsInfo.map((info) => (
                        <MenuItem value={info.CarNumber}>
                          {info.CarNumber}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </>
              )}
            </div>
          </div>
          <div>
            <IconButton color={"info"} onClick={handleOpen}>
              <AddBoxIcon />
            </IconButton>
            <Modal
              className={styles.modal}
              open={addModalIsOpen}
              onClose={handleClose}
            >
              <div className={styles.modalContent}>
                <div className={styles.inputs}>
                  <TextField
                    onChange={(e) => setRegisterNumber(e.target.value)}
                    value={registerNumber}
                    label={"Регистрационный номер"}
                    size={"small"}
                    fullWidth
                  />
                  <TextField
                    onChange={(e) => setSeries(e.target.value)}
                    value={series}
                    label={"Серия"}
                    size={"small"}
                    fullWidth
                  />
                  <TextField
                    onChange={(e) => setRegion(parseInt(e.target.value))}
                    value={region}
                    type={"number"}
                    label={"Код региона регистрации"}
                    size={"small"}
                    fullWidth
                    InputProps={{ inputProps: { min: 1, max: 7 } }}
                  />
                </div>
                <div className={styles.buttonContainer}>
                  <Button
                    onClick={handleClose}
                    variant={"outlined"}
                    size={"small"}
                    color={"info"}
                  >
                    Отменить
                  </Button>
                  <Button
                    onClick={addCarNumberHandler}
                    variant={"contained"}
                    size={"small"}
                    color={"info"}
                  >
                    Добавить
                  </Button>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      </div>
      <div>
        <div className={styles.yourPenalties}>{t("yourPenalties")}</div>
        <ViolationsTable
          violations={violations?.[0] && violations?.[0].Violations || []}
          height={"60"}
        />
      </div>
    </div>
  );
};
