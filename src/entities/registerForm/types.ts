import { z } from "zod";

export const registerFormSchema = z
  .object({
    surname: z.string().min(1, { message: "Обязательное поле" }),
    firstname: z.string().min(1, { message: "Обязательное поле" }),
    middlename: z.string().min(1, { message: "Обязательное поле" }),
    login: z.string().min(1, { message: "Обязательное поле" }),
    password: z
      .string()
      .trim()
      .min(1, { message: "Обязательное поле" })
      .min(4, { message: "Пароль должен быть больше 4 символов" }),
    confirmPassword: z.string().trim().min(1, { message: "Обязательное поле" }),
    userType: z.string(),
    accountType: z.string(),
    companyName: z.string() /*.min(1, { message: "Обязательное поле" })*/,
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  })
  .refine(
    (values) => {
      return (
        values.accountType !== "LEGAL" ||
        (values.accountType === "LEGAL" && values.companyName.length > 0)
      );
    },
    {
      message: "Обязательное поле для юридических лиц",
      path: ["companyName"],
    },
  );

export type RegisterFormType = z.infer<typeof registerFormSchema>;
