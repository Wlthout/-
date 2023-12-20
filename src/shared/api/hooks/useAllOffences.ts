import { Api } from "../api.ts";
import { ViolationType } from "../types.ts";

export type OffencesResponseType = {
  Violations: ViolationType[];
};

export const useAllOffences = () => {
  const getAllOffences = async () => {
    try {
      const response: OffencesResponseType = await Api.getAllOffences();

      return response;
    } catch (e) {
      console.error(e);
    }
  };

  return { getAllOffences };
};
