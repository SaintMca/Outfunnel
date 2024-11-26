import express from "express";
import { fetchMailchimpContacts } from "../controllers/MailchimpController";

const router = express.Router();

// Route for fetching Mailchimp contacts
router.get("/contacts", fetchMailchimpContacts);

export default router;