import { FormControl, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export function SelectLanguage() {
  const [changing, setChanging] = useState(false);

  const {
    i18n: { language, changeLanguage },
  } = useTranslation();

  async function handleChangeLanguage(lng?: string) {
    try {
      setChanging(true);
      await changeLanguage(lng);
      setChanging(false);
    } catch (error) {
      console.error(error);
      setChanging(false);
    }
  }

  return (
    <FormControl sx={{ minWidth: 140 }} size="small">
      <Select
        value={language}
        onChange={(e) => handleChangeLanguage(e.target.value)}
        disabled={changing}
      >
        <MenuItem value={"ru"}>Русский</MenuItem>
        <MenuItem value={"en"}>English</MenuItem>
      </Select>
    </FormControl>
  );
}
