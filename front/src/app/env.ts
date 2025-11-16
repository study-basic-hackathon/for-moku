export const PARTYKIT_HOST =
  process.env.NEXT_PUBLIC_PARTYKIT_HOST ?? "localhost:1999";
export const PROTOCOL = PARTYKIT_HOST.startsWith("127.0.0.1") || PARTYKIT_HOST.startsWith("localhost")
  ? "http"
  : "https";
export const PARTYKIT_URL = `${PROTOCOL}://${PARTYKIT_HOST}`;

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

export const GYAZO_UPLOAD_END_POINT = process.env.GYAZO_UPLOAD_END_POINT ?? "http://localhost:8888/upload.cgi";
export const GYAZO_DELETE_END_POINT = process.env.GYAZO_DELETE_END_POINT ?? "http://localhost:8888/delete.cgi";
export const GYAZO_ACCESS_TOKEN = process.env.GYAZO_ACCESS_TOKEN ?? "sampletoken";
export const DATABASE_URL = process.env.DATABASE_URL ?? "postgresql://formoku:formoku@localhost:5432/formoku";
export const AUTH_DEBUG = process.env.AUTH_DEBUG === "true";
export const TIMEZONE = process.env.TIMEZONE ?? 'Asia/Tokyo';