import express from "express";
import dotenv from "dotenv";
import { fetchMailchimpContacts } from "./api/controllers/MailchimpController";
import { fetchPipedriveContacts } from "./api/controllers/PipedriveController";
import { getMailchimpContacts } from "./domain/services/MailchimpService";
import { getPipedriveContacts } from "./domain/services/PipedriveService";
import { CompareContacts } from "./utils/CompareContacts";
import { fetchContacts } from "./api/controllers/UnifiedController";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/mailchimp/contacts", fetchMailchimpContacts);
app.get("/pipedrive/contacts", fetchPipedriveContacts);

app.get("/contacts/:platform", fetchContacts);

app.get("/compare-contacts", async (req, res) => {
    try {
        const mailchimpContacts = await getMailchimpContacts();
        const pipedriveContacts = await getPipedriveContacts();
        const result = CompareContacts(mailchimpContacts, pipedriveContacts);

        res.status(200).json(result);
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || "An error occurred while comparing contacts.",
        });
    }
});

export { app };