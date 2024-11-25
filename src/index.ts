import express from "express";
import dotenv from "dotenv";
import { fetchMailchimpContacts } from "./controllers/MailchimpController";
import { fetchPipedriveContacts } from "./controllers/PipedriveController";
import { getMailchimpContacts } from "./services/MailchimpService";
import { getPipedriveContacts } from "./services/PipedriveService";
import { CompareContacts } from "./utils/CompareContacts";
import { fetchContacts } from "./controllers/UnifiedController";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/mailchimp/contacts", fetchMailchimpContacts); // Fetch Mailchimp contacts
app.get("/pipedrive/contacts", fetchPipedriveContacts); // Fetch Pipedrive contacts

// Unified endpoint for fetching contacts from any platform
app.get("/contacts/:platform", fetchContacts);

// Compare Mailchimp and Pipedrive contacts
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});