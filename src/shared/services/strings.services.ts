import bcrypt from "bcryptjs";

export const handlePassword = (plainPassword: string) => {
  const salt = bcrypt.genSaltSync();

  return bcrypt.hashSync(plainPassword, salt);
};