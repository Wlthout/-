import { RegisterFormType } from "../../../entities/registerForm/types.ts";
import { Api } from "../api.ts";
import { StatusType } from "../types.ts";

export const useRegister = () => {
  const registerHandler = async (data: RegisterFormType) => {
    try {
      const response: StatusType = await Api.register(data);

      return response;
    } catch (e) {
      console.error(e);
    }
  };

  return { registerHandler };
};
