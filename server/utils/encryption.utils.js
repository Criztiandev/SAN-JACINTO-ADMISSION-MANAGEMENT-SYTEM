import bcrypt from "bcrypt";
import crypto from "crypto";

export const hashData = async (data) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(data, salt);
};

export const compareHash = async (data, hash) => {
  return await bcrypt.compare(data, hash);
};

const encryptionConfig = {
  algorithm: "aes-256-gcm",
  iv: crypto.randomBytes(16),
  secret: () => Buffer.from(process.env.ENCRYPTION_KEY, "hex"),
};

export const encryptData = (data) => {
  // Configuration
  const { algorithm, iv, secret } = encryptionConfig;

  // cipher the data using the algorithm, secret and iv
  const cipher = crypto.createCipheriv(algorithm, secret(), iv);

  // Encrypt the given text
  let encrypted = cipher.update(data, "utf-8", "hex");
  encrypted += cipher.final("hex");

  // Get the authentication tag
  const authTag = cipher.getAuthTag();

  return `${iv.toString("hex")}:${encrypted}:${authTag.toString("hex")}`;
};

export const decryptData = (data) => {
  const [ivHex, encryptedHex, authTagHex] = data.split(":");
  const { algorithm, secret } = encryptionConfig;

  // convert to hex
  const iv = Buffer.from(ivHex, "hex");
  const encrypted = Buffer.from(encryptedHex, "hex");
  const authTag = Buffer.from(authTagHex, "hex");

  // decipher
  const decipher = crypto.createDecipheriv(algorithm, secret(), iv);
  decipher.setAuthTag(authTag);

  // update the decipher with the encrypted data
  let decrypted = decipher.update(encrypted, "hex", "utf-8");
  decrypted += decipher.final("utf-8");

  return decrypted;
};
