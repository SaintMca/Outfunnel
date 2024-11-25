export interface Contact {
    emailAddress: string;
    phoneNumber?: string;
    source: string;
    rating?: number | null;
    contactDateAdded: string;
}