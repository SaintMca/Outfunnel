import express from "express";
import { compareContacts } from "../controllers/CompareController";

const router = express.Router();

router.get("/", compareContacts);

export default router;