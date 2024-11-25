import { Contact } from "../models/Contact";

export interface ContactFetcher {
    fetchContacts(): Promise<Contact[]>;
}