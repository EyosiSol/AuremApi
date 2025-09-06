import bcrypt from "bcryptjs";

const SALT_ROUNDS = 8; // standard value, adjust for security vs. performance

// Hash a password before storing it
export const hashPassword = async (plainPassword) => {
  return await bcrypt.hash(plainPassword, SALT_ROUNDS);
};

// Compare raw password with hashed password
export const comparePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};
