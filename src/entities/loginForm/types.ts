import { z } from "zod";

export const loginFormSchema = z.object({
  login: z.string().min(1, { message: "Обязательное поле" }),
  password: z
    .string()
    .trim()
    .min(1, { message: "Обязательное поле" })
    .min(4, { message: "Пароль должен быть больше 4 символов" }),
});

export type LoginFormType = z.infer<typeof loginFormSchema>;
