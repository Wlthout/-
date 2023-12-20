import { useEffect, useState } from "react";
import { useAllOffences } from "../../shared/api/hooks";
import { ViolationsTable } from "../../entities/violationsTable";
import { ViolationType } from "../../shared/api/types.ts";
import { useUserInfoStore } from "../../entities/userInfo/store.ts";
import { Navigate } from "react-router-dom";

export const LawPage = () => {
  const isLoggedIn = useUserInfoStore((state) => state.isLoggedIn);

  const [violations, setViolations] = useState<ViolationType[]>([]);
  const { getAllOffences } = useAllOffences();

  const fetchAllOffences = async () => {
    try {
      const res = await getAllOffences();

      if (res) {
        setViolations(res.Violations);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchAllOffences();
  }, []);

  if (!isLoggedIn) {
    return <Navigate to={"/auth/login"} />;
  }

  return <ViolationsTable violations={violations} height={"88"} />;
};
