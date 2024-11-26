import { CompareContacts } from "./../../src/utils/CompareContacts";
import { mockMailchimpContacts, mockPipedriveContacts } from "../mocks/contacts";
import { Contact } from "../../src/models/Contact";

describe("CompareContacts", () => {
  it("should return contacts only in Mailchimp", () => {
    const result = CompareContacts(mockMailchimpContacts, mockPipedriveContacts);

    expect(result.mailchimpOnly).toEqual([
      {
        emailAddress: "a@mail.com",
        phoneNumber: "1234567",
        source: "mailchimp",
        rating: null,
        contactDateAdded: "2024-11-25T10:00:00Z",
      },
    ]);
    expect(result.pipedriveOnly).toEqual([
      {
        emailAddress: "c@mail.com",
        phoneNumber: "5566778",
        source: "pipedrive",
        rating: null,
        contactDateAdded: "2024-11-25T10:00:00Z",
      },
    ]);
  });

  it("should return contacts only in Pipedrive", () => {
    const mailchimpSubset = [
      {
        emailAddress: "a@mail.com",
        phoneNumber: "1234567",
        source: "mailchimp",
        rating: null,
        contactDateAdded: "2024-11-25T10:00:00Z",
      },
    ];
    const pipedriveSubset = [
      {
        emailAddress: "b@mail.com",
        phoneNumber: "9876543",
        source: "pipedrive",
        rating: null,
        contactDateAdded: "2024-11-25T10:00:00Z",
      },
      {
        emailAddress: "a@mail.com",
        phoneNumber: "1234567",
        source: "pipedrive",
        rating: null,
        contactDateAdded: "2024-11-25T10:00:00Z",
      },
    ];

    const result = CompareContacts(mailchimpSubset, pipedriveSubset);

    expect(result.mailchimpOnly).toEqual([]);
    expect(result.pipedriveOnly).toEqual([
      {
        emailAddress: "b@mail.com",
        phoneNumber: "9876543",
        source: "pipedrive",
        rating: null,
        contactDateAdded: "2024-11-25T10:00:00Z",
      },
    ]);
  });

  it("should return empty arrays when no contacts are provided", () => {
    const mailchimpContacts: Contact[] = [];
    const pipedriveContacts: Contact[] = [];
  
    const result = CompareContacts(mailchimpContacts, pipedriveContacts);
  
    expect(result.mailchimpOnly).toEqual([]);
    expect(result.pipedriveOnly).toEqual([]);
  });
});