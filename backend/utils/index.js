import bcrypt from "bcryptjs";

export const salt = bcrypt.genSaltSync(10);

export const PasswordHasher = (password) => {
  return bcrypt.hashSync(password, salt);
};

export const PasswordVerifier = (password, dbPassword) => {
  return bcrypt.compareSync(password, dbPassword);
};
