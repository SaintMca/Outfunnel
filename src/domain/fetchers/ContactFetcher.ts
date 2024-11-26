import { Contact } from "../domain/models/Contact";

export interface ContactFetcher {
    fetchContacts(): Promise<Contact[]>;
}