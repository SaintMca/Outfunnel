import express from "express";
import { fetchPipedriveContacts } from "../../domain/connectors/PipedriveConnector";

const router = express.Router();

// Route for fetching Pipedrive contacts
router.get("/contacts", fetchPipedriveContacts);

export default router;