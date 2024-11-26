import axios from "axios";
import dotenv from "dotenv";
import { ContactFetcher } from "./ContactFetcher";
import { Contact } from "../models/Contact";
import logger from "../../utils/Logger";

dotenv.config();

export class PipedriveFetcher implements ContactFetcher {
    private apiKey: string;

    constructor() {
        this.apiKey = process.env.PIPEDRIVE_API_KEY!;
        if (!this.apiKey) {
            logger.error("Pipedrive API key is not set.");
            throw new Error("Pipedrive API key is not set.");
        }
    }

    async fetchContacts(): Promise<Contact[]> {
        const url = `https://api.pipedrive.com/v1/persons?api_token=${this.apiKey}`;

        try {
            logger.info("Fetching contacts from Pipedrive");
            const response = await axios.get(url);

            const contacts: Contact[] = response.data.data.map((person: any) => ({
                emailAddress: person.email?.[0]?.value || "",
                phoneNumber: person.phone?.[0]?.value || null,
                source: "pipedrive",
                rating: person.rating || null,
                contactDateAdded: person.add_time || new Date().toISOString(),
            }));

            logger.info(`Successfully fetched ${contacts.length} contacts from Pipedrive`);
            return contacts;
        } catch (error: any) {
            logger.error("Failed to fetch contacts from Pipedrive", { error: error.message });
            throw new Error("Failed to fetch contacts from Pipedrive");
        }
    }
}