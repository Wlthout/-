import { useTranslation } from "react-i18next";
import { GridColDef } from "@mui/x-data-grid";
import { ViolationType } from "../api/types.ts";

type PropsType = {
  violations: ViolationType[];
};

export const UseViolationsTable = ({ violations }: PropsType) => {
  const { t } = useTranslation("law");

  const columns: GridColDef[] = [
    {
      field: "article",
      headerName: t("article"),
      width: 150,
      editable: true,
      renderCell: (params) => {
        return <div>{`18.${params.row.Article}.${params.row.Paragraph}`}</div>;
      },
      disableColumnMenu: true,
      sortable: false,
    },
    {
      field: "description",
      headerName: t("description"),
      width: 720,
      editable: true,
      renderCell: (params) => {
        return <div>{t(`${params.row.IdViolation}_t`)}</div>;
      },
      disableColumnMenu: true,
      sortable: false,
    },
    {
      field: "penalty",
      headerName: t("penalty"),
      width: 310,
      editable: true,
      renderCell: (params) => {
        return <div>{t(`${params.row.IdViolation}_p`)}</div>;
      },
      disableColumnMenu: true,
      sortable: false,
    },
  ];
  const rows = violations.map((item, index) => ({ id: index, ...item }));

  return {
    columns,
    rows,
  };
};
