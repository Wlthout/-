import { LoginFormType } from "../../../entities/loginForm/types.ts";
import { LoginResponseType } from "../types.ts";
import { Api } from "../api.ts";

export const useLogin = () => {
  const loginHandler = async (data: LoginFormType) => {
    try {
      const response: LoginResponseType = await Api.login(data);

      return response;
    } catch (e) {
      console.error(e);
    }
  };

  return { loginHandler };
};
