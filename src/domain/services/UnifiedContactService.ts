import { getMailchimpContacts } from "./MailchimpService";
import { getPipedriveContacts } from "./PipedriveService";

export const fetchContactsFromPlatform = async (platform: string) => {
  switch (platform) {
    case "mailchimp":
      return getMailchimpContacts();
    case "pipedrive":
      return getPipedriveContacts();
    default:
      throw new Error(`Unsupported platform: ${platform}`);
  }
};