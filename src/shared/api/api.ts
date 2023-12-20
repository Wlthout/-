import { LoginFormType } from "../../entities/loginForm/types.ts";
import { RegisterFormType } from "../../entities/registerForm/types.ts";
import { AddNewCarNumberRequestType } from "./types.ts";

export class Api {
  public static async login(data: LoginFormType) {
    try {
      return await fetch("http://172.20.10.3:8085", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, type: "LOGIN" }),
      })
        .then((response) => response.json())
        .catch((error) => {
          console.error("Ошибка:", error);
        });
    } catch (e) {
      console.error(e);
    }
  }

  public static async register(data: RegisterFormType) {
    try {
      return await fetch("http://172.20.10.3:8085", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, type: "REGISTER" }),
      })
        .then((response) => response.json())
        .catch((error) => {
          console.error("Ошибка:", error);
        });
    } catch (e) {
      console.error(e);
    }
  }

  public static async getAllOffences() {
    try {
      return await fetch("http://172.20.10.3:8085", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type: "GET_ALL_OFFENCES" }),
      })
        .then((response) => response.json())
        .catch((error) => {
          console.error("Ошибка:", error);
        });
    } catch (e) {
      console.error(e);
    }
  }

  public static async addNewCarNumber(data: AddNewCarNumberRequestType) {
    try {
      return await fetch("http://172.20.10.3:8085", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, Type: "ADD_NEW_CAR_NUMBER" }),
      })
        .then((response) => response.json())
        .catch((error) => {
          console.error("Ошибка:", error);
        });
    } catch (e) {
      console.error(e);
    }
  }

  public static async getNews() {
    try {
      return await fetch("http://172.20.10.3:8085", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type: "GET_NEWS" }),
      })
        .then((response) => response.json())
        .catch((error) => {
          console.error("Ошибка:", error);
        });
    } catch (e) {
      console.error(e);
    }
  }
}
