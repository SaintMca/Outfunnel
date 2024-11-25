import axios from "axios";
import dotenv from "dotenv";
import logger from "../utils/Logger";

dotenv.config();

const pipedriveApiKey = process.env.PIPEDRIVE_API_KEY;

if (!pipedriveApiKey) {
    logger.error("Pipedrive API key is not set in the environment variables.");
    throw new Error("Pipedrive API key is not set in the environment variables.");
}

const getPipedriveContacts = async () => {
    const url = `https://api.pipedrive.com/v1/persons?api_token=${pipedriveApiKey}`;

    try {
        logger.info("Fetching contacts from Pipedrive");

        const response = await axios.get(url);

        const contacts = response.data.data.map((person: any) => ({
            emailAddress: person.email?.[0]?.value || "",
            phoneNumber: person.phone?.[0]?.value || null,
            source: "pipedrive",
            rating: person.rating || null,
            contactDateAdded: person.add_time || new Date().toISOString(),
        }));

        logger.info(`Successfully fetched ${contacts.length} contacts from Pipedrive`);
        return contacts;
    } catch (error: any) {
        logger.error("Error fetching Pipedrive contacts", { error: error.message });
        throw new Error("Failed to fetch Pipedrive contacts.");
    }
};

export { getPipedriveContacts };