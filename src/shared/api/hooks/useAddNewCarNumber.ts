import { Api } from "../api.ts";
import { AddNewCarNumberRequestType, StatusType } from "../types.ts";

export const useAddNewCarNumber = () => {
  const addNewCarNumber = async (data: AddNewCarNumberRequestType) => {
    try {
      const response: StatusType = await Api.addNewCarNumber(data);

      return response;
    } catch (e) {
      console.error(e);
    }
  };

  return { addNewCarNumber };
};
