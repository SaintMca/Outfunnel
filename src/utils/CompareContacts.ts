import { Contact } from "../domain/models/Contact";

const CompareContacts = (mailchimpContacts: Contact[], pipedriveContacts: Contact[]) => {
    // Filter contacts present only in Mailchimp
    const mailchimpOnly = mailchimpContacts.filter(
        (mailchimpContact) =>
            !pipedriveContacts.some(
                (pipedriveContact) =>
                    pipedriveContact.emailAddress === mailchimpContact.emailAddress
            )
    );

    // Filter contacts present only in Pipedrive
    const pipedriveOnly = pipedriveContacts.filter(
        (pipedriveContact) =>
            !mailchimpContacts.some(
                (mailchimpContact) =>
                    mailchimpContact.emailAddress === pipedriveContact.emailAddress
            )
    );

    return { mailchimpOnly, pipedriveOnly };
};

export { CompareContacts };