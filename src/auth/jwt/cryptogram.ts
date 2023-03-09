import * as crypto from 'crypto';

export const makeSalt = (): string => {
  return crypto.randomBytes(3).toString('base64');
};

export const encryptPassword = (password: string, salt: string): string => {
  if (!password || !salt) {
    return '';
  }

  const tempSalt = Buffer.from(salt, 'base64');
  return crypto
    .pbkdf2Sync(password, tempSalt, 10000, 16, 'sha1')
    .toString('base64');
};

export const matches = (
  salt: string,
  password: string,
  encryptedPassword: string,
): boolean => {
  return encryptPassword(password, salt) === encryptedPassword;
};
