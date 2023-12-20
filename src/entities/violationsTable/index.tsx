import { DataGrid } from "@mui/x-data-grid";
import { UseViolationsTable } from "../../shared/hooks/useViolationsTable.tsx";
import { ViolationType } from "../../shared/api/types.ts";
import { useTranslation } from "react-i18next";

export type ViolationsTablePropsType = {
  violations: ViolationType[];
  height: string;
};

export const ViolationsTable = ({
  violations,
  height,
}: ViolationsTablePropsType) => {
  const { t } = useTranslation();

  const { columns, rows } = UseViolationsTable({ violations });

  return (
    <DataGrid
      style={{ height: `${height}vh` }}
      getRowHeight={() => "auto"}
      getEstimatedRowHeight={() => 200}
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 7,
          },
        },
      }}
      sx={{
        "&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell": {
          py: 1,
        },
        "&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell": {
          py: "10px",
        },
        "&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell": {
          py: "15px",
        },
      }}
      localeText={{
        noRowsLabel: t("noData"),
        MuiTablePagination: {
          labelDisplayedRows: ({ from, to, count }) => (
            <span style={{ userSelect: "none" }}>
              {from} - {to} {t("fromAll")} {count}
            </span>
          ),
        },
      }}
      disableRowSelectionOnClick
    />
  );
};
