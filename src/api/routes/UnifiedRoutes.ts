import express from "express";
import { fetchContacts } from "../controllers/UnifiedController";

const router = express.Router();

// Unified route for fetching contacts from any platform
router.get("/:platform", fetchContacts);

export default router;