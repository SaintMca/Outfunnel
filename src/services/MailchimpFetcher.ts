import axios from "axios";
import dotenv from "dotenv";
import { ContactFetcher } from "./ContactFetcher";
import { Contact } from "../models/Contact";
import logger from "../utils/Logger";

dotenv.config();

export class MailchimpFetcher implements ContactFetcher {
    private apiKey: string;
    private listId: string;

    constructor() {
        this.apiKey = process.env.MAILCHIMP_API_KEY!;
        this.listId = process.env.MAILCHIMP_LIST_ID!;
        if (!this.apiKey || !this.listId) {
            logger.error("Mailchimp API key or List ID is not set.");
            throw new Error("Mailchimp API key or List ID is not set.");
        }
    }

    async fetchContacts(): Promise<Contact[]> {
        const datacenter = this.apiKey.split("-")[1];
        const url = `https://${datacenter}.api.mailchimp.com/3.0/lists/${this.listId}/members`;

        try {
            logger.info(`Fetching contacts from Mailchimp list ${this.listId}`);
            const response = await axios.get(url, {
                headers: {
                    Authorization: `apikey ${this.apiKey}`,
                },
                params: {
                    count: 100,
                },
            });

            const contacts: Contact[] = response.data.members.map((member: any) => ({
                emailAddress: member.email_address,
                phoneNumber: null,
                source: "mailchimp",
                rating: null,
                contactDateAdded: member.timestamp_opt || new Date().toISOString(),
            }));

            logger.info(`Successfully fetched ${contacts.length} contacts from Mailchimp`);
            return contacts;
        } catch (error: any) {
            logger.error("Failed to fetch contacts from Mailchimp", { error: error.message });
            throw new Error("Failed to fetch contacts from Mailchimp");
        }
    }
}