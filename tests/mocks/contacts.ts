import { Contact } from "../../src/domain/models/Contact";

export const mockMailchimpContacts: Contact[] = [
  {
    emailAddress: "a@mail.com",
    phoneNumber: "1234567",
    source: "mailchimp",
    rating: null,
    contactDateAdded: "2024-11-25T10:00:00Z",
  },
  {
    emailAddress: "b@mail.com",
    phoneNumber: "7654321",
    source: "mailchimp",
    rating: null,
    contactDateAdded: "2024-11-25T10:00:00Z",
  },
];

export const mockPipedriveContacts: Contact[] = [
  {
    emailAddress: "b@mail.com",
    phoneNumber: "9876543",
    source: "pipedrive",
    rating: null,
    contactDateAdded: "2024-11-25T10:00:00Z",
  },
  {
    emailAddress: "c@mail.com",
    phoneNumber: "5566778",
    source: "pipedrive",
    rating: null,
    contactDateAdded: "2024-11-25T10:00:00Z",
  },
];