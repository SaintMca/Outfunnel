import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  pipedriveApiKey: process.env.PIPEDRIVE_API_KEY || "",
  mailchimpApiKey: process.env.MAILCHIMP_API_KEY || "",
  mailchimpListId: process.env.MAILCHIMP_LIST_ID || "",
};