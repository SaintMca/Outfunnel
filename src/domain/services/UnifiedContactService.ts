import { ContactFetcher } from "../fetchers/ContactFetcher";
import { PipedriveFetcher } from "../fetchers/PipedriveFetcher";
import { MailchimpFetcher } from "../fetchers/MailchimpFetcher";
import { Contact } from "../../domain/models/Contact";

export class UnifiedContactService {
    private fetchers: Record<string, ContactFetcher>;

    constructor() {
        this.fetchers = {
            pipedrive: new PipedriveFetcher(),
            mailchimp: new MailchimpFetcher(),
        };
    }

    async fetchContacts(platform: string): Promise<Contact[]> {
        const fetcher = this.fetchers[platform.toLowerCase()];
        if (!fetcher) {
            throw new Error(`Unsupported platform: ${platform}`);
        }

        return await fetcher.fetchContacts();
    }
}