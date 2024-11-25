import { Request, Response } from "express";
import { getPipedriveContacts } from "../services/PipedriveService";
import logger from "../utils/Logger";

// Controller to handle Pipedrive API contacts fetching
const fetchPipedriveContacts = async (req: Request, res: Response) => {
    try {
        logger.info("Handling request to fetch Pipedrive contacts"); 
        
        const contacts = await getPipedriveContacts();
        
        logger.info("Successfully fetched Pipedrive contacts", { count: contacts.length });

        // TODO: Add pagination support if data grows large
        res.status(200).json({
            success: true,
            data: contacts,
        });

        logger.info("Successfully sent Pipedrive contacts response"); // Final log for success
    } catch (error: any) {
        logger.error("Failed to handle Pipedrive contacts request", { error: error.message });

        // TODO: Later handle more specific errors (like 404 if no contacts in Pipedrive)
        res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch Pipedrive contacts.", // Generic error for now
        });
    }
};

export { fetchPipedriveContacts };