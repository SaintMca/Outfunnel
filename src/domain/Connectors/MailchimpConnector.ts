import { Request, Response } from "express";
import { getMailchimpContacts } from "../../domain/services/MailchimpService";
import logger from "../../utils/Logger";

const fetchMailchimpContacts = async (req: Request, res: Response) => {
    try {
        logger.info("Handling request to fetch Mailchimp contacts");

        const contacts = await getMailchimpContacts();

        res.status(200).json({
            success: true,
            data: contacts,
        });

        logger.info("Mailchimp contacts response sent successfully");
    } catch (error: any) {
        logger.error("Error while handling Mailchimp contacts request", { error: error.message });

        res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch Mailchimp contacts.",
        });
    }
};

export { fetchMailchimpContacts };