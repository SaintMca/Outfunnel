import express from "express";
import { fetchMailchimpContacts } from "../../domain/Connectors/MailchimpConnector";

const router = express.Router();

// Route for fetching Mailchimp contacts
router.get("/contacts", fetchMailchimpContacts);

export default router;