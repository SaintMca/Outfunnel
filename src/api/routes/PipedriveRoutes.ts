import express from "express";
import { fetchPipedriveContacts } from "../controllers/PipedriveController";

const router = express.Router();

// Route for fetching Pipedrive contacts
router.get("/contacts", fetchPipedriveContacts);

export default router;