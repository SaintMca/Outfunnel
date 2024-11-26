import { Contact } from "../domain/models/Contact";

export const CompareContacts = (contactsA: Contact[], contactsB: Contact[]) => {
  const contactsAEmails = new Set(contactsA.map((contact) => contact.emailAddress));
  const contactsBEmails = new Set(contactsB.map((contact) => contact.emailAddress));

  const mailchimpOnly = contactsA.filter((contact) => !contactsBEmails.has(contact.emailAddress));
  const pipedriveOnly = contactsB.filter((contact) => !contactsAEmails.has(contact.emailAddress));

  return {
    mailchimpOnly,
    pipedriveOnly,
  };
};