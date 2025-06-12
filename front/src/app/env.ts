export const PARTYKIT_HOST =
  process.env.NEXT_PUBLIC_PARTYKIT_HOST ?? "127.0.0.1:1999";
export const PROTOCOL = PARTYKIT_HOST.startsWith("127.0.0.1")
  ? "http"
  : "https";
export const PARTYKIT_URL = `${PROTOCOL}://${PARTYKIT_HOST}`;

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";