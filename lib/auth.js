import { hash, compare } from 'bcrypt';

export async function hashPassword(password) {
  return await hash(password, 12);
}

export async function comparePassword(password, hashedPassword) {
  //bool
  const isValid = await compare(password, hashedPassword);
  return isValid;
}
