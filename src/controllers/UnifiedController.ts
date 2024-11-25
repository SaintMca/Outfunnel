import { Request, Response } from "express";
import { UnifiedContactService } from "../services/UnifiedContactService";
import logger from "../utils/Logger";

const unifiedContactService = new UnifiedContactService();

export const fetchContacts = async (req: Request, res: Response) => {
    const { platform } = req.params;

    try {
        logger.info(`Fetching contacts for platform: ${platform}`);

        const contacts = await unifiedContactService.fetchContacts(platform);

        res.status(200).json({
            success: true,
            platform,
            contacts,
        });

        logger.info(`Contacts fetched successfully for platform: ${platform}`);
    } catch (error: any) {
        logger.error(`Error fetching contacts for platform: ${platform}`, { error: error.message });

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};