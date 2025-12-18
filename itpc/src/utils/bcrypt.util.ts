import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10; // 암호화 강도 (높을수록 보안 강화, 느려짐)

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePassword = async (
  plainPassword: string,
  hash: string,
): Promise<boolean> => {
  return await bcrypt.compare(plainPassword, hash);
};
