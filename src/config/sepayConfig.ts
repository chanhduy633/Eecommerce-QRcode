export const sepayConfig = {
  SEPAY_API_URL: "https://my.sepay.vn/userapi/transactions/list",
  SEPAY_ACCOUNT_NUMBER: process.env.SEPAY_ACCOUNT_NUMBER || "96247DUYBIDV",
  SEPAY_TOKEN: process.env.SEPAY_TOKEN || "",
  LIMIT: 20,
  MAX_CHECK_MINUTES: 10,
};
