import express from "express";
import dotenv from "dotenv";
import mailchimpRoutes from "./api/routes/MailchimpRoutes";
import pipedriveRoutes from "./api/routes/PipedriveRoutes";
import unifiedRoutes from "./api/routes/UnifiedRoutes";
import compareRoutes from "./api/routes/CompareRoutes";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/mailchimp", mailchimpRoutes);
app.use("/pipedrive", pipedriveRoutes);
app.use("/contacts", unifiedRoutes);
app.use("/compare-contacts", compareRoutes);

export { app };