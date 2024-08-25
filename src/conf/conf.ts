export const AirtableConf = {
  BASE_ID: String(process.env.BASE_ID),
  BEARER_TOKEN: String(process.env.BEARER_TOKEN),
  TABLE_ID: String(process.env.TABLE_ID),
  BASE_URL: String(process.env.AIRTABLE_BASE_URI),
  SUBMIT_TOOL_URI: String(process.env.AIRTABLE_SUBMIT_TOOL_URI),
};

export const ResendConf = {
  API_KEY: String(process.env.RESEND_API_KEY),
  FROM: String(process.env.RESEND_FROM),
  WELCOME_SUBJECT: String(process.env.WELCOME_SUBJECT ),
  FORGET_SUBJECT: String(process.env.FORGET_SUBJECT),
  RESET_PASSWORD_SUBJECT: String(
    process.env.RESET_PASSWORD_SUBJECT
  ),
  VERIFICATION_CODE_SUBJECT: String(
    process.env.VERIFICATION_CODE_SUBJECT
  ),
};

export const MongodbConf = {
  MONGO_URI: String(process.env.MONGO_URI),
  DB_NAME: String(process.env.MONGODB_NAME),
};

export const APPConf = {
  BASE_URL: String(process.env.NEXTAUTH_URL),
};
