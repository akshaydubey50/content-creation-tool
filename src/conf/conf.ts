export const AirtableConf = {
  BASE_ID: String(process.env.BASE_ID),
  BEARER_TOKEN: String(process.env.BEARER_TOKEN),
  TABLE_ID: String(process.env.TABLE_ID),
  BASE_URL: "https://api.airtable.com/v0",
};

export const RedisConf = {
  URL: String(process.env.REDIS_URL),
  TOKEN: String(process.env.REDIS_TOKEN),
};
