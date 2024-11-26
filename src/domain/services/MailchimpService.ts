import axios from "axios";
import dotenv from "dotenv";
import logger from "../../utils/Logger";

dotenv.config();

const mailchimpApiKey = process.env.MAILCHIMP_API_KEY;
const mailchimpListId = process.env.MAILCHIMP_LIST_ID;

if (!mailchimpApiKey || !mailchimpListId) {
    logger.error("Mailchimp API key or List ID is not set in the environment variables.");
    throw new Error("Mailchimp API key or List ID is not set in the environment variables.");
}

const getMailchimpContacts = async () => {
    const datacenter = mailchimpApiKey.split("-")[1];
    const url = `https://${datacenter}.api.mailchimp.com/3.0/lists/${mailchimpListId}/members`;

    try {
        logger.info(`Fetching contacts from Mailchimp list ${mailchimpListId}`);
        const response = await axios.get(url, {
            headers: {
                Authorization: `apikey ${mailchimpApiKey}`,
            },
        });

        const contacts = response.data.members.map((member: any) => ({
            emailAddress: member.email_address,
            phoneNumber: null,
            source: "mailchimp",
            rating: null,
            contactDateAdded: member.timestamp_opt || new Date().toISOString(),
        }));

        logger.info(`Successfully fetched ${contacts.length} contacts from Mailchimp`);
        return contacts;
    } catch (error: any) {
        logger.error("Error fetching Mailchimp contacts", { error: error.message });
        throw new Error("Failed to fetch Mailchimp contacts.");
    }
};

export { getMailchimpContacts };